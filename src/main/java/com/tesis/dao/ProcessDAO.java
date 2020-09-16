package com.tesis.dao;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.tesis.model.User;

@Repository
public class ProcessDAO {

	private Connection cx;


	public Connection connect(User user) {
		cx = Connect.conectar(user);
		return cx;
	}

	public List<JSONObject> procesarSelect(String query) {
		List<JSONObject> resList = new ArrayList<>();

		try {
			Statement statement = cx.createStatement();
			ResultSet resultSet = statement.executeQuery(query);
			ResultSetMetaData rsMeta = resultSet.getMetaData();
			int columnCnt = rsMeta.getColumnCount();
			List<String> columnNames = new ArrayList<String>();
			// iteracion para obtener todos los nombres
			for (int i = 1; i <= columnCnt; i++) {
				// se agregan todas los nombres a la lista
				columnNames.add(rsMeta.getColumnName(i).toUpperCase());
			}
			while (resultSet.next()) {
				// convierte cada objeto a un json
				JSONObject obj = new JSONObject();
				try {
				      Field changeMap = obj.getClass().getDeclaredField("map");
				      changeMap.setAccessible(true);
				      changeMap.set(obj, new LinkedHashMap<>());
				      changeMap.setAccessible(false);
				    } catch (IllegalAccessException | NoSuchFieldException e) {
				      System.out.println(e.getMessage());
				    }
				for (int i = 1; i <= columnCnt; i++) {
					String key = columnNames.get(i - 1);
					String value = resultSet.getString(i).trim();
					obj.put(key, value);
				}
				resList.add(obj);

			}
			resultSet.close();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return resList;
	}

	public Integer procesarInsert(String query) {
		
		try {
			PreparedStatement preparedStatement = cx.prepareStatement(query);
			preparedStatement.executeUpdate();
			preparedStatement.close();
			return 1;
		} catch (SQLException sqlEx) {

			sqlEx.printStackTrace();

		}
		return 0;

	}

	public Integer procesarUpdate(String query) {
	
		try {
			PreparedStatement preparedStatement = cx.prepareStatement(query);
			preparedStatement.executeUpdate();
			preparedStatement.close();
			return 1;
		} catch (SQLException sqlEx) {
			sqlEx.printStackTrace();
		}
		return 0;
	}

	public Integer procesarDelete(String query) {
		
		try {
			PreparedStatement preparedStatement = cx.prepareStatement(query);
			preparedStatement.executeUpdate();
			preparedStatement.close();
			return 1;
		} catch (SQLException sqlEx) {

			sqlEx.printStackTrace();

		}
		return 0;
	}
}
