
## Certi-Solutions

Certi-Solutions es un agente inteligente desarrollado para el **Challenge Alura Agente**, perteneciente al programa **ONE AI for Tech** de Alura Latam y Oracle Next Education.

La aplicaciÃ³n permite realizar preguntas en lenguaje natural sobre procesos acadÃ©micos y ficticios de certificaciÃ³n de productos.

El agente utiliza un archivo CSV como base de conocimiento, recupera los fragmentos documentales mÃ¡s relevantes y genera respuestas contextualizadas mediante Google Gemini. Cuando el proveedor de inteligencia artificial no estÃ¡ disponible, el sistema utiliza una respuesta documental local como mecanismo de respaldo.

## AplicaciÃ³n desplegada

La aplicaciÃ³n se encuentra desplegada pÃºblicamente en Vercel:

**URL pÃºblica:** [{{VERCEL_URL}}]({{VERCEL_URL}})

## Objetivo

Facilitar consultas relacionadas con:

- Inicio de solicitudes de certificaciÃ³n.
- DocumentaciÃ³n requerida.
- Seguimiento de solicitudes.
- Evaluaciones tÃ©cnicas.
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
BÃºsqueda documental CSV       Google Gemini API
   |                                |
   +---------------+----------------+
                   |
                   v
          Respuesta fundamentada
                   |
                   v
     Fallback documental local
