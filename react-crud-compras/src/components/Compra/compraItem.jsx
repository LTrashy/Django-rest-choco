import React from "react";

import * as ComprasServer from "./comprasServer";
import { useNavigate } from "react-router-dom";

const CompraItem = ({ compra, listCompra }) => {
  console.log(compra);
  const navigate = useNavigate();
  const handleDelete = async (compraId) => {
    await ComprasServer.DeleteCompra(compraId);
    listCompra();
  };
  return (
    <div className="col-md-4 mb-4 border-primary">
      <div className="card card-body ">
        <h3 className="card-title text-center ">Compra numero {compra.id}</h3>
        <p className="card-text text-center ">
          Dinero inicial: <strong>{compra.initial_amount}</strong>
          <br></br>
          Costo barra de chocolate: <strong>{compra.cost_chocolate_bar}</strong>
          <br></br>
          Numero de envoltorios: <strong>{compra.wrappers_free}</strong>
          <br></br>
          <hr />
          Total dulces obtenidos: <strong>{compra.chocolate_eaten}</strong>
          <br></br>
        </p>

        <button
          onClick={() => navigate(`/updateCompra/${compra.id}`)}
          className="btn btn-primary"
        >
          Update
        </button>
        <button
          className="btn btn-danger my-2"
          onClick={() => compra.id && handleDelete(compra.id)}
        >
          Delete Compra
        </button>
      </div>
    </div>
  );
};

export default CompraItem;
