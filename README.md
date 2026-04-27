# 🥩 Chuletones

[![Angular](https://img.shields.io/badge/Angular-19-red)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange)](https://firebase.google.com/)
[![SASS](https://img.shields.io/badge/SASS-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)

Aplicación web para la gestión de chuletones premium con autenticación de usuarios, carrito de compras.

## 📋 Descripción del Proyecto

Proyecto desarrollado para el módulo de **Angular** que consiste en una tienda online de chuletones de alta calidad. Los usuarios pueden registrarse, iniciar sesión, visualizar diferentes tipos de chuletones con sus características, añadirlos a un carrito y consultar restaurantes cercanos.

## ✨ Características

- 🔐 **Autenticación completa** (Registro/Login) con Firebase Auth
- 🛒 **Carrito de compras** con Signals y cálculo automático de totales
- 📱 **Diseño responsive** con temática vintage y paleta de colores cálidos
- 🖼️ **Galería de productos** con imágenes y modal de detalles
- 🚀 **Lazy loading** para optimizar el rendimiento
- 🛡️ **Guards de rutas** para proteger contenido privado
- 📊 **Formularios reactivos** con validación

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 19 | Framework principal |
| Firebase Auth | Latest | Autenticación de usuarios |
| Angular Signals | 19 | Estado reactivo |
| SASS | - | Estilos y diseño |
| TypeScript | 5+ | Tipado seguro |
| Angular Router | 19 | Navegación y lazy loading |

## 🚀 Instalación y Configuración

### Requisitos previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

### Pasos para ejecutar localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/mee96/ProjectModulo1FPO.git

# 2. Entrar al directorio
cd ProjectModulo1FPO

# 3. Instalar dependencias
npm install

# 4. Ejecutar la aplicación
ng serve -o
