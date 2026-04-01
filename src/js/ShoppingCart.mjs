// Importamos setLocalStorage también
import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const imagePath = item.Images?.PrimaryMedium || item.Images?.PrimarySmall || "";

    return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}" title="Remove from cart">❌</span>
    
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
            const cartFooter = document.querySelector(".cart-footer");
            if(cartFooter) cartFooter.classList.add("hide");
            return;
        }

        // Renderizamos la lista
        renderListWithTemplate(cartItemTemplate, parentElement, cartItems, "afterbegin", true);
        
        // Buscamos las "X" y les agregamos el evento
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const itemId = e.target.getAttribute("data-id");
                // Llamamos al método de nuestra clase para eliminar
                this.removeItem(itemId);
            });
        });

        // Calculamos el total
        this.calculateTotal(cartItems);
    }

    // --- NUEVO MÉTODO PARA ELIMINAR ---
    removeItem(id) {
        let cartItems = getLocalStorage(this.key);
        
        // Encontramos el índice del item a borrar
        const itemIndex = cartItems.findIndex((item) => item.Id === id);
        
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1); // Lo sacamos del arreglo
        }
        
        // Guardamos el nuevo arreglo en localStorage
        setLocalStorage(this.key, cartItems);
        
        // ¡Volvemos a renderizar para que la pantalla se actualice al instante!
        this.renderCartContents(); 
    }
    
    calculateTotal(items) {
        const total = items.reduce((sum, item) => sum + (item.FinalPrice || item.ListPrice), 0);
        
        const cartFooter = document.querySelector(".cart-footer");
        const totalElement = document.querySelector(".cart-total");

        if (cartFooter && totalElement) {
            totalElement.innerText = `Total: $${total.toFixed(2)}`;
            cartFooter.classList.remove("hide");
        } else {
            console.warn("No se encontró el footer del carrito en el HTML.");
        }
    }
}