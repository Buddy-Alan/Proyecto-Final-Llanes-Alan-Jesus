let billeteraVirtual = Number(localStorage.getItem(`billeteraVirtual`))
    // Array de Changuito
const changuito = [];
let changuitoStorage = JSON.parse(localStorage.getItem(`changuitoParaStorage`));
// Array para Sumar unir los arrays
let misProductos = [];
let nombreUsuarioTienda = localStorage.getItem(`nombreUsuarioTienda`)
let apellidoUsuarioTienda = localStorage.getItem(`apellidoUsuarioTienda`)




//Clase para crear Productos
class Producto {
    constructor(articulo) {
        this.tipo = articulo.tipo;
        this.id = articulo.id;
        this.nombre = articulo.nombre;
        this.precio = articulo.precio;
        this.imagen = articulo.imagen
    }
    sumaIva() {
        this.precio = Math.round(this.precio * 1.21);
    }
}

//Clase para crear Changuito
class ProductosEnCanasta {
    constructor(articulo) {
        this.tipo = articulo.tipo;
        this.id = articulo.id;
        this.nombre = articulo.nombre;
        this.precio = articulo.precio;
        this.imagen = articulo.imagen
        this.cantidad = 1;
    }
    cambiarCantidad(accion) {
        switch (accion) {
            case `sumar`:
                this.cantidad += 1;
                break;
            case `restar`:
                if (this.cantidad > 1) {
                    this.cantidad -= 1;
                } else {
                    this.cantidad -= 1;
                    const indexProducto = changuito.findIndex(indexElemento => indexElemento.id == this.id);
                    changuito.splice(indexProducto, 1);
                }
                break;
        }
    }
}


//Inputs  para nombre y apellido
const nombreInput = document.getElementById(`nombre`);
const apellidoInput = document.getElementById(`apellido`);
const respuestaInput = document.getElementById(`respuesta`);
const formularioInput = document.getElementById(`datosPersonales`);
//funcion para ocultar el formulario

ocultarFormulario = () => {
    formularioInput.style.display = `none`;
    titulo.innerHTML = `<h3>¡Bienvenido <b>${nombreUsuarioTienda} ${apellidoUsuarioTienda}</b> a nuestra tienda online de Bebidas !</h3>
    <div class ="seccionCerrarSesion">
    <p class ="pCerrarSesion">¿Deseas Cerrar la sesion?</p>
    <button id="cerrarSesion" class="btn btn-primary"> Cerrar Sesion</button> 
    </div>`;
    botonCerrarSesion = document.getElementById("cerrarSesion");
    botonCerrarSesion.onclick = () => {
        localStorage.clear();
        location.reload();
    }
}



formularioInput.onsubmit = (e) => {
    e.preventDefault();
    nombreUsuarioTienda = nombreInput.value;
    apellidoUsuarioTienda = apellidoInput.value;
    localStorage.setItem(`nombreUsuarioTienda`, `${nombreInput.value}`);
    localStorage.setItem(`apellidoUsuarioTienda`, `${apellidoInput.value}`);
    ocultarFormulario();
}

//Oculta automaticamente el forumlaro si existe nombreUsuarioTienda y apellidoUsuarioTienda
if (!!nombreUsuarioTienda && !!apellidoUsuarioTienda) {
    ocultarFormulario();
}

//Inputs  para agregar dinero
const dineroInput = document.getElementById(`saldo`);
const formDinero = document.getElementById(`dineroAGastar`);
const dineroIngresado = document.getElementById(`dineroIngresado`);

formDinero.onsubmit = (e) => {
    e.preventDefault();
    billeteraVirtual = billeteraVirtual + Number(dineroInput.value)
    localStorage.setItem(`billeteraVirtual`, billeteraVirtual)
    dineroIngresado.innerHTML = `Su Saldo Actual es: $ ${billeteraVirtual}`
}

//corrobora si existe la billeteraVirtual y ejecuta directo el el inner.html
if (!!billeteraVirtual) {
    dineroIngresado.innerHTML = `Su Saldo Actual es: $ ${billeteraVirtual}`
}

//Funcion para sumar todos los productos del changuito.

const totalChanguito = () => {
    totalAPagar = changuito.reduce((total, elemento) => total + (elemento.precio * elemento.cantidad), 0);
    return (totalAPagar);
}


// Array de Objetos
let productosSinAlcohol = [
    new Producto({ tipo: "SA", id: "SA_1", nombre: "Sprite 2,25 Lts", precio: 300, imagen: `./imagenes/Sprite 2,25 Lts.jpg` }),
    new Producto({ tipo: "SA", id: "SA_2", nombre: "Coca 2,25 Lts", precio: 350, imagen: `./imagenes/Coca 2,25 Lts.jpg` })
];

// Array de Objetos
let productosConAlcohol = [
    new Producto({ tipo: "CA", id: "CA_1", nombre: "Fernet 750cc", precio: 915, imagen: `./imagenes/Fernet 750cc.jpg` }),
    new Producto({ tipo: "CA", id: "CA_2", nombre: "Gancia 950ml", precio: 495, imagen: `./imagenes/Gancia 950ml.jpg` })
];


// Array Concatenado entre productos con y sin alcohol
misProductos = productosSinAlcohol.concat(productosConAlcohol);
for (const productos of misProductos) {
    productos.sumaIva();
}


const catalogoProductos = document.getElementsByClassName(`catalogoProductos`);
console.log(catalogoProductos);

// Utilizado para ver subir item al  catalogo
let catalogoDeProductos = document.getElementById(`catalogo`)

