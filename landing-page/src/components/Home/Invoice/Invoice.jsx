import useGetInvoices from "../../../hooks/useGetInvoices";
import useGetShopsByActiveUser from "../../../hooks/useGetShopsByActiveUser";
import "./Invoice.css";

function Invoice() {
  const { invoices, invoicesLoading, invoicesError } = useGetInvoices();
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
      {Object.keys(groupedInvoices).length === 0 ? (
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
