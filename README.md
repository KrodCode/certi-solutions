
## Certi-Solutions

Certi-Solutions es un agente inteligente desarrollado para el **Challenge Alura Agente**, perteneciente al programa **ONE AI for Tech** de Alura Latam y Oracle Next Education.

La aplicación permite realizar preguntas en lenguaje natural sobre procesos académicos y ficticios de certificación de productos.

El agente utiliza un archivo CSV como base de conocimiento, recupera los fragmentos documentales más relevantes y genera respuestas contextualizadas mediante Google Gemini. Cuando el proveedor de inteligencia artificial no está disponible, el sistema utiliza una respuesta documental local como mecanismo de respaldo.

## Aplicación desplegada

La aplicación se encuentra desplegada públicamente en Vercel:

**URL pública:** [{{VERCEL_URL}}]({{VERCEL_URL}})

## Objetivo

Facilitar consultas relacionadas con:

- Inicio de solicitudes de certificación.
- Documentación requerida.
- Seguimiento de solicitudes.
- Evaluaciones técnicas.
- Ensayos de productos.
- No conformidades.
- Plazos del proceso.
- Resultados y cierre de solicitudes.

## Arquitectura

```text
Usuario
   |
   v
Frontend
HTML5 + CSS3 + JavaScript
   |
   v
API REST
Node.js + Express
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   +--------------------------------+
   |                                |
   v                                v
Búsqueda documental CSV       Google Gemini API
   |                                |
   +---------------+----------------+
                   |
                   v
          Respuesta fundamentada
                   |
                   v
     Fallback documental local
```

La solución utiliza una arquitectura modular inspirada en el patrón MVC y en la separación de responsabilidades.

### Componentes principales

- `public`: interfaz web desarrollada con HTML5, CSS3 y JavaScript.
- `src/routes`: definición de los endpoints de la API.
- `src/controllers`: validación y procesamiento de solicitudes HTTP.
- `src/services`: búsqueda documental e integración con inteligencia artificial.
- `src/models`: representación y validación de los registros del CSV.
- `src/middlewares`: controles de seguridad y limitación de solicitudes.
- `src/config`: lectura y validación de variables de entorno.
- `data/knowledge`: base de conocimiento documental.
- `scripts`: pruebas y validaciones automatizadas.
- `docs`: documentación técnica, arquitectura y seguridad.
- `src/Images`: capturas reales y evidencias visuales del proyecto.

## Tecnologías y herramientas

- Node.js.
- Express.
- JavaScript con ES Modules.
- HTML5.
- CSS3.
- CSV Parse.
- Google GenAI SDK.
- Google Gemini API.
- Helmet.
- Express Rate Limit.
- Git.
- GitHub.
- Vercel.
- Visual Studio Code.

## Base de conocimiento

El agente utiliza el siguiente archivo:

```text
data/knowledge/certification_knowledge.csv
```

El documento contiene registros ficticios organizados mediante los siguientes campos:

- Identificador.
- Categoría.
- Pregunta.
- Respuesta.
- Palabras clave.
- Fuente documental.

La base de conocimiento contiene información académica creada específicamente para este proyecto.

No incluye:

- Datos personales reales.
- Información confidencial.
- Credenciales.
- Claves API.
- Direcciones IP.
- Información de clientes.
- Documentación interna de empresas.
- Números de certificados reales.

## Funcionamiento del agente

El flujo de una consulta es el siguiente:

1. El usuario escribe una pregunta desde la interfaz web.
2. El frontend envía la pregunta al endpoint del agente.
3. El backend valida y normaliza el contenido recibido.
4. El servicio de búsqueda compara la consulta con la base de conocimiento.
5. Se recuperan los registros documentales más relevantes.
6. Los fragmentos encontrados se proporcionan como contexto autorizado al modelo de inteligencia artificial.
7. Google Gemini genera una respuesta basada exclusivamente en el contexto recuperado.
8. La aplicación muestra la respuesta, categoría, fuente y referencia documental.
9. Si Gemini no está disponible, se utiliza la mejor respuesta encontrada directamente en el CSV.

## Estructura del proyecto

```text
certi-solutions/
├── data/
│   └── knowledge/
│       ├── README.md
│       └── certification_knowledge.csv
├── docs/
│   ├── architecture.md
│   ├── knowledge-base.md
│   └── security.md
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── scripts/
│   ├── test-agent-endpoint.js
│   ├── test-ai-service.js
│   ├── test-knowledge-search.js
│   ├── test-security-controls.js
│   └── validate-knowledge.js
├── src/
│   ├── Images/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Instalación

### 1. Clonar el repositorio

Mediante SSH:

```bash
git clone git@github.com:KrodCode/certi-solutions.git
```

También puede utilizarse HTTPS:

```bash
git clone https://github.com/KrodCode/certi-solutions.git
```

Ingresar a la carpeta del proyecto:

```bash
cd certi-solutions
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo de variables de entorno

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Completar las variables privadas necesarias dentro de `.env`.

Ejemplo de configuración local:

```env
HOST=127.0.0.1
PORT=3000
NODE_ENV=development

AGENT_RATE_LIMIT_WINDOW_MS=300000
AGENT_RATE_LIMIT_MAX=20

AI_ENABLED=true
AI_PROVIDER=gemini
AI_MODEL=gemini-3.5-flash-lite
AI_TIMEOUT_MS=12000
AI_MAX_OUTPUT_TOKENS=400
GEMINI_API_KEY=REEMPLAZAR_CON_CLAVE_PRIVADA
```

La clave real debe configurarse exclusivamente dentro de `.env` o mediante las variables privadas de Vercel.

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

## Ejecución local

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

Abrir la aplicación localmente en:

