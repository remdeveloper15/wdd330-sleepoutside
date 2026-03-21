// main.js
import ProductData from "./ProductData.mjs"; // Asegúrate de que la ruta sea correcta
import ProductList from "./ProductList.mjs";

// 1. Crear instancia de la fuente de datos (apuntando a la categoría correcta)
const dataSource = new ProductData("tents");

// 2. Seleccionar el elemento del DOM donde se inyectará la lista (asegúrate de que este selector exista en tu index.html)
const listElement = document.querySelector(".product-list");

// 3. Crear instancia de ProductList
const productList = new ProductList("tents", dataSource, listElement);

// 4. Inicializar
productList.init();