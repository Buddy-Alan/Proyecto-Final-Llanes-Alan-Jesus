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