// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Función de plantilla para cada producto
function productCardTemplate(product) {
  // Agregamos un "?" después de Images para que si no existe, no rompa la página
  const imagePath = product.Images?.PrimaryMedium || "https://placehold.co/300x300?text=No+Image";

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${imagePath}" alt="Image of ${product.Name}">
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
    const list = await this.dataSource.getData(this.category);
    
    // Renderizamos la lista usando nuestro método refactorizado
    this.renderList(list);
  }

  // Método refactorizado que utiliza la función de utilidad externa
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}