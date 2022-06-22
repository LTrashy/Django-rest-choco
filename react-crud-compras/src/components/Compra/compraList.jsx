import React, { useEffect, useState } from "react";
import * as ComprasServer from "./comprasServer";

//Components :
import CompraItem from "./compraItem";

const CompraList = () => {
  const [compras, setCompras] = useState([]);

  const listCompras = async () => {
    try {
      const res = await ComprasServer.listCompras();
      const data = await res.json();
      setCompras(data.compras);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCompras();
  }, []);
  console.log(compras);
  return (
    <div>
      <div className="row">
        {compras ? (
          compras.map((compra) => (
            <CompraItem
              key={compra.id}
              compra={compra}
              listCompra={listCompras}
            />
          ))
        ) : (
          <p>No hay Compañias registradas</p>
        )}
      </div>
    </div>
  );
};

export default CompraList;
