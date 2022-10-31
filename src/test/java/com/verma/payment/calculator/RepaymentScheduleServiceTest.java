package com.verma.payment.calculator;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import com.verma.payment.calculator.controller.RepaymentCalculatorController;
import com.verma.payment.calculator.model.RepaymentRequest;
import com.verma.payment.calculator.model.RepaymentResponse;
import com.verma.payment.calculator.model.RepaymentScheduleResponse;
import com.verma.payment.calculator.service.RepaymentScheduleService;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(value = RepaymentCalculatorController.class)
@ContextConfiguration(classes = { RepaymentScheduleService.class })
class RepaymentScheduleServiceTest {

	@MockBean
	private RepaymentScheduleService repaymentScheduleSerice;

	RepaymentRequest requestByTenure = new RepaymentRequest(5000, 0, 6, 4);
	RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 2000, 6, 0);

	List<RepaymentResponse> repaymentsListTenure = new ArrayList<>();
	List<RepaymentResponse> repaymentsListRepayment = new ArrayList<>();

	@BeforeEach
	public void setup() {
		repaymentsListTenure.add(new RepaymentScheduleResponse(1, new BigDecimal(1265.66), new BigDecimal(1240.66),
				new BigDecimal(25), new BigDecimal(3759.34)));
		repaymentsListTenure.add(new RepaymentScheduleResponse(2, new BigDecimal(1265.66), new BigDecimal(1246.87),
				new BigDecimal(18.8), new BigDecimal(2512.47)));
		repaymentsListTenure.add(new RepaymentScheduleResponse(3, new BigDecimal(1265.66), new BigDecimal(1253.1),
				new BigDecimal(12.56), new BigDecimal(1259.37)));
		repaymentsListTenure.add(new RepaymentScheduleResponse(4, new BigDecimal(1265.66), new BigDecimal(1259.37),
				new BigDecimal(6.3), new BigDecimal(0)));

		repaymentsListRepayment.add(new RepaymentScheduleResponse(1, new BigDecimal(2000), new BigDecimal(1975.00),
				new BigDecimal(25), new BigDecimal(3025.00)));
		repaymentsListRepayment.add(new RepaymentScheduleResponse(2, new BigDecimal(2000), new BigDecimal(1984.88),
				new BigDecimal(15.13), new BigDecimal(1040.13)));
		repaymentsListRepayment.add(new RepaymentScheduleResponse(3, new BigDecimal(1040.13), new BigDecimal(1040.13),
				new BigDecimal(5.20), new BigDecimal(0)));
	}

	@Test
	public void testScheduleByTenure() throws Exception {
		BDDMockito.given(repaymentScheduleSerice.calculateRepayments(requestByTenure)).willReturn(repaymentsListTenure);
		Mockito.when(repaymentScheduleSerice.calculateRepayments(Mockito.any())).thenReturn(repaymentsListTenure);
		verify(repaymentScheduleSerice, never()).calculateRepayments(any(RepaymentRequest.class));
	}

	@Test
	public void testScheduleByRepayment() throws Exception {
		BDDMockito.given(repaymentScheduleSerice.calculateRepayments(requestByRepayment))
				.willReturn(repaymentsListRepayment);
		Mockito.when(repaymentScheduleSerice.calculateRepayments(Mockito.any())).thenReturn(repaymentsListRepayment);
		verify(repaymentScheduleSerice, never()).calculateRepayments(any(RepaymentRequest.class));
	}
}
