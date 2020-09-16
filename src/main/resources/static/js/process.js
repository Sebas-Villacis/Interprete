$(document).ready(function() {
	document.onkeydown = function(e) {
		  if(event.keyCode == 123) {
		     return false;
		  }
		  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
		     return false;
		  }
		  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
		     return false;
		  }
		  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
		     return false;
		  }
		  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
		     return false;
		  }
		}
	var retrievedObject = sessionStorage.getItem('user');
    var obj = JSON.parse(retrievedObject);

	
	if(obj == null ){
		
		window.location='http://localhost:8080/';
		
	}
	else{
		userSession.append(obj[0]['name']);
		dataBaseName.append(obj[0]['database']);
		
	}
    $("#iniciar").click(function(){
    	var sql = $("#sentencia").val();
        //alert(sql);
    	$.ajax({
			type : "GET",
			url : "http://localhost:8080/process/transform/"+sql,							
			success : function(rpta) {
				//console.log(rpta);
				var operacion = rpta[0][0].substr(0,rpta[0][0].indexOf(' '));
				//console.log(operacion);
				$("#sql").val(rpta[0][0]);
				var sentenciaSql = $("#sql").val();
				var scntDiv = $('#queryHistory');

				if ($('#tokens li').length != 0){
					$("#tokens").empty();
				}
				if ($('#errors li').length != 0){
					$("#errors").empty();
				}
				var scnli = $('#tokens');
				for (let item of rpta[1]){
					scnli.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Token</div><div class="device-model">'+item+'</div><div class="device-make ui label">jflex</div> </div></a></li>');
					
					}
				
				var scnlierror = $('#errors');
				
				if(operacion == "SELECT"){	
					$.ajax({
						type:"GET",
						url: "http://localhost:8080/process/transform/select/"+sentenciaSql,
						success: function(res){
							//console.log(res[0]);
							if(res.length > 0){
								
								
								
								if(rpta[2][0]!=""){
									for (let item of rpta[2]){
										scnlierror.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Caracter no esperado</div><div class="device-model">'+item+'</div><div class="device-make ui label">cup</div> </div></a></li>');
										
										}
								}
								else{
									
								
								scntDiv.append( '<tr><td class="completed-when">Éxito</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
								}
								var jsonRes = {"data":[res]};
								//console.log(typeof jsonRes);
								var columns=[];
								res = jsonRes;
								
								
								columnNames = Object.keys(res.data[0][0]);
								//console.log(columnNames);
								for (var i in columnNames) {
								      columns.push({data: columnNames[i], 
								                    title: columnNames[i]});
								    }
								
								if ( $.fn.DataTable.isDataTable('#tabla') ) {
									  $('#tabla').DataTable().destroy();
									}

									$('#tabla tbody').empty();
									$('#tabla thead').empty();
								
								$('#tabla').DataTable({
									responsive: true,
									 stateSave: true,
									 "bSort": false,
									"pagingType": "full_numbers",
					                data: res.data[0],
					                columns: columns
					                
					            });
							
								
							}
							else{
								
								scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
								 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> <a href="#" class="alert-link">La tabla o columna(s) no existe(n) en el esquema.</div>';
								 $(".alert-message").prepend(htmlAlert);
						        
						        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
							}
							
							
							
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown){
							alert("Request: " + XMLHttpRequest.toString()
									+ "\n\nStatus: " + textStatus
									+ "\n\nError: " + errorThrown);
							
						}
					});
				}
				else if(operacion == "INSERT"){
					$.ajax({
						type:"POST",
						url: "http://localhost:8080/process/transform/insert/"+sentenciaSql,
						success: function(res){
							//Console.log(res);
							if(rpta[2][0]!=""){
								for (let item of rpta[2]){
									scnlierror.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Caracter no esperado</div><div class="device-model">'+item+'</div><div class="device-make ui label">cup</div> </div></a></li>');
									
									}
							}
							if(res==0){
								scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							}
							else{
								scntDiv.append( '<tr><td class="completed-when">Éxito</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
								var htmlAlert = '<div class="alert alert-success" role="alert"><strong>Éxito!</strong> <a href="#" class="alert-link">El registro se ha insertado correctamente en la base.</div>';
								 $(".alert-message").prepend(htmlAlert);
						        
						        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
							}
							
							
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown){
//							alert("Request: " + XMLHttpRequest.toString()
//									+ "\n\nStatus: " + textStatus
//									+ "\n\nError: " + errorThrown);
							scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> <a href="#" class="alert-link">La tabla o columna(s) no existe(n) en el esquema.</div>';
							 $(".alert-message").prepend(htmlAlert);
					        
					        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
						}
					});
				}
				else if(operacion == "UPDATE"){
					$.ajax({
						type:"PUT",
						url: "http://localhost:8080/process/transform/update/"+sentenciaSql,
						success: function(res){
							if(rpta[2][0]!=""){
								for (let item of rpta[2]){
									scnlierror.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Caracter no esperado</div><div class="device-model">'+item+'</div><div class="device-make ui label">cup</div> </div></a></li>');
									
									}
							}
							if(res==0){
								scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							}
							else{
								scntDiv.append( '<tr><td class="completed-when">Éxito</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
								var htmlAlert = '<div class="alert alert-success" role="alert"><strong>Éxito!</strong> <a href="#" class="alert-link">El registro se ha actualizado correctamente en la base.</div>';
								 $(".alert-message").prepend(htmlAlert);
						        
						        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
							}
							
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown){
//							alert("Request: " + XMLHttpRequest.toString()
//									+ "\n\nStatus: " + textStatus
//									+ "\n\nError: " + errorThrown);
							scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> <a href="#" class="alert-link">La tabla o columna(s) no existe(n) en el esquema.</div>';
							 $(".alert-message").prepend(htmlAlert);
					        
					        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
						}
					});
				}
				else if(operacion == "DELETE"){
					$.ajax({
						type:"DELETE",
						url: "http://localhost:8080/process/transform/delete/"+sentenciaSql,
						success: function(res){
							if(rpta[2][0]!=""){
								for (let item of rpta[2]){
									scnlierror.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Caracter no esperado</div><div class="device-model">'+item+'</div><div class="device-make ui label">cup</div> </div></a></li>');
									
									}
							}
							if(res==0){
								scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							}
							else{
								scntDiv.append( '<tr><td class="completed-when">Éxito</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
								var htmlAlert = '<div class="alert alert-success" role="alert"><strong>Éxito!</strong> <a href="#" class="alert-link">El registro se ha eliminado correctamente en la base.</div>';
								 $(".alert-message").prepend(htmlAlert);
						        
						        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
							}
							
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown){
//							alert("Request: " + XMLHttpRequest.toString()
//									+ "\n\nStatus: " + textStatus
//									+ "\n\nError: " + errorThrown);
							scntDiv.append( '<tr><td class="completed-when">Falló</td><td class="completed-status"><i class="circle icon teal"></i></td><td class="completed-who">' + sentenciaSql + '</td></tr>');
							 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> <a href="#" class="alert-link">La tabla o columna(s) no existe(n) en el esquema.</div>';
							 $(".alert-message").prepend(htmlAlert);
					        
					        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
						}
					});
				}
				else{
					for (let item of rpta[2]){
						scnlierror.append( '<li> <a href="javascript:"><div class="device-status-icon"></div><div class="device-details"><div class="device-location">Caracter no esperado</div><div class="device-model">'+item+'</div><div class="device-make ui label">cup</div> </div></a></li>');
						
						}
					 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> <a href="#" class="alert-link">Consulta en lenguaje natural escrito mal estructurado</div>';
						 $(".alert-message").prepend(htmlAlert);
				        
				        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
					
				}
			},
			error : function(XMLHttpRequest, textStatus,
					errorThrown) {
				alert("Request: " + XMLHttpRequest.toString()
						+ "\n\nStatus: " + textStatus
						+ "\n\nError: " + errorThrown);
			}
		});
    }); 
});