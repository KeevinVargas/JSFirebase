const firebaseConfig = {
    apiKey: "AIzaSyCJhmooTF05oFMIlcOEcGmttwocWNgZaLk",
    authDomain: "proyecto-b0939.firebaseapp.com",
    databaseURL: "https://proyecto-b0939-default-rtdb.firebaseio.com",
    projectId: "proyecto-b0939",
    storageBucket: "proyecto-b0939.appspot.com",
    messagingSenderId: "691007666776",
    appId: "1:691007666776:web:d4735064af29392b84e82d",
    measurementId: "G-81P3B7WFY6"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var ISRC = document.getElementById("Input1").value;
    var Artista = document.getElementById("Input2").value;
    var Titulo = document.getElementById("Input3").value;
    var Album = document.getElementById("Input4").value;
    var Fecha = document.getElementById("Input5").value;
    var Sello = document.getElementById("Input6").value;
    var Genero = document.getElementById("Input7").value;

    //validaciones
    if (ISRC.length > 0) {
        //creo un objeto que guarda los datos
        var Cancion = {
            ISRC, //matricula:id
            Artista,
            Titulo,
            Album,
            Fecha,
            Sello,
            Genero
        }

        //console.log(alumno);

        firebase.database().ref('Canciones/' + ISRC).update(Cancion).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Canciones');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Cancion){
    
    if(Cancion!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Cancion.ISRC;
        cell2.innerHTML = Cancion.Artista; 
        cell3.innerHTML = Cancion.Titulo;
        cell4.innerHTML = Cancion.Album; 
        cell5.innerHTML = Cancion.Fecha; 
        cell6.innerHTML = Cancion.Sello;
        cell7.innerHTML = Cancion.Genero;  
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Cancion.ISRC})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Cancion.ISRC+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Canciones/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Canciones/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Cancion){
    if(Cancion!=null)
    {
        document.getElementById("Input1").value=Cancion.ISRC;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Cancion.Artista;
        document.getElementById("Input3").value=Cancion.Titulo;
        document.getElementById("Input4").value=Cancion.Album;
        document.getElementById("Input5").value=Cancion.Fecha;
        document.getElementById("Input6").value=Cancion.Sello;
        document.getElementById("Input7").value=Cancion.Genero;
      
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Canciones");
    ref.orderByChild("Genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Cancion){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Cancion.ISRC;
    cell2.innerHTML = Cancion.Artista; 
    cell3.innerHTML = Cancion.Titulo;
    cell4.innerHTML = Cancion.Album; 
    cell5.innerHTML = Cancion.Fecha; 
    cell6.innerHTML = Cancion.Sello;
    cell7.innerHTML = Cancion.Genero; 
   
}