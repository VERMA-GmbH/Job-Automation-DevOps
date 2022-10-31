package com.verma.payment.calculator.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.verma.payment.calculator.model.RepaymentRequest;
import com.verma.payment.calculator.model.RepaymentResponse;
import com.verma.payment.calculator.model.RepaymentScheduleResponse;


@Service
public class RepaymentScheduleServiceImpl implements RepaymentScheduleService {

	final int DECIMALPLACES = 2;
	final RoundingMode ROUNDINGMODE = RoundingMode.HALF_UP;
	final RoundingMode CEILING = RoundingMode.CEILING;
    
	/**
     * @param request has the input details of the loan, interest and tenure.
     * @return repaymentsList the Repayment schedule.
     */
	@Override
	public List<RepaymentResponse> calculateRepayments(RepaymentRequest request) {
		List<RepaymentResponse> repaymentsList = new ArrayList<>();
		double interestPayment;
		double principalPayment;
		double balance = 0;
		boolean isRepayment = false;
		// Converting to %
		double annualInterestRate = (double) request.getInterest() / 100;

		// Get the monthly interest rate (divide by 12 months)
		double monthlyRate = annualInterestRate / 12;
		
		double monthlyPayment = request.getRepayment();
		
		if(request.getTenureInMonths() > 0) {
			// Calculating Monthly payment:
			monthlyPayment = findMonthlyPayment(request.getPrinciple(), monthlyRate, request.getTenureInMonths());
		} else {
			request.setTenureInMonths(new BigDecimal(findLoanTerm(request.getPrinciple(), monthlyRate, monthlyPayment))
					.setScale(0, CEILING).intValue());
			isRepayment = true;
		}
		
		double principal = request.getPrinciple();
		
		for (int month = 1; month <= request.getTenureInMonths(); month++) {

			interestPayment = principal * monthlyRate;

			principalPayment = monthlyPayment - interestPayment;
			balance = principal - principalPayment;

			if ((principal < monthlyPayment) && isRepayment) {
				principalPayment = principal;
				monthlyPayment = principal + interestPayment;
				balance = 0;
			}

			// Update the balance for the next iteration
			principal = balance;

			repaymentsList.add(new RepaymentScheduleResponse(month,
					new BigDecimal(monthlyPayment).setScale(DECIMALPLACES, ROUNDINGMODE),
					new BigDecimal(principalPayment).setScale(DECIMALPLACES, ROUNDINGMODE),
					new BigDecimal(interestPayment).setScale(DECIMALPLACES, ROUNDINGMODE),
					new BigDecimal(balance).setScale(DECIMALPLACES, ROUNDINGMODE)));
		}

		return repaymentsList;
	}

	
	/**
     * @param loanAmount
     * @param monthlyInterestRate in percent
     * @param numberOfMonths
     * @return the amount of the monthly payment of the loan
     */
	static double findMonthlyPayment(double loanAmount, double monthlyInterestRate, int numberOfMonths) {
		return loanAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfMonths))
				/ (Math.pow((1 + monthlyInterestRate), numberOfMonths) - 1);
	}
	
	/**
     * @param loanAmount
     * @param monthlyInterestRate in percent
     * @param monthlyPayment
     * @return the no of months for total repayment
     */
	static double findLoanTerm(double loanAmount, double monthlyInterestRate, double monthlyPayment) {
		return Math.log10((monthlyPayment/monthlyInterestRate)/((monthlyPayment/monthlyInterestRate)-loanAmount))/Math.log10(1+monthlyInterestRate);
	}
	
}
