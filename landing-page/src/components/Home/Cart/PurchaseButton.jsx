import React from "react";
import { useEffect } from "react";
import * as MercadoPago from "@mercadopago/sdk-react";

const PurchaseButton = ({ preferenceId }) => {
  useEffect(() => {
    // Inicializa Mercado Pago una vez
    const mp = new MercadoPago("APP_USR-1d4c3f14-7f98-4c32-a2c3-b9a81fed4360");
    const bricksBuilder = mp.bricks();

    bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
      customization: {
        texts: {
          valueProp: "smart_option",
        },
      },
    });
  }, [preferenceId]);

  return (
    <button className="custom-button" id="wallet_container">
      Pagar con Mercado Pago
    </button>
  );
};

export default PurchaseButton;