// Utilizado para ver los productos con los botones.
const verTodo = document.getElementById(`verProductos`);
const verProduSA = document.getElementById(`verProductosSA`);
const verProduCA = document.getElementById(`verProductosCA`);

verTodo.addEventListener(`click`, () => { verTodoElCatalogo(misProductos) });
verProduCA.addEventListener(`click`, () => { verTodoElCatalogo(productosConAlcohol) });
verProduSA.onclick = () => { verTodoElCatalogo(productosSinAlcohol) };


// Funcion para ver todo el catalogo.
const verTodoElCatalogo = (productos) => {
    const listaProductosYaPasados = document.querySelectorAll(`.catalogoProductos`)
    for (const productosAnteriores of listaProductosYaPasados) {
        productosAnteriores.remove();
    }
    for (const catalogo of productos) {
        const etiqueta = document.createElement(`div`);
        etiqueta.className = `catalogoProductos`
        etiqueta.innerHTML = `
    <img src="${catalogo.imagen}" alt="${catalogo.nombre}" height="250" width="250" class="catalogoProductosImg"> 
    <div class="catalogoProductosDescripcion>
    <h1 class="catalogoProductosTitulo"> ${catalogo.nombre}</h1>
    <p class="catalogoProductosPrecio"> $ ${catalogo.precio} </p>
    </div>
    <div><button class="btn btn-secondary" id="agregar_${catalogo.id}">Agregar</button> </div>
    `
        catalogoDeProductos.append(etiqueta)
        botonAgregarProductos = document.getElementById(`agregar_${catalogo.id}`)
        botonAgregarProductos.addEventListener(`click`, (e) => {
            e.preventDefault();
            insertarProductosAChanguito(catalogo)
        })
    }
}

//variables usadas en el changuito.
let canastaDeCompras = document.getElementById(`canasta`);

//Funcion para saber index de un elemento del array por ID
saberI = (arrayABuscar, elementoBuscado) => {
    return (arrayABuscar.findIndex(elemento => elemento.id === elementoBuscado.id))
}


//Funcion para agregar productos al changito.
insertarProductosAChanguito = (producto) => {
    let index = saberI(changuito, producto)
    if (index > -1) {
        changuito[index].cambiarCantidad(`sumar`);
        cantidad = document.getElementById(`cantidad_${producto.id}`)
        cantidad.innerHTML = `Cantidad agregada: ${changuito[index].cantidad} `
    } else {
        changuito.push(new ProductosEnCanasta({ tipo: producto.tipo, id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: producto.cantidad }))
        agregarProductoAlChanguitoEnHtml(producto);
        botonParaEliminarProductosDeChanguito(producto);
    }
    localStorage.setItem(`changuitoParaStorage`, JSON.stringify(changuito));
}


//Funcion para agregar productos al html
const agregarProductoAlChanguitoEnHtml = (productoAAgregar) => {
    const etiquetaChango = document.createElement(`div`);
    etiquetaChango.classList.add(`productosDelChanguito_${productoAAgregar.id}`);
    etiquetaChango.id = `${productoAAgregar.id}`;
    etiquetaChango.innerHTML = `
<img src="${productoAAgregar.imagen}" alt="${productoAAgregar.nombre}" height="250" width="250" class="changuitoProductoImagen">
<div class="changuitoDescripcionProducto">
<h1>Producto: ${productoAAgregar.nombre}</h1>
<p>Precio por Unidad: ${productoAAgregar.precio}</p>
<p id="cantidad_${productoAAgregar.id}">Cantidad agregada: 1 </p>
</div> 
<div><button id="elminiar_${productoAAgregar.id}">Elminiar</button> </div>`
    canastaDeCompras.append(etiquetaChango)
}


//Funcion para el boton para eliminar productos.
botonParaEliminarProductosDeChanguito = (productoAEliminar) => {
    for (productosEnChango of changuito) {
        const eliminarUnProducto = document.getElementById(`elminiar_${productoAEliminar.id}`)
        const cantidadProducto = document.getElementById(`cantidad_${productoAEliminar.id}`)
        let index = saberI(changuito, productoAEliminar)
        eliminarUnProducto.onclick = () => {
            if (changuito[index].cantidad > 1) {
                changuito[index].cambiarCantidad(`restar`);
                cantidadProducto.innerHTML = `Cantidad agregada: ${changuito[index].cantidad} `
                console.log(changuito[index].cantidad)
            }
            // else if (changuito.length > 1) {
            //     const listadoDeProductos = document.querySelectorAll(`.productosDelChanguito_${changuito[index- 1].id}`)
            //     for (productoASacar of listadoDeProductos)
            //         productoASacar.remove();
            //     console.log(listadoDeProductos)
            //     console.log(changuito[index].cantidad)
            //     changuito[index].cambiarCantidad(`restar`);
            // } 
            else {
                {
                    const listadoDeProductos = document.querySelectorAll(`.productosDelChanguito_${changuito[index].id}`)
                    for (productoASacar of listadoDeProductos)
                        productoASacar.remove();
                    console.log(listadoDeProductos)
                    console.log(changuito[index].cantidad)
                    changuito[index].cambiarCantidad(`restar`);
                }
            }
        }
    }
}

//Utilizado par verificar los datos del Storage y volvelos a poner
const verificarDatosDeStorage = () => {
    if (!!changuitoStorage && changuitoStorage.length > 0) {
        for (const producto of changuitoStorage) {

            console.log(producto.cantidad)
            for (let i = 1; i <= producto.cantidad; i = i + 1) {
                insertarProductosAChanguito(producto);
            }
        }
    }
}

verificarDatosDeStorage();