import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  if (!cartItems || cartItems.length === 0) {
    // Si el carrito está vacío, mostramos un mensaje amigable
    document.querySelector(".product-list").innerHTML = "<li><p>Your cart is empty. Go add some tents!</p></li>";
    
    // Usamos 'return' para detener la ejecución de la función aquí. 
    // Así evitamos que llegue al .map() y cause el error.
    return; 
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
