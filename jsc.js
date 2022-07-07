reiniciarPagina = () => {
    location.reload();
}

borrarDatos = () => {
    localStorage.clear();
    setTimeout(reiniciarPagina, 1850);
}
agregarPrecioDelChanguito = () => {
    parrafoCanastaTotal.innerHTML = `El Precio del Changuito Total Es: $${totalChanguito()}`;
}

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
        Swal.fire({
            title: '¿Queres Cerrar Sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Secion Cerrada!',
                    'Cerraste Sesion Correctamente',
                    'success',
                )
            }
            borrarDatos();
        })
    }
}

formularioInput.onsubmit = (e) => {
    e.preventDefault();
    nombreUsuarioTienda = nombreInput.value;
    apellidoUsuarioTienda = apellidoInput.value;
    localStorage.setItem(`nombreUsuarioTienda`, `${nombreInput.value}`);
    localStorage.setItem(`apellidoUsuarioTienda`, `${apellidoInput.value}`);
    Swal.fire({
        icon: 'success',
        title: 'Bienvenid@',
        text: `${nombreUsuarioTienda} ${apellidoUsuarioTienda}`,
    })
    ocultarFormulario();
}

//Oculta automaticamente el forumlaro si existe nombreUsuarioTienda y apellidoUsuarioTienda
!!nombreUsuarioTienda && !!apellidoUsuarioTienda ? ocultarFormulario() : console.log("Si no Existen esas Variables no Funciona");

formDinero.onsubmit = (e) => {
    e.preventDefault();
    billeteraVirtual += Number(dineroInput.value)
    localStorage.setItem(`billeteraVirtual`, billeteraVirtual)
    dineroIngresado.innerHTML = `Su Saldo Actual es: $ ${billeteraVirtual}`
}

//corrobora si existe la billeteraVirtual y ejecuta directo el el inner.html
if (!!billeteraVirtual) dineroIngresado.innerHTML = `Su Saldo Actual es: $ ${billeteraVirtual}`

//Funcion para sumar todos los productos del changuito.

const totalChanguito = () => {
    totalAPagar = changuito.reduce((total, elemento) => total + (elemento.precio * elemento.cantidad), 0);
    return (totalAPagar);
}



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
        const { id, imagen, nombre, precio } = catalogo
        const etiqueta = document.createElement(`div`);
        etiqueta.className = `catalogoProductos`
        etiqueta.innerHTML = `
    <img src="${imagen}" alt="${nombre}" height="250" width="250" class="catalogoProductosImg">
    <div class="catalogoProductosDescripcion>
    <h1 class="catalogoProductosTitulo"> ${nombre}</h1>
    <p class="catalogoProductosPrecio"> $ ${precio} </p>
    </div>
    <div><button class="btn btn-secondary" id="agregar_${id}">Agregar</button> </div>
    `
        catalogoDeProductos.append(etiqueta)
        botonAgregarProductos = document.getElementById(`agregar_${id}`)
        botonAgregarProductos.addEventListener(`click`, (e) => {
            e.preventDefault();
            insertarProductosAChanguito(catalogo)
        })
    }
}


//Funcion para saber index de un elemento del array por ID
saberI = (arrayABuscar, elementoBuscado) => {
    return (arrayABuscar.findIndex(elemento => elemento.id === elementoBuscado.id))
}


//Funcion para agregar productos al changito.
insertarProductosAChanguito = (producto) => {
    let index = saberI(changuito, producto)
    if (index > -1) {
        changuito[index].cambiarCantidad(`sumar`);
        cantidad = document.getElementById(`cantidad_${producto?.id}`)
        cantidad.innerHTML = `Cantidad agregada: ${changuito[index]?.cantidad} `
    } else {
        changuito.push(new ProductosEnCanasta({ tipo: producto.tipo, id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, cantidad: producto.cantidad }))
        agregarProductoAlChanguitoEnHtml(producto);
        botonParaEliminarProductosDeChanguito(producto);
    }
    localStorage.setItem(`changuitoParaStorage`, JSON.stringify(changuito));
    agregarPrecioDelChanguito();
}


//Funcion para agregar productos al html
const agregarProductoAlChanguitoEnHtml = (productoAAgregar) => {
    const etiquetaChango = document.createElement(`div`);
    const { id, imagen, nombre, precio } = productoAAgregar
    etiquetaChango.classList.add(`productosDelChanguito_${id}`);
    etiquetaChango.id = `${id}`;
    etiquetaChango.innerHTML = `
<img src="${imagen}" alt="${nombre}" height="250" width="250" class="changuitoProductoImagen">
<div class="changuitoDescripcionProducto">
<h1>Producto: ${nombre}</h1>
<p>Precio por Unidad: ${precio}</p>
<p id="cantidad_${id}">Cantidad agregada: 1 </p>
</div>
<div><button id="elminiar_${id}">Elminiar</button> </div>`
    canastaDeCompras.append(etiquetaChango)
}



//Funcion para el boton para eliminar productos.
botonParaEliminarProductosDeChanguito = (productoAEliminar) => {
    for (productosEnChango of changuito) {
        const eliminarUnProducto = document.getElementById(`elminiar_${productoAEliminar?.id}`)
        const cantidadProducto = document.getElementById(`cantidad_${productoAEliminar?.id}`)
        let index = saberI(changuito, productoAEliminar)
        eliminarUnProducto.onclick = () => {
            if (changuito[index].cantidad > 1) {
                changuito[index].cambiarCantidad(`restar`);
                cantidadProducto.innerHTML = `Cantidad agregada: ${changuito[index].cantidad} `
                localStorage.setItem(`changuitoParaStorage`, JSON.stringify(changuito));
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
                    changuito[index].cambiarCantidad(`restar`);
                    localStorage.setItem(`changuitoParaStorage`, JSON.stringify(changuito));
                }
            }
            //Actualiza el total a pagar en el changuito
            agregarPrecioDelChanguito();
        }
    }

}

//Utilizado par verificar los datos del Storage y volvelos a poner
const verificarDatosDeStorage = () => {
    if (!!changuitoStorage && changuitoStorage.length > 0) {
        for (const producto of changuitoStorage) {
            for (let i = 1; i <= producto.cantidad; i++) {
                insertarProductosAChanguito(producto);
            }
        }
    }
}

pagarTodoElChanguito.addEventListener(`click`, () => {
    Swal.fire({
        title: 'Deseas Realizar la compra?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, pagar todo',
        cancelButtonText: 'Todavia no'
    }).then((result) => {
        if (result.isConfirmed) {
            if (billeteraVirtual >= totalChanguito()) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                let timerInterval
                Swal.fire({
                    title: '¡Gracias Por Confiar en Nosotros!',
                    html: 'Pagando...',
                    timer: 2500,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                        billeteraVirtual -= totalChanguito()
                        localStorage.setItem(`billeteraVirtual`, billeteraVirtual);
                        localStorage.removeItem(`changuitoParaStorage`);
                        reiniciarPagina();
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Su dinero no alcanza para la compra',
                })
            }
        }
    })
})

agregarPrecioDelChanguito();
verificarDatosDeStorage();