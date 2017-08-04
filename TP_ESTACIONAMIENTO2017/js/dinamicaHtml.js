$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});

function cambiarcolor()
{       
        var color = $("#colorChange").val();
        var option = "op=cambiarcolor&color="+color;

        console.log(color);

        $.ajax({
		type:"POST", 
		dataType:"text", 
		url:"./php/verificarlogin.php",
		crossDomain: true,
                data:option,
		async:true,
		})
		.done(function(valor){

                lugar = $("#divBg");

                lugar.css("background-color",color);
			
                console.log(valor);

		})		
		.fail(function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        })
}