package com.demo;
import java.sql.Connection;
import java.sql.DriverManager;

public class CP {
	
	static Connection con;
	
	public static Connection createC() {
		try {
			// load the driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			//create the connect....
//			String user = "sql6478555";
//			String password = "S8UwQWcPVE";
//			String url = "jdbc:mysql://sql6.freemysqlhosting.net:3306/sql6478555";
			String user = "root";
			String password = "Sambit28saha@";
			String url = "jdbc:mysql://localhost:3306/grey_goose";
			con = DriverManager.getConnection(url, user, password);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return con;
	}
}