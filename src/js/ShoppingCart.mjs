import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const imagePath = item.Images?.PrimaryMedium || item.Images?.PrimarySmall || "";

    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
        <img src="${imagePath}" alt="${item.Name}" />
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

        // Si el carrito está vacío
        if (!cartItems || cartItems.length === 0) {
            parentElement.innerHTML = "<li><p>Your cart is empty. Go add some tents!</p><li>";
            // Asegurarse de ocultar el total si se vacía el carrito
            document.querySelector(".cart-footer").classList.add("hide");
            return;
        }

        // Renderizamos la lista
        renderListWithTemplate(cartItemTemplate, parentElement, cartItems, "afterbegin", true);

        // --- NUEVA LÓGICA PARA EL TOTAL ---
        this.calculateTotal(cartItems);
    }
    
    calculateTotal(items) {
        const total = items.reduce((sum, item) => sum + (item.FinalPrice || item.ListPrice), 0);
        
        const cartFooter = document.querySelector(".cart-footer");
        const totalElement = document.querySelector(".cart-total");

        // Verificamos que AMBOS existan antes de usarlos
        if (cartFooter && totalElement) {
            totalElement.innerText = `Total: $${total.toFixed(2)}`;
            cartFooter.classList.remove("hide");
        } else {
            console.warn("No se encontró el footer del carrito en el HTML.");
        }
}
}