import { promises as fs } from "fs"

class ProductManager {
    constructor(){
        this.products=[];
        this.path="./productos.json"
    }

    addProduct = async (product) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === product.id)
    
        if (producto) {
            console.log("producto existente")
        } else {
            prods.push(product)
            await fs.writeFile(this.path, JSON.stringify(prods))
        }
    }

    getProducts = async () => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"))
        console.log(prods)
    }

    getProductsById = async (id) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)
        if (producto)
            console.log(producto)
        else
            console.log("producto no encontrado")
    }

    updateProduct = async (id, product) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = prods.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price = product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].code = product.code
            prods[indice].stock = product.stock
            await fs.writeFile(this.path, JSON.stringify(prods))
        } else {
            console.log("Producto no encontrado")
        }
    
    }

    deleteProduct = async(id)=>{
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)
    
        if (producto) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)))
        } else {
            console.log("Producto no encontrado")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementariId()
    }
    static incrementariId() {
        if (this.idIncremnt) {
            this.idIncremnt++
        } else {
            this.idIncremnt = 1
        }
        return this.idIncremnt
    }
}

//Productos
const product1 = new Product("Manzana", "Roja", 150, "MANR", 50, [])
const product2 = new Product("Banana", "Ecuador", 100, "BANE", 110, [])
const product3 = new Product("Kiwi", "Peludo", 300, "KIWP", 25, [])
const product4 = new Product("Manzana", "Roja", 150, "MANR", 50, [])
const productoNuevo = new Product("pera","amarilla",1000,"PER1", 14, [])

//Testeo
const productManager = new ProductManager()

//productManager.addProduct(product2) //Si intento agregar todos juntos se rompe. Si se agrega uno por uno lo hace correctamente.

//productManager.getProducts()

//productManager.getProductsById(2)

//productManager.updateProduct(1, {title: "lechuga"})

//productManager.deleteProduct(2)