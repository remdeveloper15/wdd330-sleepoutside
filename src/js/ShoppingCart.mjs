import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    // CAMBIO: Ahora usamos item.Images.PrimaryMedium (o PrimarySmall)
    // También añadimos un "?" por seguridad
    const imagePath = item.Images?.PrimaryMedium || item.Images?.PrimarySmall || "";

    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
        <img
            src="${imagePath}" 
            alt="${item.Name}"
        />
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : ""}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice || item.ListPrice}</p>
    </li>`;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const parentElement = document.querySelector(this.parentSelector);

        if (!cartItems || cartItems.length === 0) {
            parentElement.innerHTML = "<li><p>Your cart is empty. Go add some tents!</p><li>";
            return;
        }

        renderListWithTemplate(cartItemTemplate, parentElement, cartItems, "afterbegin", true);
    }
}
