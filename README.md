# Documentación del Proyecto Miniblog Front

Este documento describe en detalle el proyecto **miniblog-front**, un front-end para un mini blog que utiliza React, Redux y TypeScript, entre otras tecnologías. Se explica cómo inicializar el proyecto, la estructura de carpetas y archivos, las tecnologías implementadas, el uso actual de Redux y una propuesta de implementación futura para optimizar el rendimiento con `useMemo` y `useCallback`.

---

## 1. Inicialización del Proyecto

Para iniciar el proyecto, sigue estos pasos:

1. **Instalar dependencias**  
   En la raíz del proyecto, ejecuta:
   ```bash
   npm install
   ```
   Esto instalará todas las dependencias definidas en `package.json`.

2. **Iniciar el servidor de desarrollo**  
   Para levantar el entorno de desarrollo, ejecuta:
   ```bash
   npm start
   ```
   Esto compilará la aplicación y la ejecutará en un servidor local, normalmente en `http://localhost:3000`.

3. **Compilar para producción**  
   Si necesitas generar la versión de producción, ejecuta:
   ```bash
   npm run build
   ```

---

## 2. Estructura del Proyecto

La siguiente es la estructura de carpetas y archivos, junto con una breve descripción de su contenido y función:


### Carpeta `src`

- **main.tsx**  
  Punto de entrada de la aplicación. Aquí se envuelve el componente principal con el `Provider` de `react-redux` para hacer accesible el store en toda la aplicación.

- **components/common/ProtectedRoute.tsx**  
  Componente de ruta protegida que utiliza `useSelector` de Redux para validar el acceso a determinadas rutas en función del estado de autenticación.

- **hooks/**  
  - **storeHooks.ts**: Define hooks personalizados (por ejemplo, un selector tipado) para interactuar con el store de Redux.
  - **useAppDispatch.ts**: Hook personalizado para obtener el dispatch tipado desde Redux.

- **layouts/**  
  - **MainLayout.tsx**: Define la estructura de diseño principal de la aplicación, integrando elementos comunes como cabecera, pie de página y navegación, y usando Redux para manejar estados globales.

- **pages/**  
  - **Posts.tsx**: Página que muestra los posts del blog. Utiliza `useSelector` para acceder al estado de posts.
  - **Register.tsx**: Página de registro de usuarios. Se utiliza `useDispatch` para enviar acciones relacionadas con el registro y autenticación.

- **store/**  
  - **store.tsx**: Configura el store global utilizando `configureStore` de Redux Toolkit.
  - **slices/**  
    - **authSlice.ts**: Define el slice de autenticación, gestionando el estado y las acciones relacionadas con el usuario.
    - **postSlice.ts**: Define el slice para la gestión de posts, incluyendo acciones asíncronas (usando `createAsyncThunk`) para la obtención y manipulación de posts.

---

## 3. Tecnologías Usadas

El proyecto utiliza las siguientes tecnologías y herramientas:

- **React**
- **Redux & Redux Toolkit**
- **TypeScript**
- **Tailwind CSS**
- **PostCSS**
- **ESLint**

---

## 4. Uso de Redux

- **Configuración del Store**  
  Se configura en `src/store/store.tsx` utilizando `configureStore` de Redux Toolkit.

- **Slices**  
  - `authSlice.ts`: Gestiona el estado del usuario.
  - `postSlice.ts`: Maneja el estado relacionado con los posts.

- **Acceso al Estado**  
  Se utilizan los hooks `useSelector` y `useDispatch` en componentes como `ProtectedRoute.tsx`, `Posts.tsx` y `Register.tsx`.


---

## Conclusiones

- **Redux** está ampliamente integrado.
- **useMemo y useCallback** pueden implementarse para optimizar rendimiento.
- La estructura es modular y escalable, facilitando mantenimiento y futuras mejoras.

