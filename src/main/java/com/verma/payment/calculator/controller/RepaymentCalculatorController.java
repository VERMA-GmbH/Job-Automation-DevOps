package com.verma.payment.calculator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.verma.payment.calculator.exception.ValidationException;
import com.verma.payment.calculator.model.RepaymentRequest;
import com.verma.payment.calculator.model.RepaymentResponse;
import com.verma.payment.calculator.service.RepaymentScheduleService;

@RestController
@RequestMapping("/api/repayment/calculator")
public class RepaymentCalculatorController {

	@Autowired
	private RepaymentScheduleService repaymentScheduleSerice;
	
	@PostMapping
	public List<RepaymentResponse> getrepaymentSchedule(@RequestBody RepaymentRequest request) throws ValidationException {
		System.out.println(request);
		validateRequest(request);
		return repaymentScheduleSerice.calculateRepayments(request);
	}
	
	private void validateRequest(RepaymentRequest request) throws ValidationException {
		if(request.getRepayment() <= 0 && request.getTenureInMonths() <= 0) {
			throw new ValidationException("Either Repayment or Tenure is required.");
		}
		
		if(request.getRepayment() > 0 && request.getTenureInMonths() > 0) {
			throw new ValidationException("Either Repayment or Tenure is accepted.");
		}
		
		if(request.getTenureInMonths() > 0 && request.getTenureInMonths()%2!=0) {
			throw new ValidationException("Tenure should be even.");
		}
		if(request.getInterest() <=0) {
			throw new ValidationException("Interest is required.");
		}
		
	}
}
