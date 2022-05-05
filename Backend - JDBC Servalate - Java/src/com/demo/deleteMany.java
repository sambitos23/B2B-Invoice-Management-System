package com.demo;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

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
@WebServlet("/deleteMany")
public class deleteMany extends HttpServlet {
	private static final long serialVersionUID = 1L;	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public deleteMany() {
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String value = request.getParameter("sl_no");
		Connection connection = CP.createC();
		Statement DeleteStatement;
		
		String success = "Delete data successfully";
		String fail = "Somthing went wrong";
		
		
		try {
			DeleteStatement = connection.createStatement();
			DeleteStatement.execute("update winter_internship set is_deleted = 1 where sl_no in ("+value+")"); 
			
			// converting list into JSON Data
    		Gson gson = new Gson();
    		String result = gson.toJson(success);   
     			
             // sending JSON Data
    		 PrintWriter writer = response.getWriter();
    		 writer.print(result);
    		 writer.flush();
    		 writer.close();
    		 
    		 
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
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
