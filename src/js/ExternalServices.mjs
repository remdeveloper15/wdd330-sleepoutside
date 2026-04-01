// 1. Importamos la URL desde el archivo .env
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: "serviceError", message: jsonResponse};
  }
}

export default class ExternalServices {
  // Ahora recibe la categoría como parámetro
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
   
    return data.Result; 
  }

  // Ahora consulta directamente el endpoint del producto por su ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`${baseURL}checkout`, options);
    
    if (response.ok) {
      return await response.json();
    }
    else {
      throw { 
        name: "servicesError", 
        message: await response.json()
      };
    }
  }
}