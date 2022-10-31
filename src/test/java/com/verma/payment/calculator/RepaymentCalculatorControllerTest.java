package com.verma.payment.calculator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.verma.payment.calculator.controller.RepaymentCalculatorController;
import com.verma.payment.calculator.model.RepaymentRequest;
import com.verma.payment.calculator.model.RepaymentResponse;
import com.verma.payment.calculator.model.RepaymentScheduleResponse;
import com.verma.payment.calculator.service.RepaymentScheduleService;

@ExtendWith({ SpringExtension.class })
@WebMvcTest(RepaymentCalculatorController.class)
public class RepaymentCalculatorControllerTest {

	final int DECIMALPLACES = 2;
	final RoundingMode ROUNDINGMODE = RoundingMode.HALF_UP;
	final RoundingMode CEILING = RoundingMode.CEILING;
	final String API_URL = "/api/repayment/calculator";

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@MockBean
	private RepaymentScheduleService repaymentScheduleService;

	String expectedTenure = "[{\"paymentNo\":1,\"monthlyPayment\":1265.66,\"principalPaid\":1240.66,\"interestPaid\":25.00,\"balance\":3759.34},{\"paymentNo\":2,\"monthlyPayment\":1265.66,\"principalPaid\":1246.87,\"interestPaid\":18.80,\"balance\":2512.47},{\"paymentNo\":3,\"monthlyPayment\":1265.66,\"principalPaid\":1253.10,\"interestPaid\":12.56,\"balance\":1259.37},{\"paymentNo\":4,\"monthlyPayment\":1265.66,\"principalPaid\":1259.37,\"interestPaid\":6.30,\"balance\":0}]";
	String expectedRepayment = "[{\"paymentNo\":1,\"monthlyPayment\":2000.00,\"principalPaid\":1975.00,\"interestPaid\":25.00,\"balance\":3025.00},{\"paymentNo\":2,\"monthlyPayment\":2000.00,\"principalPaid\":1984.88,\"interestPaid\":15.13,\"balance\":1040.13},{\"paymentNo\":3,\"monthlyPayment\":1040.13,\"principalPaid\":1040.13,\"interestPaid\":5.20,\"balance\":0.00}]";

	List<RepaymentResponse> repaymentsListTenure = new ArrayList<>();
	List<RepaymentResponse> repaymentsListRepayment = new ArrayList<>();

	@BeforeEach
	public void before() {
		repaymentsListTenure
				.add(new RepaymentScheduleResponse(1, new BigDecimal(1265.66).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1240.66).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(25).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(3759.34).setScale(DECIMALPLACES, ROUNDINGMODE)));
		repaymentsListTenure
				.add(new RepaymentScheduleResponse(2, new BigDecimal(1265.66).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1246.87).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(18.80).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(2512.47).setScale(DECIMALPLACES, ROUNDINGMODE)));
		repaymentsListTenure
				.add(new RepaymentScheduleResponse(3, new BigDecimal(1265.66).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1253.10).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(12.56).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1259.37).setScale(DECIMALPLACES, ROUNDINGMODE)));
		repaymentsListTenure
				.add(new RepaymentScheduleResponse(4, new BigDecimal(1265.66).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1259.37).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(6.30).setScale(DECIMALPLACES, ROUNDINGMODE), new BigDecimal(0.00)));

		repaymentsListRepayment
				.add(new RepaymentScheduleResponse(1, new BigDecimal(2000).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1975.00).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(25).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(3025.00).setScale(DECIMALPLACES, ROUNDINGMODE)));
		repaymentsListRepayment
				.add(new RepaymentScheduleResponse(2, new BigDecimal(2000).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1984.88).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(15.13).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1040.13).setScale(DECIMALPLACES, ROUNDINGMODE)));
		repaymentsListRepayment
				.add(new RepaymentScheduleResponse(3, new BigDecimal(1040.13).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(1040.13).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(5.20).setScale(DECIMALPLACES, ROUNDINGMODE),
						new BigDecimal(0).setScale(DECIMALPLACES, ROUNDINGMODE)));

	}

	@Test
	void testGetrepaymentScheduleByTenure() throws Exception {
		given(repaymentScheduleService.calculateRepayments(any())).willReturn(repaymentsListTenure);

		RepaymentRequest requestByTenure = new RepaymentRequest(5000, 0, 6, 4);
		String json = mapper.writeValueAsString(requestByTenure);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals(expectedTenure, result.getResponse().getContentAsString());
	}

	@Test
	void testGetrepaymentScheduleByRepayment() throws Exception {
		given(repaymentScheduleService.calculateRepayments(any())).willReturn(repaymentsListRepayment);

		RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 2000, 6, 0);
		String json = mapper.writeValueAsString(requestByRepayment);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals(expectedRepayment, result.getResponse().getContentAsString());
	}

}
