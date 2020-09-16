package com.tesis.controller;

import java.sql.Connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tesis.dao.ProcessDAO;
import com.tesis.model.User;

@RestController
public class ProcessController {

	@Autowired
	private ProcessDAO dao;
	@PostMapping(value = "/user/access", consumes = "application/json")
	public ResponseEntity<User> registrar(@RequestBody User user) {

		Connection cu = dao.connect(user);
			if(cu == null) {
				user = null;
			return new ResponseEntity<>(user, HttpStatus.UNAUTHORIZED);
			}
		
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
