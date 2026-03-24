// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Función de plantilla para cada producto
function productCardTemplate(product) {
  // Asegúrate de que las propiedades (Id, Image, Brand.Name, etc.) coincidan exactamente con tu archivo JSON
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Obtenemos los datos (esto asume que getData() devuelve una promesa)
    const list = await this.dataSource.getData();
    
    // Renderizamos la lista usando nuestro método refactorizado
    this.renderList(list);
  }

  // Método refactorizado que utiliza la función de utilidad externa
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}