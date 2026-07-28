# Seguridad de Certi-Solutions

## Gestión de secretos

Certi-Solutions no almacena secretos dentro del código fuente ni en el repositorio público.

Los siguientes elementos deben permanecer fuera de GitHub:

- Archivos .env.
- Contraseñas.
- Claves de API.
- Tokens de acceso.
- Claves SSH.
- Certificados privados.
- Credenciales de bases de datos.
- Configuraciones privadas de OCI.
- Cadenas de conexión reales.

## Variables de entorno

El archivo .env.example contiene solamente nombres de variables y valores ficticios.

Cada entorno debe proporcionar sus propios valores:

- Desarrollo local.
- Pruebas.
- Producción en Oracle Cloud Infrastructure.

## Seguridad local

Durante el desarrollo, el servidor utiliza:

HOST=127.0.0.1

Esta configuración limita el acceso al equipo local.

No se debe configurar localmente:

HOST=0.0.0.0

salvo que exista una necesidad controlada y una revisión previa de seguridad.

## Base de datos

La base de datos no será expuesta directamente a Internet.

Cuando se incorpore persistencia:

- Se utilizarán usuarios con privilegios mínimos.
- Las credenciales se almacenarán en variables de entorno.
- Se restringirán las direcciones autorizadas.
- No se publicarán cadenas de conexión.
- No se subirán respaldos o archivos de base de datos.
- No se abrirán puertos hacia el computador local.

## Oracle Cloud Infrastructure

Las credenciales de OCI se configurarán directamente en el entorno de producción.

No se publicarán:

- Claves privadas.
- API keys.
- OCID sensibles.
- Archivos de configuración privados.
- Contraseñas de instancias.
- Llaves SSH.

## Revisión antes de cada push

Antes de cada commit se debe ejecutar:

git status
git diff
git diff --cached

Los archivos deben agregarse de manera explícita, evitando git add punto.

## Incidente de credenciales

Si una credencial se incorpora accidentalmente al repositorio:

1. Se debe revocar inmediatamente.
2. Se debe generar una credencial nueva.
3. Se debe eliminar del código.
4. Se debe revisar y limpiar el historial Git.
5. Se debe comprobar que no existan copias remotas.
