// MODELO
var name='';
var mana='';
var attack='';
var resist= '';
var colors='';
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

   name =$("input")[0].value;
   }
function getAttack(){

attack =$("input")[2].value;
}
function getResistencia(){

   resist =$("input")[3].value;

}
function getCoste(){
mana = $("input")[1].value ;
}

function getColors(){
if( $('#white').prop('checked') ) {
    colors +=  $('#white').val()+"|"; 
}
if( $('#red').prop('checked') ) {
       colors +=  $('#red').val()+"|";
}
if( $('#green').prop('checked') ) {
       colors +=  $('#green').val()+"|";
}
if( $('#blue').prop('checked') ) {
       colors +=  $('#blue').val()+"|";
}
if( $('#black').prop('checked') ) {
       colors +=  $('#black').val()+"|";
}
}
 function reset(){
  $("input")[0].value="";
  $("input")[1].value="";
  $("input")[2].value="";
  $("input")[3].value="";
   pagina = 1;
   $("#datos").html("");
 }

// VISTA
function crearVista(datos){
  var div = $("<div></div>").html(datos);
  $("#datos").append(div);

}






$("#buscar").click(function(){
  pagina=1;
    $("#datos").html("");
    name='';
    mana='';
    attack='';
    resist= '';
    colors='';
    getNombre();
    getCoste();
    getResistencia();
    getAttack();
    getColors();
    chargeCards(name,mana,attack,resist,colors);

}
);

var peticionCurso = false;
function chargeCards(nombre,cmc,ataque,resist,colors){

  if(!peticionCurso){
   $('img#slidecaption').show('slow');
  

peticionCurso=true;
  $.ajax({

        url: "https://api.magicthegathering.io/v1/cards?pageSize="+cantidad+"&page="+pagina+"&name="+nombre+"&cmc="+cmc+"&power="+ataque+"&toughness="+resist+"&colors="+colors+"&language=spanish" ,
        dataType: 'json',
        type: 'GET',
        success: function(json) {
          $('img#slidecaption').hide('2000');
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
chargeCards("","","","","");

  // Each time the user scrolls
  win.scroll(function() {
    // End of the document reached?
    if ($(document).height() - win.innerHeight() <= win.scrollTop()) {
    chargeCards(name,mana,attack,resist,colors);

    
          
    
    }
  });
});







