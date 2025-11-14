# Vista Funcional

Casos de uso principales:
- Registrar Cliente -> POST /clients
- Consultar Cliente -> GET /clients, GET /clients/:id
- Actualizar Cliente -> PUT /clients/:id
- Registrar Producto -> POST /products
- Actualizar Producto -> PUT /products/:id
- Consultar Productos -> GET /products
- Registrar Venta -> POST /sales (vincula cliente + productos, calcula total, actualiza stock)
- Generar comprobante PDF -> GET /sales/:id/pdf
- Autenticación -> POST /auth/login, POST /auth/register
