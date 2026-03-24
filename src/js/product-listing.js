import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category'); // Obtiene "tents" de la URL
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');

const myList = new ProductList(category, dataSource, listElement);
myList.init();

if (category) {
  // 1. Buscamos el elemento del título (asegúrate de que tenga la clase .title o cámbiala por h2)
  const titleElement = document.querySelector('.title');
  
  // 2. Ponemos la primera letra en mayúscula para que se vea profesional (ej: "tents" -> "Tents")
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  // 3. Cambiamos el texto
  titleElement.innerHTML = `Top Products: ${categoryName}`;
}