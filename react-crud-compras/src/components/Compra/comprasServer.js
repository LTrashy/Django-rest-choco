const API_URL = "http://localhost:8000/api/compras/";
//const API_URL = "https://companies-test.herokuapp.com/api/companies/";

export const listCompras = async () => {
  return await fetch(API_URL);
};
export const getCompra = async (compraId) => {
  return await fetch(`${API_URL}${compraId}`);
};

export const registerCompra = async (newCompra) => {
  return await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initial_amount: parseInt(newCompra.initial_amount),
      cost_chocolate_bar: parseInt(newCompra.cost_chocolate_bar),
      wrappers_free: parseInt(newCompra.wrappers_free),
    }),
  });
};

export const updateCompra = async (compraId, updatedCompra) => {
  return await fetch(`${API_URL}${compraId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initial_amount: parseInt(updatedCompra.initial_amount),
      cost_chocolate_bar: parseInt(updatedCompra.cost_chocolate_bar),
      wrappers_free: parseInt(updatedCompra.wrappers_free),
    }),
  });
};

export const DeleteCompra = async (compraId) => {
  return await fetch(`${API_URL}${compraId}`, {
    method: "DELETE",
  });
};
