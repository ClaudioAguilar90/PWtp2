//var arreglo = new Array();
var arreglo = obtener_sesion();
//console.log(arreglo);
dibujarTabla(arreglo);
var n=0;



function runScript(e) {
    //Comprueba si apreta enter//
    if (e.keyCode == 13) {
        //alert("apretaste enter");
        document.getElementById("boton").click();
        //return false;
    }
}


//FUNCION AGREGAR FILA//
function add (){
  var dato = document.getElementById("tarea").value;

  //compruebo que el input no este vacio//
  if (dato!=""){
    arreglo.push(dato);
    document.getElementById("tarea").value="";
    document.getElementById("tarea").focus();
    //dibujarTabla(dato);
    dibujarTabla(arreglo);
  }
  else {
    alert("Por favor ingrese como minimo 1 letra!");
    document.getElementById("tarea").focus();
  }
  
}


//FUNCION ELIMINAR FILA//
function eliminarFila(t,p){
  arreglo.splice(p,1);
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
  }

  else {
    texto.innerHTML= "";
    texto2.style.textDecoration = 'none';
  }
}


//FUNCION PARA INSERTAR EN LA TABLA LA TAREA//
function dibujarTabla(arreglo){
  limpiartabla();
  for(i=0; i<=arreglo.length-1 ; i++){
    document.getElementById("tabla").insertRow(0).innerHTML = "<td><input type='checkbox' value='"+i+"' id='check"+i+"' onclick='estaCheckeado(this)' class='checkk'></td><td><span id='completed"+i+"'></span><span id='dato"+i+"'>"+arreglo[i]+"</span></td>  <td> <button onclick='copiar(this)' value="+i+" class='eliminar btn-copiar'><img src='img/clipboard-text-multiple-outline.png' alt='x' class='icon' /> <input name='text' id='texto-copiar-"+i+"' type='hidden' class='texto-copiar' value='"+arreglo[i]+"'> </button></td> <td> <button onclick='share(this)' value="+i+" class='eliminar'><img src='img/share-variant.png' alt='x' class='icon' /></button></td><td> <button onclick='eliminarFila(this,"+i+")' value="+i+" class='eliminar'><img src='img/trash.png' alt='x' class='icon' /></button></td>";
  }
  console.log(arreglo);
  sesion_datos();
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
        //inputEl.value = '';
        /*if (writeBtn.innerText !== 'Copied!') {
          const originalText = writeBtn.innerText;
          writeBtn.innerText = 'Copied!';
          setTimeout(() => {
            writeBtn.innerText = originalText;
          }, 1500);
        }*/

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



