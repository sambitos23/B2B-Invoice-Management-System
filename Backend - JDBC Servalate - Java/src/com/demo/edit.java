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
@WebServlet("/edit")
public class edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final String QUERY = "update winter_internship set invoice_currency = ?,cust_payment_terms= ? where sl_no = ?";
	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public edit() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String success = "Edit data successfully";
		String fail = "Somthing went wrong";
        
		try (Connection connection = CP.createC(); PreparedStatement preparedStatement = connection.prepareStatement(QUERY)) {
			preparedStatement.setInt(3, Integer.parseInt(request.getParameter("sl_no")));
            preparedStatement.setString(1, request.getParameter("invoice_currency"));
            preparedStatement.setString(2, request.getParameter("cust_payment_terms"));
            System.out.println(preparedStatement);
            preparedStatement.executeUpdate();
            
            if(preparedStatement.executeUpdate() == 1) {
            	
            	// converting list into JSON Data
        		Gson gson = new Gson();
        		String result = gson.toJson(success);   
         			
                 // sending JSON Data
        		 PrintWriter writer = response.getWriter();
        		 writer.print(result);
        		 writer.flush();
        		 writer.close();            	
            }else {
            	 // converting list into JSON Data
        		Gson gson = new Gson();
        		String result = gson.toJson(fail);
            	
            	// sending JSON Data
    			PrintWriter writer = response.getWriter();
    			writer.print(result);
    			writer.flush();
    			writer.close();
            }
    		 
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
