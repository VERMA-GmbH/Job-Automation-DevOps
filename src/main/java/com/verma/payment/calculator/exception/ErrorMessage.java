package com.verma.payment.calculator.exception;

import org.springframework.http.HttpStatus;

public class ErrorMessage {
	private final HttpStatus httpStatus;
	private final String timestamp;
	private final String path;
	public String message;

	
	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public HttpStatus getHttpStatus() {
		return httpStatus;
	}


	public String getTimestamp() {
		return timestamp;
	}


	public String getPath() {
		return path;
	}


	public ErrorMessage(String message, Throwable throwable, HttpStatus httpStatus, String timestamp, String path) {
		this.message = message;
		this.httpStatus = httpStatus;
		this.timestamp = timestamp;
		this.path = path;
	}
}
