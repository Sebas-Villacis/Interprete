package com.tesis.controller;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tesis.dao.Analizador_LexicoDAO;
import com.tesis.dao.ProcessDAO;
import com.tesis.util.Analizador_Lexico;
import com.tesis.util.Analizador_Sintactico;

@RestController
public class TransformationController {

	@Autowired
	private ProcessDAO dao;
	@Autowired
	private Analizador_LexicoDAO lexicoDAO;

	@GetMapping(value = "/process/transform/{query}")
	public ResponseEntity<List<List<String>>> procesarSentencia(@PathVariable("query") String query) throws Exception {
		List<List<String>> result = new ArrayList<>();
		List<String> sqlResult = new ArrayList<>();
		List<String> errors = new ArrayList<>();
		 new ArrayList<>();
		Analizador_Lexico lexico2 = new Analizador_Lexico(new StringReader(query));
		
		List<String> tokens = lexicoDAO.obtenerTokens(lexico2);
		Analizador_Lexico lexico = new Analizador_Lexico(new StringReader(query));
		Analizador_Sintactico sintactico = new Analizador_Sintactico(lexico);
		sintactico.parse();
		
		sqlResult.add(sintactico.resultado);
		errors.add(sintactico.printErrors());
		
		result.add(sqlResult);
		result.add(tokens);
		result.add(errors);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping(value = "/process/transform/select/{query}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> procesarSelect(@PathVariable("query") String query) throws Exception {
		JSONArray data = new JSONArray(dao.procesarSelect(query));
		if(data.isEmpty()) {
			System.out.println("no se encontro la columna personas");
		}
		String arrayToJson = data.toString();

		return new ResponseEntity<>(arrayToJson, HttpStatus.OK);
	}

	@PostMapping(value = "/process/transform/insert/{query}")
	public ResponseEntity<Integer> procesarInsert(@PathVariable("query") String query) throws Exception {

		if(dao.procesarInsert(query)==0) {
			return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(1, HttpStatus.OK);
	}

	@PutMapping(value = "/process/transform/update/{query}")
	public ResponseEntity<Integer> procesarUpdate(@PathVariable("query") String query) throws Exception {

		if(dao.procesarUpdate(query)==0) {
			return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(1, HttpStatus.OK);
	}

	@DeleteMapping(value = "/process/transform/delete/{query}")
	public ResponseEntity<Integer> procesarDelete(@PathVariable("query") String query) throws Exception {

		if(dao.procesarDelete(query)==0) {
			return new ResponseEntity<>(0, HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(1, HttpStatus.OK);
	}
}
