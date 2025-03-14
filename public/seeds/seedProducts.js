// import fs from "fs";
// import { MongoClient } from "mongodb";

// // Función para crear la colección 'products'
// async function createCollection() {
//   try {
//     // Conexión a MongoDB
//     const client = await MongoClient.connect("mongodb://localhost:27017");
//     const db = client.db("ecommerce"); // Nombre de la base de datos
//     console.log("Conectado a MongoDB");

//     // Crear la colección explícitamente (si no existe)
//     const collection = await db.createCollection("products");
//     console.log('Colección "products" creada');

//     // Cierra la conexión
//     await client.close(); // Asegúrate de usar await aquí
//   } catch (error) {
//     console.error("Error al crear la colección:", error);
//   }
// }

// // Función para insertar los productos desde el archivo JSON
// async function insertProducts() {
//   try {
//     // Conexión a MongoDB
//     const client = await MongoClient.connect("mongodb://localhost:27017");
//     const db = client.db("ecommerce"); // Nombre de la base de datos
//     console.log("Conectado a MongoDB");

//     const collection = db.collection("products"); // Nombre de la colección

//     // Leer el archivo JSON con los datos de productos
//     const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

//     // Inserta los productos en la colección
//     const insertResult = await collection.insertMany(products);
//     console.log(`${insertResult.insertedCount} productos insertados.`);

//     // Cierra la conexión
//     await client.close(); // Asegúrate de usar await aquí
//   } catch (error) {
//     console.error("Error al insertar los productos:", error);
//   }
// }

// // Ejecutar las funciones
// async function run() {
//  /*  await createCollection(); */ // Crear la colección (si no existe)
//   await insertProducts(); // Insertar los productos en la colección
// }

// run();

////////////////////////////////////////////////////////////////////////////////////////////////

/* // seedProducts.js
import { faker } from '@faker-js/faker';
import { MongoClient } from 'mongodb';

async function updatePhotos() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('ecommerce'); // cambia esto si tu base se llama distinto
  const collection = db.collection('products');

  const newPhotoUrl = faker.image.url(); // genera una sola URL (igual para todos)

  const updateResult = await collection.updateMany({}, {
    $set: { photo: newPhotoUrl }
  });

  console.log(`${updateResult.modifiedCount} documentos actualizados con nueva URL de imagen.`);
  await client.close();
}

updatePhotos(); */

////////////////////////////////////////////////////////////////////////////////////////////////

/* import { faker } from "@faker-js/faker";
import fs from "fs";

const generateProduct = (category) => {
  return {
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 4500, dec: 2 })),
    stock: faker.number.int({ min: 0, max: 500 }),
    photo: faker.image.url(),
    category: category,
    availability: faker.datatype.boolean(),
  };
};

// Generar productos para cada categoría
const categories = ["ropa", "cellphones", "computers", "accessories", "none"];
let products = [];

categories.forEach((category) => {
  for (let i = 0; i < 10; i++) {
    products.push(generateProduct(category));
  }
});

// Guardar los productos en un archivo JSON
fs.writeFileSync("products.json", JSON.stringify(products, null, 2), "utf-8");
console.log("Archivo products.json creado con éxito."); */
