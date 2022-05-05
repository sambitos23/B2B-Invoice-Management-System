package com.demo;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.CP;
import com.google.gson.Gson;

/**
 * Servlet implementation class Demo
 */
@WebServlet("/insert")
public class insert extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String QUERY = "insert into winter_internship(business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public insert() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String success = "Insert data successfully";
		String fail = "Somthing went wrong";
        
		try (Connection connection = CP.createC(); PreparedStatement preparedStatement = connection.prepareStatement(QUERY)) {
            preparedStatement.setString(1, request.getParameter("business_code"));
            preparedStatement.setString(2, request.getParameter("cust_number"));
            preparedStatement.setString(3, request.getParameter("clear_date"));
            preparedStatement.setString(4, request.getParameter("buisness_year"));
            preparedStatement.setString(5, request.getParameter("doc_id"));
            preparedStatement.setString(6, request.getParameter("posting_date"));
            preparedStatement.setString(7, request.getParameter("document_create_date"));
            preparedStatement.setString(8, request.getParameter("due_in_date"));
            preparedStatement.setString(9, request.getParameter("invoice_currency"));
            preparedStatement.setString(10, request.getParameter("document_type"));
            preparedStatement.setString(11, request.getParameter("posting_id"));
            preparedStatement.setString(12, request.getParameter("total_open_amount"));
            preparedStatement.setString(13, request.getParameter("baseline_create_date"));
            preparedStatement.setString(14, request.getParameter("cust_payment_terms"));
            preparedStatement.setString(15, request.getParameter("invoice_id"));
            System.out.println(preparedStatement);
            preparedStatement.executeUpdate();
          
        // converting list into JSON Data
		Gson gson = new Gson();
		String result = gson.toJson(success);   
 			
         // sending JSON Data
		 PrintWriter writer = response.getWriter();
		 writer.print(result);
		 writer.flush();
		 writer.close();
			
        } catch (SQLException e) {
        	System.out.println(e);
        	
        	 // converting list into JSON Data
    		Gson gson = new Gson();
    		String result = gson.toJson(fail);
        	
        	// sending JSON Data
			PrintWriter writer = response.getWriter();
			writer.print(result);
			writer.flush();
			writer.close();
        }
		
	}

}
