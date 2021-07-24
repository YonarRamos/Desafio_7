import express from 'express'
import path from 'path'
import fs from 'fs/promises'

const puerto = 8080
const app = express()
const server = app.listen(puerto, () =>
  console.log('Server on port:', puerto)
)

server.on('error', (err) => {
  console.log('ERROR =>', err)
})

let v1 = 0
let v2 = 0

app.get('/items', async (request, response) => {
  v1 += 1
  const pathProductos = path.resolve(__dirname, '../productos.txt');
  await fs.readFile(pathProductos)
  .then((productos)=>{
    productos = JSON.parse(productos)
    response.json({
      items:productos,
      cantidad: productos.length
    })
  })
})

app.get('/item-random', async (request, response) => {
  v2 += 1
  const pathProductos = path.resolve(__dirname, '../productos.txt')
  await fs.readFile(pathProductos)
  .then((productos)=>{
    productos = JSON.parse(productos)
    let index = Math.floor(Math.random() * (productos.length - 0)) + 0;
    response.json({
      item:productos[index]
    })
  })
})

app.get('/visitas', async (request, response) => {
    response.json({
      visitas:{
        ruta1: v1,
        ruta2: v2
      }
    })
})