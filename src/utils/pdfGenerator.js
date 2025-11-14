import PDFDocument from "pdfkit";

export default {
  generateSalePDF: (sale) => {
    const doc = new PDFDocument();
    doc.fontSize(18).text("Comprobante de Venta", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Venta ID: ${sale.id}`);
    doc.text(`Fecha: ${sale.date}`);
    doc.text(`Total: ${sale.total}`);
    doc.moveDown();
    doc.text("Items:");
    (sale.saleItems || []).forEach(si => {
      doc.text(`- ${si.product ? si.product.description : si.productId} | Cant: ${si.quantity} | Precio: ${si.price}`);
    });
    doc.end();
    return doc;
  }
};
