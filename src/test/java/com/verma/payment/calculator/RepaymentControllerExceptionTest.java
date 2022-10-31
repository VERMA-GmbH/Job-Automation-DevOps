package com.verma.payment.calculator;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import com.verma.payment.calculator.service.RepaymentScheduleService;

@ExtendWith({ SpringExtension.class })
@WebMvcTest(RepaymentCalculatorController.class)
public class RepaymentControllerExceptionTest {

	final String API_URL = "/api/repayment/calculator";

	@Autowired
	private MockMvc mvc;
	@Autowired
	private ObjectMapper mapper;
	@MockBean
	private RepaymentScheduleService repaymentScheduleService;

	@Test
	void testErrorGetrepaymentScheduleRepaymentTenure() throws Exception {

		RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 2000, 6, 4);
		String json = mapper.writeValueAsString(requestByRepayment);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals("Either Repayment or Tenure is accepted.", result.getResolvedException().getMessage());
	}

	@Test
	void testErrorGetrepaymentScheduleRepaymentTenureZero() throws Exception {

		RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 0, 6, 0);
		String json = mapper.writeValueAsString(requestByRepayment);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals("Either Repayment or Tenure is required.", result.getResolvedException().getMessage());
	}

	@Test
	void testErrorGetrepaymentScheduleTenureNonEven() throws Exception {

		RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 0, 6, 7);
		String json = mapper.writeValueAsString(requestByRepayment);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals("Tenure should be even.", result.getResolvedException().getMessage());
	}

	@Test
	void testErrorGetrepaymentScheduleInterestZero() throws Exception {

		RepaymentRequest requestByRepayment = new RepaymentRequest(5000, 0, 0, 4);
		String json = mapper.writeValueAsString(requestByRepayment);
		RequestBuilder request = MockMvcRequestBuilders.post(API_URL).contentType(MediaType.APPLICATION_JSON)
				.content(json).accept(MediaType.APPLICATION_JSON);

		MvcResult result = mvc.perform(request).andReturn();
		assertEquals("Interest is required.", result.getResolvedException().getMessage());
	}
}
