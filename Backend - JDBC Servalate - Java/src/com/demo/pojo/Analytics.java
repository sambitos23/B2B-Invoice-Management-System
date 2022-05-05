package com.demo.pojo;

public class Analytics {
	private String BusinessCode;
	private int NumberOfCust;
	private double TotalAmount;
	private String Invoice;
	private int Count;
	
	
	public Analytics() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getBusinessCode() {
		return BusinessCode;
	}


	public void setBusinessCode(String businessCode) {
		BusinessCode = businessCode;
	}


	public int getNumberOfCust() {
		return NumberOfCust;
	}


	public void setNumberOfCust(int numberOfCust) {
		NumberOfCust = numberOfCust;
	}


	public double getTotalAmount() {
		return TotalAmount;
	}


	public void setTotalAmount(double totalAmount) {
		TotalAmount = totalAmount;
	}


	public String getInvoice() {
		return Invoice;
	}


	public void setInvoice(String invoice) {
		Invoice = invoice;
	}


	public Analytics(String businessCode, int numberOfCust, double totalAmount, String invoice, int count) {
		super();
		BusinessCode = businessCode;
		NumberOfCust = numberOfCust;
		TotalAmount = totalAmount;
		Invoice = invoice;
		Count = count;
	}


	public int getCount() {
		return Count;
	}


	public void setCount(int count) {
		Count = count;
	}	
	
	
}

