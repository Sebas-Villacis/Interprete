package com.tesis.dao;

import java.sql.Connection;
import java.sql.DriverManager;

import com.tesis.model.User;

public class Connect {

	protected static Connection cx;
	
	public static Connection conectar(User user) {
		if(cx!=null) {
			return cx;
		}
		try {
			
			String url = "jdbc:postgresql://localhost:5432/" + user.getDatabaseName();
			String us = user.getName();
			String pass = user.getPassword();
			Class.forName("org.postgresql.Driver");
			cx = DriverManager.getConnection(url, us, pass);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return cx;
	}
}
