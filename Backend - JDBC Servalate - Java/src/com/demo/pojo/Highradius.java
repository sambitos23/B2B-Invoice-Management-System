package com.demo.pojo;


public class Highradius {
	private int SlNo;
	private String BusinessCode;
	private int CustNumber;
	private String ClearDate;
	private int BuisnessYear;
	private String DocId;
	private String PostingDate;
	private String DocumentCreateDate;
	private String DocumentCreateDate1;
	private String DueInDate;
	private String InvoiceCurrency;
	private String DocumentType;
	private int PostingId;
	private String AreaBusiness;
	private double TotalOpenAmount;
	private String BaselineCreateDate;
	private String CustPaymentTerms;
	private int InvoiceId;
	private int IsOpen;
	private String AgingBucket;
	private int IsDeleted;
	
	
	public Highradius() {
		super();
	}


	public Highradius(int slNo, String businessCode, int custNumber, String clearDate, int buisnessYear, String docId,
			String postingDate, String documentCreateDate, String documentCreateDate1, String dueInDate, String invoiceCurrency,
			String documentType, int postingId, String areaBusiness, double totalOpenAmount, String baselineCreateDate,
			String custPaymentTerms, int invoiceId, int isOpen, String agingBucket, int isDeleted) {
		super();
		SlNo = slNo;
		BusinessCode = businessCode;
		CustNumber = custNumber;
		ClearDate = clearDate;
		BuisnessYear = buisnessYear;
		DocId = docId;
		PostingDate = postingDate;
		DocumentCreateDate = documentCreateDate;
		DocumentCreateDate1 = documentCreateDate1;
		DueInDate = dueInDate;
		InvoiceCurrency = invoiceCurrency;
		DocumentType = documentType;
		PostingId = postingId;
		AreaBusiness = areaBusiness;
		TotalOpenAmount = totalOpenAmount;
		BaselineCreateDate = baselineCreateDate;
		CustPaymentTerms = custPaymentTerms;
		InvoiceId = invoiceId;
		IsOpen = isOpen;
		AgingBucket = agingBucket;
		IsDeleted = isDeleted;
	}


	public int getSlNo() {
		return SlNo;
	}


	public void setSlNo(int slNo) {
		SlNo = slNo;
	}


	public String getBusinessCode() {
		return BusinessCode;
	}


	public void setBusinessCode(String businessCode) {
		BusinessCode = businessCode;
	}


	public int getCustNumber() {
		return CustNumber;
	}


	public void setCustNumber(int custNumber) {
		CustNumber = custNumber;
	}


	public String getClearDate() {
		return ClearDate;
	}


	public void setClearDate(String clearDate) {
		ClearDate = clearDate;
	}


	public int getBuisnessYear() {
		return BuisnessYear;
	}


	public void setBuisnessYear(int buisnessYear) {
		BuisnessYear = buisnessYear;
	}


	public String getDocId() {
		return DocId;
	}


	public void setDocId(String docId) {
		DocId = docId;
	}


	public String getPostingDate() {
		return PostingDate;
	}


	public void setPostingDate(String postingDate) {
		PostingDate = postingDate;
	}


	public String getDocumentCreateDate() {
		return DocumentCreateDate;
	}


	public void setDocumentCreateDate(String documentCreateDate) {
		DocumentCreateDate = documentCreateDate;
	}


	public String getDocumentCreateDate1() {
		return DocumentCreateDate1;
	}


	public void setDocumentCreateDate1(String documentCreateDate1) {
		DocumentCreateDate1 = documentCreateDate1;
	}


	public String getDueInDate() {
		return DueInDate;
	}


	public void setDueInDate(String dueInDate) {
		DueInDate = dueInDate;
	}


	public String getInvoiceCurrency() {
		return InvoiceCurrency;
	}


	public void setInvoiceCurrency(String invoiceCurrency) {
		InvoiceCurrency = invoiceCurrency;
	}


	public String getDocumentType() {
		return DocumentType;
	}


	public void setDocumentType(String documentType) {
		DocumentType = documentType;
	}


	public int getPostingId() {
		return PostingId;
	}


	public void setPostingId(int postingId) {
		PostingId = postingId;
	}


	public String getAreaBusiness() {
		return AreaBusiness;
	}


	public void setAreaBusiness(String areaBusiness) {
		AreaBusiness = areaBusiness;
	}


	public double getTotalOpenAmount() {
		return TotalOpenAmount;
	}


	public void setTotalOpenAmount(double totalOpenAmount) {
		TotalOpenAmount = totalOpenAmount;
	}


	public String getBaselineCreateDate() {
		return BaselineCreateDate;
	}


	public void setBaselineCreateDate(String baselineCreateDate) {
		BaselineCreateDate = baselineCreateDate;
	}


	public String getCustPaymentTerms() {
		return CustPaymentTerms;
	}


	public void setCustPaymentTerms(String custPaymentTerms) {
		CustPaymentTerms = custPaymentTerms;
	}


	public int getInvoiceId() {
		return InvoiceId;
	}


	public void setInvoiceId(int invoiceId) {
		InvoiceId = invoiceId;
	}


	public int getIsOpen() {
		return IsOpen;
	}


	public void setIsOpen(int isOpen) {
		IsOpen = isOpen;
	}


	public String getAgingBucket() {
		return AgingBucket;
	}


	public void setAgingBucket(String agingBucket) {
		if(agingBucket == null) {
			AgingBucket = "N/A";
		}else {
			AgingBucket = agingBucket;
		}
	}


	public int getIsDeleted() {
		return IsDeleted;
	}


	public void setIsDeleted(int isDeleted) {
		IsDeleted = isDeleted;
	}


	public Highradius(String businessCode, int custNumber, String clearDate, int buisnessYear, String docId,
			String postingDate, String documentCreateDate, String documentCreateDate1, String dueInDate, String invoiceCurrency,
			String documentType, int postingId, String areaBusiness, double totalOpenAmount, String baselineCreateDate,
			String custPaymentTerms, int invoiceId, int isOpen, String agingBucket, int isDeleted) {
		super();
		BusinessCode = businessCode;
		CustNumber = custNumber;
		ClearDate = clearDate;
		BuisnessYear = buisnessYear;
		DocId = docId;
		PostingDate = postingDate;
		DocumentCreateDate = documentCreateDate;
		DocumentCreateDate1 = documentCreateDate1;
		DueInDate = dueInDate;
		InvoiceCurrency = invoiceCurrency;
		DocumentType = documentType;
		PostingId = postingId;
		AreaBusiness = areaBusiness;
		TotalOpenAmount = totalOpenAmount;
		BaselineCreateDate = baselineCreateDate;
		CustPaymentTerms = custPaymentTerms;
		InvoiceId = invoiceId;
		IsOpen = isOpen;
		AgingBucket = agingBucket;
		IsDeleted = isDeleted;
	}

	
}
