package com.tesis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class NavigationController {

	@GetMapping(value = {"/","/login**"})
	public ModelAndView paginaInicio() {
		ModelAndView model = new ModelAndView();
		model.addObject("titulo","Interprete");
		model.setViewName("login");
		return model;
		
		
	}
	
	@GetMapping(value = "/process")
	public ModelAndView paginaInterprete() {
		ModelAndView model = new ModelAndView();
		model.addObject("titulo","Interprete");
		model.setViewName("process");
		return model;
		
		
	}
	
	
	
}
