// ProductDetails.mjs
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // 1. Usar el dataSource para obtener los detalles del producto actual
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Renderizar el HTML
    this.renderProductDetails("main"); // Le pasamos el contenedor principal
    
    // 3. Agregar el listener al botón "Añadir al carrito" una vez que el HTML existe
    document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    // Aquí usamos la función de utils.mjs para guardar en el carrito
    // (Asegúrate de tener setLocalStorage definido en utils.mjs)
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    
    element.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img class="divider" src="${this.product.Image}" alt="${this.product.Name}" />
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}