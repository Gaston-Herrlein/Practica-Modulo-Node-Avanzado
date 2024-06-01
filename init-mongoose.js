const readline = require("node:readline");
const connection = require("./lib/connect-mongose");
const { Article, User } = require("./models");

async function initArticle() {
  const deleted = await Article.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} articulos.`);

  // crear articulos iniciales
  const inserted = await Article.insertMany([
    {
      name: "Bicicleta",
      sale: true,
      price: 230.15,
      photo: "bicicleta.png",
      tag: ["lifestyle", "motor"],
    },
    {
      name: "Iphone 3GS",
      sale: false,
      price: 50.0,
      photo: "iphone-3gs.png",
      tag: ["lifestyle", "mobile"],
    },
    {
      name: "Laptop Asus TUF",
      sale: true,
      price: 600.99,
      photo: "asus-tuf.png",
      tag: ["lifestyle", "laptop"],
    },
    {
      name: "Guitarra",
      sale: false,
      price: 60.35,
      photo: "guitarra.png",
      tag: ["lifestyle", "musica"],
    },
  ]);
  console.log(`Creados ${inserted.length} articulos.`);
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // crear usuarios
  const inserted = await User.insertMany([
    {
      name: "Admin",
      email: "admin@example.com",
      password: await User.hashPassword("1234"),
    },
    {
      name: "User",
      email: "user@example.com",
      password: await User.hashPassword("1234"),
    },
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
      ifc.close();
      resolve(respuesta.toLowerCase() === "si");
    });
  });
}

const main = async () => {
  await new Promise((resolve) => {
    connection.once("open", resolve);
  });
  const borrar = await pregunta(
    "Estas seguro que quieres borrar el contenido de esta BD? (si/no)"
  );
  if (!borrar) {
    process.exit();
  }
  await initArticle();
  await initUsers();
  connection.close();
};

main().catch((err) => console.log("Hubo un error", err));
