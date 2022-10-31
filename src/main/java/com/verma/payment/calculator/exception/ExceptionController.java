package com.verma.payment.calculator.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(value = ValidationException.class)
	public ResponseEntity<ErrorMessage> handleValidationException(ValidationException e, WebRequest request) {
		final HttpStatus status = HttpStatus.BAD_REQUEST;
		return getErrorMessageResponseEntity(e, request, status);
	}
	
	private ResponseEntity<ErrorMessage> getErrorMessageResponseEntity(Exception e, WebRequest request, HttpStatus status) {
		e.printStackTrace();
		final String timeNow = LocalDateTime.now().toString();
		ErrorMessage errorMessage = new ErrorMessage(
			e.getMessage(),
			e,
			status,
			timeNow,
			request.getDescription(false));
		return new ResponseEntity<>(errorMessage, status);
	}
}
