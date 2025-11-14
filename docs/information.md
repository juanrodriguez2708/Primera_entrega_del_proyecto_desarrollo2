# Vista de Información (ERD - textual)

Entidades principales:
- Cliente (id, name, contact, notes)
- Producto (id, code, description, price, stock, category)
- Venta (id, date, total, clientId)
- SaleItem (id, saleId, productId, quantity, price)
- Usuario (id, username, passwordHash, role)

Relaciones:
- Cliente 1 - N Venta
- Venta 1 - N SaleItem
- Producto 1 - N SaleItem
