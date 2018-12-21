// MODELO
var cantidad=10;
var pagina = 1;
var datosJson;
function GetImagenEspañol() {
  var table='';
  var x = datosJson.cards;
  for (var i = 0; i <x.length; i++) { 
 
    for(var j=0; j < x[i].foreignNames.length;j++){
        if(x[i].foreignNames[j].language == "Spanish"){
               table += 
    "<img src='"+  x[i].foreignNames[j].imageUrl+"'>"
        }
    
    
  }
  }
 return table;
}

function GetImagen() {
  var img='';
  var x = datosJson.cards;
  for (var i = 0; i <x.length; i++) {      
               img += 
    "<img src='"+  x[i].imageUrl+"'>" 
  }
 return img;
}
function getNombre(){

   var x =   $("input")[0].value;
   return x;
}
function getCoste(){
if($("input")[2].value != 0){
  return true;
}
   return false;
}
 function reset(){
  $("input")[0].value="";
   pagina = 1;
   $("#datos").html("");
 }

// VISTA
function crearVista(datos){
  var div = $("<div></div>").html(datos);
  $("#datos").append(div);

}
$("input[type=checkbox]").on( 'click', function() {
    if( $(this).is(':checked') ){
        // Hacer algo si el checkbox ha sido seleccionado
        $(this).siblings('label').css({

              "filter"         : "brightness(500%)",
     "-webkit-filter" : "brightness(500%)",
     "-moz-filter"    : "brightness(500%)",
     "-o-filter"      : "brightness(500%)",
     "-ms-filter"     : "brightness(500%)"

        })
    } else {
        // Hacer algo si el checkbox ha sido deseleccionado
        alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
    }
});







$("#buscar").click(function(){
  pagina=1;
     $("#datos").html("");
     if(getCoste() == true){
chargeCards(getNombre(),$("input")[2].value)
}
else{
  chargeCards(getNombre(),"")
}

}
);

var peticionCurso = false;
function chargeCards(nombre,cmc){

  if(!peticionCurso){
   $('a#inifiniteLoader').show('fast');
  

peticionCurso=true;
  $.ajax({

        url: "https://api.magicthegathering.io/v1/cards?pageSize="+cantidad+"&page="+pagina+"&name="+nombre+"&cmc="+cmc+"&language=spanish" ,
        dataType: 'json',
        type: 'GET',
        success: function(json) {
          $('a#inifiniteLoader').hide('1000');
         datosJson = json;
       crearVista(GetImagen());
          pagina++;
       peticionCurso=false;
    
          
        }
      });
}

}


$(document).ready(function() {
  var win = $(window);
chargeCards("","");

  // Each time the user scrolls
  win.scroll(function() {
    // End of the document reached?
    if ($(document).height() - win.innerHeight() <= win.scrollTop()) {

      if(getCoste() == true){
chargeCards(getNombre(),$("input")[2].value)
}
else{
  chargeCards(getNombre(),"")
}
    
          
    
    }
  });
});