```

La soluciÃ³n utiliza una arquitectura modular inspirada en el patrÃ³n MVC y en la separaciÃ³n de responsabilidades.

### Componentes principales

- `public`: interfaz web desarrollada con HTML5, CSS3 y JavaScript.
- `src/routes`: definiciÃ³n de los endpoints de la API.
- `src/controllers`: validaciÃ³n y procesamiento de solicitudes HTTP.
- `src/services`: bÃºsqueda documental e integraciÃ³n con inteligencia artificial.
- `src/models`: representaciÃ³n y validaciÃ³n de los registros del CSV.
- `src/middlewares`: controles de seguridad y limitaciÃ³n de solicitudes.
- `src/config`: lectura y validaciÃ³n de variables de entorno.
- `data/knowledge`: base de conocimiento documental.
- `scripts`: pruebas y validaciones automatizadas.
- `docs`: documentaciÃ³n tÃ©cnica, arquitectura y seguridad.
- `src/Images`: capturas reales y evidencias visuales del proyecto.

## TecnologÃ­as y herramientas

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
- CategorÃ­a.
- Pregunta.
- Respuesta.
- Palabras clave.
- Fuente documental.

La base de conocimiento contiene informaciÃ³n acadÃ©mica creada especÃ­ficamente para este proyecto.

No incluye:

- Datos personales reales.
- InformaciÃ³n confidencial.
- Credenciales.
- Claves API.
- Direcciones IP.
- InformaciÃ³n de clientes.
- DocumentaciÃ³n interna de empresas.
- NÃºmeros de certificados reales.

## Funcionamiento del agente

El flujo de una consulta es el siguiente:

1. El usuario escribe una pregunta desde la interfaz web.
2. El frontend envÃ­a la pregunta al endpoint del agente.
3. El backend valida y normaliza el contenido recibido.
4. El servicio de bÃºsqueda compara la consulta con la base de conocimiento.
5. Se recuperan los registros documentales mÃ¡s relevantes.
6. Los fragmentos encontrados se proporcionan como contexto autorizado al modelo de inteligencia artificial.
7. Google Gemini genera una respuesta basada exclusivamente en el contexto recuperado.
8. La aplicaciÃ³n muestra la respuesta, categorÃ­a, fuente y referencia documental.
9. Si Gemini no estÃ¡ disponible, se utiliza la mejor respuesta encontrada directamente en el CSV.

## Estructura del proyecto

```text
certi-solutions/
â”œâ”€â”€ data/
â”‚   â””â”€â”€ knowledge/
â”‚       â”œâ”€â”€ README.md
â”‚       â””â”€â”€ certification_knowledge.csv
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ architecture.md
â”‚   â”œâ”€â”€ knowledge-base.md
â”‚   â””â”€â”€ security.md
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â””â”€â”€ styles.css
â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â””â”€â”€ app.js
â”‚   â””â”€â”€ index.html
â”œâ”€â”€ scripts/
â”‚   â”œâ”€â”€ test-agent-endpoint.js
â”‚   â”œâ”€â”€ test-ai-service.js
â”‚   â”œâ”€â”€ test-knowledge-search.js
â”‚   â”œâ”€â”€ test-security-controls.js
â”‚   â””â”€â”€ validate-knowledge.js
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ Images/
â”‚   â”œâ”€â”€ config/
â”‚   â”œâ”€â”€ controllers/
â”‚   â”œâ”€â”€ middlewares/
â”‚   â”œâ”€â”€ models/
â”‚   â”œâ”€â”€ routes/
â”‚   â”œâ”€â”€ services/
â”‚   â”œâ”€â”€ app.js
â”‚   â””â”€â”€ server.js
â”œâ”€â”€ .env.example
â”œâ”€â”€ .gitignore
â”œâ”€â”€ package.json
â”œâ”€â”€ package-lock.json
â””â”€â”€ README.md
```

## InstalaciÃ³n

### 1. Clonar el repositorio

Mediante SSH:

```bash
git clone git@github.com:KrodCode/certi-solutions.git
```

TambiÃ©n puede utilizarse HTTPS:

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

Ejemplo de configuraciÃ³n local:

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

El archivo `.env` estÃ¡ excluido del repositorio mediante `.gitignore`.

## EjecuciÃ³n local

### Modo desarrollo

```bash
npm run dev
```

### Modo producciÃ³n

```bash
npm start
```

Abrir la aplicaciÃ³n localmente en:

```text
http://127.0.0.1:3000
```

## Pruebas

Ejecutar todas las validaciones:

```bash
npm test
```

TambiÃ©n pueden ejecutarse individualmente:

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
- ValidaciÃ³n de campos obligatorios.
- DetecciÃ³n de identificadores duplicados.
- Pruebas del buscador documental.
- Pruebas del endpoint del agente.
- ValidaciÃ³n de preguntas vacÃ­as o incorrectas.
- Pruebas de consultas sin coincidencias.
- ValidaciÃ³n del modo de respuesta con inteligencia artificial.
- ValidaciÃ³n del fallback documental.
- Control del tipo de contenido HTTP.
- LimitaciÃ³n de solicitudes.
- Encabezados de seguridad.
- Control de cachÃ© de la API.
- VerificaciÃ³n de sintaxis del servidor.

## Endpoints

### VerificaciÃ³n del servicio

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
  "question": "Â¿QuÃ© documentos se deben presentar para solicitar una certificaciÃ³n?"
}
```

## Ejemplos de preguntas

- Â¿CÃ³mo se inicia una solicitud de certificaciÃ³n?
- Â¿QuÃ© documentos se deben presentar?
- Â¿QuÃ© ocurre si la documentaciÃ³n estÃ¡ incompleta?
- Â¿CÃ³mo puedo consultar el estado de una solicitud?
- Â¿QuÃ© significa que un ensayo sea conforme?
- Â¿QuÃ© significa que un ensayo sea no conforme?
- Â¿Se puede repetir un ensayo no conforme?
- Â¿CÃ³mo se corrige una no conformidad documental?
- Â¿CuÃ¡nto demora un proceso de certificaciÃ³n?
- Â¿CuÃ¡ndo se emite el resultado final?
- Â¿Las respuestas del agente reemplazan una evaluaciÃ³n tÃ©cnica?

## Ejemplo de respuesta

Pregunta:

```text
Â¿QuÃ© documentos se deben presentar para solicitar una certificaciÃ³n?
```