```text
http://127.0.0.1:3000
```

## Pruebas

Ejecutar todas las validaciones:

```bash
npm test
```

También pueden ejecutarse individualmente:

```bash
npm run knowledge:validate
npm run knowledge:search
npm run test:agent
npm run test:security
npm run test:ai
npm run check
```

### Validaciones implementadas

- Lectura y procesamiento del CSV.
- Validación de campos obligatorios.
- Detección de identificadores duplicados.
- Pruebas del buscador documental.
- Pruebas del endpoint del agente.
- Validación de preguntas vacías o incorrectas.
- Pruebas de consultas sin coincidencias.
- Validación del modo de respuesta con inteligencia artificial.
- Validación del fallback documental.
- Control del tipo de contenido HTTP.
- Limitación de solicitudes.
- Encabezados de seguridad.
- Control de caché de la API.
- Verificación de sintaxis del servidor.

## Endpoints

### Verificación del servicio

```text
GET /api/health
```

### Estado de la base de conocimiento

```text
GET /api/knowledge/status
```

### Consulta al agente

```text
POST /api/agent/questions
```

Cuerpo esperado:

```json
{
  "question": "¿Qué documentos se deben presentar para solicitar una certificación?"
}
```

## Ejemplos de preguntas

- ¿Cómo se inicia una solicitud de certificación?
- ¿Qué documentos se deben presentar?
- ¿Qué ocurre si la documentación está incompleta?
- ¿Cómo puedo consultar el estado de una solicitud?
- ¿Qué significa que un ensayo sea conforme?
- ¿Qué significa que un ensayo sea no conforme?
- ¿Se puede repetir un ensayo no conforme?
- ¿Cómo se corrige una no conformidad documental?
- ¿Cuánto demora un proceso de certificación?
- ¿Cuándo se emite el resultado final?
- ¿Las respuestas del agente reemplazan una evaluación técnica?

## Ejemplo de respuesta

Pregunta:

```text
¿Qué documentos se deben presentar para solicitar una certificación?
```

Respuesta:

```text
Generalmente se debe presentar la identificación del solicitante,
la identificación del producto, la ficha técnica, el manual de uso
y los antecedentes técnicos disponibles.
```

La respuesta puede generarse mediante Google Gemini utilizando el contexto recuperado desde el CSV o mediante el mecanismo documental local de respaldo.

## Seguridad

Certi-Solutions aplica las siguientes medidas:

- Las claves API se almacenan exclusivamente en variables de entorno.
- El archivo `.env` no se incluye en GitHub.
- `.env.example` contiene únicamente valores ficticios.
- La integración con Gemini se realiza desde el backend.
- La clave de Gemini nunca se envía al navegador.
- El servidor local escucha únicamente en `127.0.0.1`.
- No se exponen puertos ni servicios del computador local.
- No se utilizan conexiones entrantes hacia bases de datos locales.
- Las respuestas se insertan en la interfaz mediante `textContent`.
- Se limita el tamaño de las solicitudes recibidas.
- Se aplican encabezados de seguridad mediante Helmet.
- Se deshabilita el almacenamiento en caché de respuestas de la API.
- El endpoint del agente utiliza limitación de solicitudes.
- La API rechaza solicitudes que no utilicen `application/json`.
- No se publican claves SSH, tokens, contraseñas ni cadenas de conexión.
- Las variables privadas de producción se administran directamente desde Vercel.

## Despliegue en Vercel

La aplicación fue desplegada mediante la integración directa entre Vercel y GitHub.

### Configuración utilizada

```text
Application Preset: Express
Root Directory: ./
Repositorio: KrodCode/certi-solutions
Rama: main
```

Las variables privadas de producción fueron configuradas directamente desde el panel de Vercel y no forman parte del repositorio público.

Variables principales configuradas:

```text
NODE_ENV
AI_ENABLED
AI_PROVIDER
AI_MODEL
AI_TIMEOUT_MS
AI_MAX_OUTPUT_TOKENS
GEMINI_API_KEY
AGENT_RATE_LIMIT_WINDOW_MS
AGENT_RATE_LIMIT_MAX
```

No se configuraron `HOST` ni `PORT`, ya que estos valores son administrados automáticamente por Vercel.

### URL pública

[{{VERCEL_URL}}]({{VERCEL_URL}})

## Evidencias del proyecto

Las capturas reales del funcionamiento de la aplicación se encuentran en:

```text
src/Images
```

### Vista principal de Certi-Solutions

![Vista principal de Certi-Solutions](src/Images/{{IMAGE_HOME}})

### Consulta respondida por el agente

![Consulta respondida por Certi-Solutions](src/Images/{{IMAGE_AGENT}})

### Aplicación desplegada públicamente en Vercel

![Evidencia del despliegue en Vercel](src/Images/{{IMAGE_DEPLOY}})

## Limitaciones

- La base de conocimiento contiene información ficticia y académica.
- La calidad de las respuestas depende del contenido recuperado desde el CSV.
- El nivel gratuito del proveedor de inteligencia artificial puede aplicar límites temporales.
- Cuando la API externa no está disponible, el agente utiliza una respuesta documental local.
- Las respuestas no representan decisiones regulatorias ni certificaciones oficiales.
- El despliegue se realizó en Vercel y no en Oracle Cloud Infrastructure.

## Alcance

Certi-Solutions es un proyecto académico.

Sus respuestas se basan en documentación ficticia y no reemplazan:

- Evaluaciones técnicas profesionales.
- Interpretaciones normativas.
- Resoluciones regulatorias.
- Certificaciones oficiales.
- Asesorías especializadas.

## Autor

**Sebastián Araya**

Challenge Alura Agente
Programa ONE AI for Tech
Alura Latam y Oracle Next Education