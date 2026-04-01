// CheckoutProcess.mjs
import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";

const services = new ExternalServices();

// Function to help converting the FormData in JSON
function formDataToJSON(formElement) {

    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value; 
    });
    
    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1 
        };
    });
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(
            this.outputSelector + " #subtotal"
        );

        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );

        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

        summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;

        this.shipping = 10 + (this.list.length - 1) * 2;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals();
    }    
    
    displayOrderTotals() {
    const shippingElement = document.querySelector(this.outputSelector + " #shipping");
    const taxElement = document.querySelector(this.outputSelector + " #tax");
    const orderTotalElement = document.querySelector(this.outputSelector + " #orderTotal");

    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    taxElement.innerText = `$${this.tax.toFixed(2)}`;
    orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

async checkout(form) {
        const jsonStr = formDataToJSON(form);

        jsonStr.orderDate = new Date().toISOString();
        jsonStr.orderTotal = this.orderTotal.toFixed(2);
        jsonStr.tax = this.tax.toFixed(2);
        jsonStr.shipping = this.shipping;
        jsonStr.items = packageItems(this.list);

        try {
            // 1. Enviamos jsonStr al servidor
            const res = await services.checkout(jsonStr);
            console.log("Order succesful: ", res);
            
            // 2. Si lo anterior funcionó, vaciamos el carrito
            localStorage.removeItem("so-cart");

            // 3. Redirigimos a la página de éxito
            window.location.href = "success.html";
            
        } catch (err) {

            removeAllAlerts();
            // Si algo falla en el proceso, atrapamos el error aquí
            console.error("Error in checkout", err);

            for (let key in err.message) {
                alertMessage(err.message[key]);
            }
        }
    }
}