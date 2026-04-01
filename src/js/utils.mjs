// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  // Si 'clear' es verdadero, vaciamos el contenido actual del elemento
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  // Mapeamos la lista de datos usando la función de plantilla proporcionada
  const htmlStrings = list.map(templateFn);
  
  // Insertamos las cadenas HTML en el DOM en la posición indicada
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// Función para crear la alerta
export function alertMessage(message, scroll = true) {
  // Creamos el div que contendrá la alerta
  const alert = document.createElement("div");
  alert.classList.add("alert"); // Le damos una clase para el CSS
  
  // Ponemos el mensaje y un botón de "X" para cerrarla
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // Agregamos un evento para que si hacen clic en la 'X', se cierre
  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });

  // Lo insertamos al inicio del <main>
  const main = document.querySelector("main");
  main.prepend(alert);

  // Si scroll es true, llevamos al usuario arriba de la página para que vea el error
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// Función extra para limpiar alertas viejas
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}