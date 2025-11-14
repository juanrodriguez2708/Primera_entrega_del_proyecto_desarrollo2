# Vista de Despliegue

Componentes físicos:
- Servidor de aplicación: node.js + express (puede correr en local o en un contenedor Docker)
- Base de datos: SQLite (archivo local), para producción se recomienda Postgres o MySQL
- Entorno de desarrollo: VS Code con extensiones (ESLint, Docker, Thunder Client)
- Despliegue simple: ejecutar `npm start` o usar Docker para contenerizar

Ejemplo (despliegue local):
1. npm install
2. npm run dev
3. Abrir http://localhost:3000
