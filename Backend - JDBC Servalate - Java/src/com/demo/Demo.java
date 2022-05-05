package com.demo;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.demo.CP;
import com.demo.pojo.Highradius;

/**
 * Servlet implementation class Demo
 */
@WebServlet("/view")
public class Demo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String QUERY = "SELECT sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, aging_bucket FROM winter_internship where is_deleted != 1";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Demo() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		List<Highradius> internship = new ArrayList<>();
		try {
			
			// creating connection object
			// jdbc connection setup
			try (Connection connection = CP.createC();){
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(QUERY);
			while(resultSet.next()) {
				Highradius hello = new Highradius();
				
				//getting hello based on column name				
				hello.setSlNo(resultSet.getInt("sl_no"));
				hello.setBusinessCode(resultSet.getString("business_code"));
				hello.setCustNumber(resultSet.getInt("cust_number"));
				hello.setClearDate(resultSet.getString("clear_date"));
				hello.setBuisnessYear(resultSet.getInt("buisness_year"));
				hello.setDocId(resultSet.getString("doc_id"));
				hello.setPostingDate(resultSet.getString("posting_date"));
				hello.setDocumentCreateDate(resultSet.getString("document_create_date"));
				// hello.setDocumentCreateDate1(resultSet.getString("document_create_date1"));
				hello.setDueInDate(resultSet.getString("due_in_date"));
				hello.setInvoiceCurrency(resultSet.getString("invoice_currency"));
				hello.setDocumentType(resultSet.getString("document_type"));
				hello.setPostingId(resultSet.getInt("posting_id"));
				// hello.setAreaBusiness(resultSet.getString("area_business"));
				hello.setTotalOpenAmount(resultSet.getDouble("total_open_amount"));
				hello.setBaselineCreateDate(resultSet.getString("baseline_create_date"));
				hello.setCustPaymentTerms(resultSet.getString("cust_payment_terms"));
				hello.setInvoiceId(resultSet.getInt("invoice_id"));
				// hello.setIsOpen(resultSet.getInt("isOpen"));
				 hello.setAgingBucket(resultSet.getString("aging_bucket"));
				// hello.setIsDeleted(resultSet.getInt("is_deleted"));
				
				
				
				//gettind hello based on column number
				//hello.setId(resultSet.getInt(1));
				//hello.setLastUpdated(resultSet.getString(4));
				internship.add(hello);
			}
			
			// converting list into JSON Data
			Gson gson = new Gson();
			String result = gson.toJson(internship);
			
			//setting the response headers
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			
			// sending JSON Data
			PrintWriter writer = response.getWriter();
			writer.print(result);
			writer.flush();
			writer.close();
		}catch(SQLException e) {
			System.out.println(e.getMessage());
		}
		
	}catch(Exception e) {
		System.out.println(e);}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}