Respuesta:

```text
Generalmente se debe presentar la identificaciÃ³n del solicitante,
la identificaciÃ³n del producto, la ficha tÃ©cnica, el manual de uso
y los antecedentes tÃ©cnicos disponibles.
```

La respuesta puede generarse mediante Google Gemini utilizando el contexto recuperado desde el CSV o mediante el mecanismo documental local de respaldo.

## Seguridad

Certi-Solutions aplica las siguientes medidas:

- Las claves API se almacenan exclusivamente en variables de entorno.
- El archivo `.env` no se incluye en GitHub.
- `.env.example` contiene Ãºnicamente valores ficticios.
- La integraciÃ³n con Gemini se realiza desde el backend.
- La clave de Gemini nunca se envÃ­a al navegador.
- El servidor local escucha Ãºnicamente en `127.0.0.1`.
- No se exponen puertos ni servicios del computador local.
- No se utilizan conexiones entrantes hacia bases de datos locales.
- Las respuestas se insertan en la interfaz mediante `textContent`.
- Se limita el tamaÃ±o de las solicitudes recibidas.
- Se aplican encabezados de seguridad mediante Helmet.
- Se deshabilita el almacenamiento en cachÃ© de respuestas de la API.
- El endpoint del agente utiliza limitaciÃ³n de solicitudes.
- La API rechaza solicitudes que no utilicen `application/json`.
- No se publican claves SSH, tokens, contraseÃ±as ni cadenas de conexiÃ³n.
- Las variables privadas de producciÃ³n se administran directamente desde Vercel.

## Despliegue en Vercel

La aplicaciÃ³n fue desplegada mediante la integraciÃ³n directa entre Vercel y GitHub.

### ConfiguraciÃ³n utilizada

```text
Application Preset: Express
Root Directory: ./
Repositorio: KrodCode/certi-solutions
Rama: main
```

Las variables privadas de producciÃ³n fueron configuradas directamente desde el panel de Vercel y no forman parte del repositorio pÃºblico.

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

No se configuraron `HOST` ni `PORT`, ya que estos valores son administrados automÃ¡ticamente por Vercel.

### URL pÃºblica

[{{VERCEL_URL}}]({{VERCEL_URL}})

## Evidencias del proyecto

Las capturas reales del funcionamiento de la aplicaciÃ³n se encuentran en:

```text
src/Images
```

### Vista principal de Certi-Solutions

![Vista principal de Certi-Solutions](src/Images/{{IMAGE_HOME}})

### Consulta respondida por el agente

![Consulta respondida por Certi-Solutions](src/Images/{{IMAGE_AGENT}})

### AplicaciÃ³n desplegada pÃºblicamente en Vercel

![Evidencia del despliegue en Vercel](src/Images/{{IMAGE_DEPLOY}})

## Limitaciones

- La base de conocimiento contiene informaciÃ³n ficticia y acadÃ©mica.
- La calidad de las respuestas depende del contenido recuperado desde el CSV.
- El nivel gratuito del proveedor de inteligencia artificial puede aplicar lÃ­mites temporales.
- Cuando la API externa no estÃ¡ disponible, el agente utiliza una respuesta documental local.
- Las respuestas no representan decisiones regulatorias ni certificaciones oficiales.
- El despliegue se realizÃ³ en Vercel y no en Oracle Cloud Infrastructure.

## Alcance

Certi-Solutions es un proyecto acadÃ©mico.

Sus respuestas se basan en documentaciÃ³n ficticia y no reemplazan:

- Evaluaciones tÃ©cnicas profesionales.
- Interpretaciones normativas.
- Resoluciones regulatorias.
- Certificaciones oficiales.
- AsesorÃ­as especializadas.

## Autor

**SebastiÃ¡n Araya**

Challenge Alura Agente
Programa ONE AI for Tech
Alura Latam y Oracle Next Education
