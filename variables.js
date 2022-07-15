let billeteraVirtual = Number(localStorage.getItem(`billeteraVirtual`));
// Array de Changuito vacio.
const changuito = [];
// Array para Sumar y unir los arrays.
let productosSinAlcohol = [];
let productosConAlcohol = [];
let misProductos = [];
let nombreUsuarioTienda = localStorage.getItem(`nombreUsuarioTienda`)
let apellidoUsuarioTienda = localStorage.getItem(`apellidoUsuarioTienda`)
let changuitoStorage = JSON.parse(localStorage.getItem(`changuitoParaStorage`));

//Inputs  para nombre y apellido
const nombreInput = document.getElementById(`nombre`);
const apellidoInput = document.getElementById(`apellido`);
const respuestaInput = document.getElementById(`respuesta`);
const formularioInput = document.getElementById(`datosPersonales`);


//Inputs  para agregar dinero
const dineroInput = document.getElementById(`saldo`);
const formDinero = document.getElementById(`dineroAGastar`);
const dineroIngresado = document.getElementById(`dineroIngresado`);


// Utilizado para ver los productos con los botones.
const verTodo = document.getElementById(`verProductos`);
const verProduSA = document.getElementById(`verProductosSA`);
const verProduCA = document.getElementById(`verProductosCA`);


//variables usadas en el changuito.
let canastaDeCompras = document.getElementById(`canasta`);


//variables usada para que aprezca la suma de los productos
let parrafoCanastaTotal = document.getElementById(`parrafoCanasta`);




// Utilizado para ver subir item al  catalogo
let catalogoDeProductos = document.getElementById(`catalogo`)

const catalogoProductos = document.getElementsByClassName(`catalogoProductos`);

const pagarTodoElChanguito = document.getElementById(`pagarProductos`)