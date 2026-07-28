# Arquitectura de Certi-Solutions

## Descripción

Certi-Solutions es un agente inteligente orientado a responder preguntas en lenguaje natural utilizando documentación sobre procesos de certificación de productos.

La solución utiliza una arquitectura modular basada en MVC y separación de responsabilidades.

## Arquitectura general

```text
Usuario
   |
   v
Interfaz web
HTML + CSS + JavaScript
   |
   v
Rutas Express
   |
   v
Controladores
   |
   v
Servicios
   |
   +--------------------------+
   |                          |
   v                          v
Procesamiento documental   Proveedor de IA
PDF o CSV                  API o modelo gratuito
   |
   v
Base de conocimiento
```

## Capas de la aplicación

### Vista

Ubicación:

```text
public/
```

Responsabilidades:

- Presentar la interfaz del agente.
- Recibir preguntas del usuario.
- Mostrar respuestas y mensajes de estado.
- Consumir los endpoints del backend.

### Rutas

Ubicación:

```text
src/routes/
```

Responsabilidades:

- Definir los endpoints de la aplicación.
- Asociar cada endpoint con su controlador.
- Mantener separada la navegación de la lógica de negocio.

### Controladores

Ubicación:

```text
src/controllers/
```

Responsabilidades:

- Recibir solicitudes HTTP.
- Validar los datos principales de entrada.
- Invocar los servicios correspondientes.
- Devolver respuestas JSON controladas.

### Servicios

Ubicación:

```text
src/services/
```

Responsabilidades:

- Procesar documentos PDF o CSV.
- Buscar información relevante.
- Construir el contexto para el agente.
- Integrarse con el proveedor de inteligencia artificial.
- Aplicar reglas de negocio.

### Modelos

Ubicación:

```text
src/models/
```

Responsabilidades:

- Representar documentos y fragmentos de conocimiento.
- Gestionar estructuras de datos.
- Incorporar acceso a persistencia cuando sea necesario.

### Configuración

Ubicación:

```text
src/config/
```

Responsabilidades:

- Leer variables de entorno.
- Validar configuraciones.
- Separar desarrollo y producción.
- Evitar credenciales incrustadas en el código.

## Flujo de una consulta

1. El usuario escribe una pregunta.
2. El frontend envía la consulta al backend.
3. La ruta dirige la solicitud al controlador.
4. El controlador valida la pregunta.
5. El servicio busca información en el documento.
6. El agente genera una respuesta basada en el contenido encontrado.
7. El backend devuelve la respuesta.
8. La interfaz muestra el resultado al usuario.

## Seguridad

- Las credenciales se administran mediante variables de entorno.
- El archivo `.env` no forma parte del repositorio.
- El repositorio solo incluye `.env.example`.
- No se publican claves de API, contraseñas ni conexiones reales.
- El servidor local escucha únicamente en `127.0.0.1`.
- Los errores internos no exponen información sensible.
- Los documentos utilizados deben ser públicos, ficticios o anonimizados.

## Despliegue

En producción, la aplicación será desplegada en Oracle Cloud Infrastructure.

Las variables de producción se configurarán directamente en la instancia OCI y no serán almacenadas en GitHub.
