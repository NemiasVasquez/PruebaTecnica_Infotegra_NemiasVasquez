# Prueba Técnica Infotegra - Nemias Vasquez

Este es un proyecto desarrollado con **Laravel**, **React** y **Vite**, utilizando **AdminLTE** para la interfaz de usuario y **DataTables** para la gestión de datos.

## 📌 Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (Versión recomendada: 18+)
- **NPM** (Administrador de paquetes)
- **PHP 8.2**
- **Composer**
- **Laravel 11**

## 🚀 Instalación y configuración
Sigue estos pasos para poner en marcha el proyecto:

### 2️⃣ Instalar dependencias de Laravel
```sh
composer install
```

### 3️⃣ Instalar dependencias de Node.js
```sh
npm install
```

### 4️⃣ Configurar el archivo de entorno
Copia el archivo de configuración de entorno y actualiza las credenciales según sea necesario:
```sh
cp .env.example .env
php artisan key:generate
```

### 5️⃣ Migrar la base de datos
```sh
php artisan migrate
```

### 6️⃣ Iniciar el servidor de Laravel
```sh
php artisan serve
```

### 7️⃣ Compilar los assets con Vite
Para entorno de desarrollo:
```sh
npm run dev
```
Para entorno de producción:
```sh
npm run build
```

### 8️⃣ Acceder al proyecto
Abre en el navegador:
```sh
http://127.0.0.1:8000
```

---

## 📜 Estructura del Proyecto
El proyecto sigue la siguiente estructura tecnológica:

- **Backend:** Laravel 11
- **Frontend:** React + Vite
- **UI:** AdminLTE + Bootstrap
- **DataTables:** Integración con botones y exportación

---

## 👨‍💻 Sobre el autor
**Nemias Vásquez**

📞 Celular: +51 955 651 442  
🔗 LinkedIn: [Nemias Vásquez](https://www.linkedin.com/in/nemias-david-vasquez-suarez-bba9431a6/)  
🚀 Desarrollador Full Stack apasionado por la creación de aplicaciones web modernas y escalables.
