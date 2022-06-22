import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as ComprasServer from "./comprasServer";

const CompraForm = () => {
  const history = useNavigate();
  const params = useParams();

  const initialState = {
    id: 0,
    initial_amount: "",
    cost_chocolate_bar: "",
    wrappers_free: "",
  };
  const [compra, setCompra] = useState(initialState);

  const handleInputChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await ComprasServer.registerCompra(compra);
        const data = await res.json();

        if (data.message === "Success") {
          setCompra(initialState);
        }
      } else {
        await ComprasServer.updateCompra(params.id, compra);
      }
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCompra = async (compraId) => {
    try {
      const res = await ComprasServer.getCompra(compraId);
      const data = await res.json();
      const {
        initial_amount,
        cost_chocolate_bar,
        wrappers_free,
        chocolate_eaten,
      } = data.compra;
      setCompra({
        initial_amount,
        cost_chocolate_bar,
        wrappers_free,
        chocolate_eaten,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCompra(params.id);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center ">Compra</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            name="initial_amount"
            type="number"
            className="form-control"
            placeholder="Dinero inicial"
            value={compra.initial_amount}
            onChange={handleInputChange}
          />
          <label>Dinero inicial</label>
        </div>
        <div className="form-floating mb-3">
          <input
            name="cost_chocolate_bar"
            type="number"
            className="form-control"
            placeholder="Costo barra"
            value={compra.cost_chocolate_bar}
            onChange={handleInputChange}
          />
          <label>Costo barra de chocolate</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            name="wrappers_free"
            placeholder="envoltorios"
            value={compra.wrappers_free}
            onChange={handleInputChange}
          />
          <label>Envolturas para cambio</label>
        </div>
        {params.id ? (
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              name="chocolate_eaten"
              placeholder="Chocolates comidos"
              value={compra.chocolate_eaten}
              onChange={handleInputChange}
              readOnly
            />
            <label>Chocolates comidos</label>
          </div>
        ) : (
          <></>
        )}

        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompraForm;
