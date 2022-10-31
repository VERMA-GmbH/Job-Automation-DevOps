package com.verma.payment.calculator.service;

import java.util.List;

import com.verma.payment.calculator.model.RepaymentRequest;
import com.verma.payment.calculator.model.RepaymentResponse;

public interface RepaymentScheduleService {
	
	List<RepaymentResponse> calculateRepayments(RepaymentRequest request);

}
