package com.verma.payment.calculator.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepaymentScheduleResponse implements RepaymentResponse {

	private Integer paymentNo;
	private BigDecimal monthlyPayment;
	private BigDecimal principalPaid;
	private BigDecimal interestPaid;
	private BigDecimal balance;

}
