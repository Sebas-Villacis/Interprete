$(document).ready(function(){
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
	$('#login-submit').click(function(){
		var databaseName = $("#database").val();
		var user = $("#user").val();
		var password = $("#password").val();
		
		var input = {
				"name": user,
				"password": password,
				"databaseName": databaseName
		};
	
	
		
		$.ajax({
			type : "POST",
			url : "http://localhost:8080/user/access",							
			data : JSON.stringify(input),
			contentType: 'application/json; charset=UTF-8',
			success : function(rpta,textStatus,xhr) {
				
				if(xhr.status == 200){
					var newUser = new Object();

					newUser.name = rpta['name'];
					newUser.database = rpta['databaseName'];
					if(sessionStorage.user)
				    {
				     user = JSON.parse(sessionStorage.getItem('user'));
				    }else{
				     user =[];
				    }
				 user.push(newUser);
				 console.log(user);
				    sessionStorage.setItem('user', JSON.stringify(user));


				   
						
				window.location='http://localhost:8080/process';
				}
				else{
					

	
				}
			},
			error : function(xhr) {
				console.log(xhr);
				 var htmlAlert = '<div class="alert alert-danger" role="alert"><strong>Error : '+ xhr.status+' (“Unauthorized”)!</strong> <a href="#" class="alert-link">Credenciales incorrectas, revisa tus credenciales y vuelve iniciar sesión.</div>';
				 $(".alert-message").prepend(htmlAlert);
		        
		        $(".alert-message .alert").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });
			}
		});

	});
});