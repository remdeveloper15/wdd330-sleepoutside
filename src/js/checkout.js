import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    
    const myForm = document.forms[0];
    const check_status = myForm.checkValidity();

    // Cambiamos checkValidity por reportValidity aquí:
    myForm.reportValidity();

    if(check_status) {
        myCheckout.checkout(myForm);
    }
});

loadHeaderFooter();