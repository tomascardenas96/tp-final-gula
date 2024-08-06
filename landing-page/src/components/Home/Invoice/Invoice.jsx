import useGetShopsByActiveUser from "../../../hooks/useGetShopsByActiveUser";
import Error from "../../Common/Error/Error";
import Spinner from "../../Common/Spinner/Spinner";
import "./Invoice.css";

function Invoice({ invoices, invoicesLoading, invoicesError }) {
  const { getFormatedDate } = useGetShopsByActiveUser();

  const groupedInvoices = invoices.reduce((acc, invoice) => {
    if (!acc[invoice.invoiceNumber]) {
      acc[invoice.invoiceNumber] = [];
    }
    acc[invoice.invoiceNumber].push(invoice);
    return acc;
  }, {});

  return (
    <section className="invoice" onClick={(e) => e.stopPropagation()}>
      {invoicesLoading ? (
        <div className="invoices_loading">
          <Spinner />
          <h1>Cargando compras...</h1>
        </div>
      ) : invoicesError ? (
        <div className="invoices_error">
          <Error />
        </div>
      ) : Object.keys(groupedInvoices).length === 0 ? (
        <div className="invoice-empty">
          <p>No hay compras aún</p>
        </div>
      ) : (
        <div className="invoice-list">
          {Object.keys(groupedInvoices)
            .slice()
            .reverse()
            .map((invoiceNumber) => (
              <div key={invoiceNumber} className="invoice-group">
                <div className="invoice_container">
                  <p className="invoice-divider">{invoiceNumber}</p>
                  <div className="line"></div>
                  {groupedInvoices[invoiceNumber].map((invoice, index) => (
                    <div key={index} className="invoice-item">
                      <p>{getFormatedDate(invoice.emittedAt)}</p>
                      <p className="invoice-item_description">
                        {invoice.foodDescription}
                      </p>
                      <p>{invoice.foodAmount}u</p>
                      <p>${invoice.foodUnitaryPrice * invoice.foodAmount}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

export default Invoice;
