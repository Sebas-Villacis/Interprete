package com.tesis.dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.tesis.util.Analizador_Lexico;

import java_cup.runtime.Symbol;
@Repository
public class Analizador_LexicoDAO {

	public static   List<String> obtenerTokens(Analizador_Lexico lexico) {;
		List<String> tokensList = new ArrayList<>();
		try {
			while (true) {
				// String token = lexico.next_token().value.toString();
				Symbol token = lexico.next_token();
				
				if (token.value == null) {
					tokensList.add("EOF");
					break;
				} // termina evaluacion
				switch (token.sym) {
				case 1:
					tokensList.add("Reconocio: " + token.value + " Error");
					break;
				case 2:
					tokensList.add("Reconocio: " + token.value + " Mas");
					break;
				case 3:
					tokensList.add("Reconocio: " + token.value + " Por");
					break;
				case 4:
					tokensList.add("Reconocio: " + token.value + " Division");
					break;
				case 5:
					tokensList.add("Reconocio: " + token.value + " Parentesis Derecho");
					break;
				case 6:
					tokensList.add("Reconocio: " + token.value + " Parentesis Izquierdo");
					break;
				case 7:
					tokensList.add("Reconocio: " + token.value + " Igual");
					break;
				case 8:
					tokensList.add("Reconocio: " + token.value + " Mayor");
					break;
				case 9:
					tokensList.add("Reconocio: " + token.value + " Menor");
					break;
				case 10:
					tokensList.add("Reconocio: " + token.value + " Número");
					break;
				case 11:
					tokensList.add("Reconocio: " + token.value + " Verbo");
					break;
				case 12:
					tokensList.add("Reconocio: " + token.value + " Mas");
					break;
				case 13:
					tokensList.add("Reconocio: " + token.value + " Preposicion");
					break;
				case 14:
					tokensList.add("Reconocio: " + token.value + " Proposicion");
					break;
				case 15:
					tokensList.add("Reconocio: " + token.value + " Sustantivo");
					break;
				case 16:
					tokensList.add("Reconocio: " + token.value + " Conjuncion");
					break;
				case 17:
					tokensList.add("Reconocio: " + token.value + " Fecha");
					break;
				case 18:
					tokensList.add("Reconocio: " + token.value + " Adjetivo");
					break;

				}
			}
		} catch (IOException e) {
			e.printStackTrace();}

		return tokensList;
	}
}
