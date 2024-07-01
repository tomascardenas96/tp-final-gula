import React, { useEffect, useState } from "react";

function useGetPreferencesMercadoPago() {
  const token = localStorage.getItem("accessToken");
  const [preferenceId, setPreferenceId] = useState(null);
  const [preferenceError, setPreferenceError] = useState(null);

  useEffect(() => {
    async function getPreference() {
      try {
        const response = await fetch(
          "http://localhost:3070/payments/create-preference",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setPreferenceId(data.id);
      } catch (err) {
        setPreferenceError(err);
      }
    }

    getPreference();
  }, [token]);

  return { preferenceId };
}

export default useGetPreferencesMercadoPago;
