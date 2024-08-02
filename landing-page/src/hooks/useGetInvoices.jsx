import { useEffect, useState } from "react";

function useGetInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [invoicesError, setInvoicesError] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function getInvoices() {
      setInvoicesLoading(true);
      try {
        const response = await fetch("http://localhost:3070/invoice", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error getting invoices");
        }

        const data = await response.json();

        setInvoices(data);
      } catch (error) {
        console.error(error);
        setInvoicesError(true);
      } finally {
        setInvoicesLoading(false);
      }
    }

    getInvoices();
  }, []);

  function handleInvoiceModal() {
    setIsInvoiceModalOpen(!isInvoiceModalOpen);
  }

  return {
    invoices,
    invoicesLoading,
    invoicesError,
    isInvoiceModalOpen,
    handleInvoiceModal,
  };
}

export default useGetInvoices;
