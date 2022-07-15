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

simularTraerDatosDeBD = async() => {
    try {
        const respuest = await fetch(`./productos.json`);
        const respuestasProductos = await respuest.json();
        const productosDeJson = respuestasProductos;
        let productoNuevo
        for (productosAJs of productosDeJson.sinAlchol) {
            const { tipo, id, nombre, precio, imagen } = productosAJs
            productoNuevo = [new Producto({ tipo, id, nombre, precio, imagen })];
            productosSinAlcohol = productosSinAlcohol.concat(productoNuevo)
        };
        for (productosAJs of productosDeJson.conAlchol) {
            const { tipo, id, nombre, precio, imagen } = productosAJs
            productoNuevo = [new Producto({ tipo, id, nombre, precio, imagen })];
            productosConAlcohol = productosConAlcohol.concat(productoNuevo);

        };
        misProductos = productosConAlcohol.concat(productosSinAlcohol);
    } catch {
        console.log(`Error en la funcion SimularTRaerDatosDeBD`)
    } finally {

    }
}

sumarIva = () => {
    for (const productos of misProductos) {
        productos.sumaIva();
    }
}