//var arreglo = new Array();
var arreglo = obtener_sesion();
var datos = obtener_sesion2();
console.log(datos);
dibujarTabla(arreglo);
var n=0;


/*---GEOLOCATION---
  var localizacionn = localizacion();
  console.log(localizacionn);
/*---------------------------*/

getLocation();

function runScript(e) {
    //Comprueba si apreta enter//
    if (e.keyCode == 13) {
        //alert("apretaste enter");
        document.getElementById("boton").click();
        //return false;
    }
}


function getLocation() {
  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

function showPosition(position) {

  var latitud = position.coords.latitude;
  var longitud = position.coords.longitude;

  //console.log(longitud , latitud);

  var ubicacion = {latitud , longitud};

  console.log("ubicacion showPosition: "+ubicacion);
  
  localStorage.setItem("ubicacion", JSON.stringify(ubicacion) );

}


function obtenerUbicacion() {

  var ubicacion = localStorage.getItem('ubicacion');
  var latitud;
  var longitud;
  if(ubicacion!= null){
    // Se parsea para poder ser usado en js con JSON.parse :)
    ubicacion = JSON.parse(ubicacion);
    
    latitud = ubicacion.latitud;
    longitud = ubicacion.longitud;

  }
  else{
    latitud = null;
    longitud = null;
  }
  
  console.log("latitud: "+latitud);
  //console.log("Longitud: "+longitud);

  return {latitud,longitud};
}


/*-------------------*/


//FUNCION AGREGAR FILA//
function add (){
  var dato = document.getElementById("tarea").value;

  //compruebo que el input no este vacio//
  if (dato!=""){
    arreglo.push(dato);


    /*---GEOLOCATION---*/
    getLocation();
    var latitud = obtenerUbicacion().latitud;
    var longitud = obtenerUbicacion().longitud;
    //console.log(ubicacion);
    var ubicacion = {latitud,longitud};
    /*---------------------------*/

    /*------------------------*/
    var idtask = arreglo.length-1;
    var checkeado = document.getElementById("check"+arreglo.length-1);

    datos.push({ 
        "idtask"    : idtask,
        "tarea"  : dato,
        "checkeado"    :  checkeado
        ,"geo"    :  ubicacion
    });

    console.log(datos);
    /*---------------------------*/
    document.getElementById("tarea").value="";
    document.getElementById("tarea").focus();
    //dibujarTabla(dato);
    dibujarTabla(arreglo);

    
    
    sesion_datos2();
    

  }
  else {
    alert("Por favor ingrese como minimo 1 letra!");
    document.getElementById("tarea").focus();
  }
  
}


//FUNCION ELIMINAR FILA//
function eliminarFila(t,p){
  arreglo.splice(p,1);
  datos.splice(p,1)
  dibujarTabla(arreglo);
  //console.log(arreglo);
  
}


//FUNCION DE TAREA COMPLETADA//
function estaCheckeado(valor){
  var checkeado = document.getElementById("check"+valor.value).checked;
  //alert (checkeado);

  var texto = document.getElementById('completed'+valor.value);
  var texto2 = document.getElementById('dato'+valor.value);

  //compruebo si esta checkeada la tarea//
  if (checkeado){
    
    texto.innerHTML= "Completado ";
    texto.style.textDecoration = 'line-through';
    texto2.style.textDecoration = 'line-through';
    datos[valor.value]["checkeado"] = checkeado;

  }

  else {
    texto.innerHTML= "";
    texto2.style.textDecoration = 'none';
    datos[valor.value]["checkeado"] = false;
  }

  //console.log(datos);
  
  console.log(datos);
  sesion_datos2();

  //dibujarTabla(arreglo);
}


//FUNCION PARA INSERTAR EN LA TABLA LA TAREA//
function dibujarTabla(arreglo){
  limpiartabla();
  for(i=0; i<=arreglo.length-1 ; i++){
    document.getElementById("tabla").insertRow(0).innerHTML = "<td><input type='checkbox' value='"+i+"' id='check"+i+"' onclick='estaCheckeado(this)' class='checkk'></td><td><span id='completed"+i+"'></span><span id='dato"+i+"'>"+arreglo[i]+"</span></td>  <td> <button onclick='copiar(this)' value="+i+" class='eliminar btn-copiar'><img src='img/clipboard-text-multiple-outline.png' alt='x' class='icon' /> <input name='text' id='texto-copiar-"+i+"' type='hidden' class='texto-copiar' value='"+arreglo[i]+"'> </button></td> <td> <button onclick='share(this)' value="+i+" class='eliminar'><img src='img/share-variant.png' alt='x' class='icon' /></button></td><td> <button onclick='eliminarFila(this,"+i+")' value="+i+" class='eliminar'><img src='img/trash.png' alt='x' class='icon' /></button></td>";
    if (datos[i]["checkeado"]){

      document.getElementById("check"+i).checked = true;
      var inputCheck = document.getElementById("check"+i);
      estaCheckeado(inputCheck);

      console.log(document.getElementById("check"+i));

    }
  }
  console.log(arreglo);
  sesion_datos();
  sesion_datos2();
}

function limpiartabla(){
  document.getElementById("tabla").innerHTML="";
}

/*FUNCION CLIPBOARD*/


function copiar(t){

  var writeBtn = document.querySelector('.btn-copiar');
  var inputEl = document.getElementById("texto-copiar-"+t.value);
  //alert (inputEl.value);

  const inputValue = inputEl.value.trim();
  if (inputValue) {
    navigator.clipboard.writeText(inputValue)
      .then(() => {
        
        alert ("Elemento Copiado!");
      })
      .catch(err => {
        console.log('Algo salio mal... ', err);
      })
  }
}


/*----------------------------------------*/


/*Funcion Compartir*/
function share(t) {
  var inputEl = document.getElementById("texto-copiar-"+t.value);
  //alert(inputEl.value);

  if (navigator.share) {
    navigator.share({
      title: 'Tarea',
      text: inputEl.value,
      url: window.location.href
    }).then(() => {
      console.log('Gracias por Compartir!!');
    })
    .catch(err => {
      console.log('No puede compartirse porque: ', err.message);
    });
  } else {
    console.log('Navegador no soportado');
  }
}



/*Funcion persistencia de datos*/

function sesion_datos(){
  localStorage.setItem("tareas_arreglo", JSON.stringify(arreglo) );
}

function obtener_sesion(){
  // Obtener el arreglo de localStorage
  var arreglo = localStorage.getItem('tareas_arreglo');
  if(arreglo!= null){
    // Se parsea para poder ser usado en js con JSON.parse :)
    arreglo = JSON.parse(arreglo);
    //alert("viene de sesion "+arreglo);
  }
  else {
    arreglo = new Array();
  }

  return arreglo;
}





function sesion_datos2(){
  localStorage.setItem("tareas_arreglo2", JSON.stringify(datos) );
}

function obtener_sesion2(){
  var datos = localStorage.getItem('tareas_arreglo2');
  //datos = JSON.parse(datos);
  if(datos!= null){
    // Se parsea para poder ser usado en js con JSON.parse :)
    datos = JSON.parse(datos);
    //alert("viene de sesion "+arreglo);
  }
  else {
    datos = new Array();
  }

  return datos;
}

/*funcion guardar array json*/


