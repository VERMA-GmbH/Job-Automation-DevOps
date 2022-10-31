package com.verma.payment.calculator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepaymentRequest {
	
	private double principle;
	private double repayment;
	private int interest;
	private int tenureInMonths;
	
	
}
