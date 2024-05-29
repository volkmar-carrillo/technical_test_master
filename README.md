# **Prueba de Ingreso - Desarrollador Full-Stack con Enfoque en Back-End - Master**

**Objetivo de la prueba:** Evaluar habilidades en Back-End

- **Ejercicio 1:** Consumo de APIs

Crea una aplicación Node.js que consuma la API de GitHub y muestre los 10 repositorios más populares del usuario "google". 

**PROPUESTA DE SOLUCIÓN**

**Ejecutar la aplicación:**
```
npm run start
```

**Desarrollo realizado:**

1. Se construye un API Rest usando Typescript para el consumo hacia GitHub, está API desencadena un Endpoint GET `http://localhost:3000/repos/{username}/{records}`, donde:

    - **username**: El usuario GitHub para obtener los repositorios más populares
    - **records**: Los primeros n repositorios a consulta, este es un campo opcional, si no se ingresa, responderá con todos los repositorios del usuario ordenados desde los respositorios más populares a los menos populares

2. Se consume la API de GitHub para obtener los repositorios de un usuario mediante el Endpoint `https://api.github.com/users/${username}/repos`, este endpoint no requiere de Autenticación.

3. Se realiza la siguiente lógica para la obtención de los 10 repositorios más populares:

``` ts
const sortedRepos = repos.reduce((acc: GitHubApiResponse[], repo: GitHubApiResponse) => {
    if (acc.length < records || repo.stargazers_count > acc[acc.length - 1].stargazers_count) {
        acc.push({
            name: repo.name,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
        });
        acc.sort((a, b) => b.stargazers_count - a.stargazers_count);
        if (acc.length > records) acc.pop();
    }
    return acc;
}, []);
```

Se seleccionan los campos ***name***, ***html_url*** y ***stargazers_count***, como respuesta de la API desarrollada.

Importante destacar que se opta por usar `reduce` para el análisis de la respuesta de GitHub, ya que esto implica que:

- Usar `map` implica iterar todos los elementos del array para crear un nuevo array con los elementos mapeados. Complejidad de ![Fórmula](https://latex.codecogs.com/png.latex?\{O(n)})
- Usar `sort` implica ordenar (más no filtrar internamente, se tendría que hacer un `filter` previo al `sort`) el array utilizando un algoritmo de ordenamiento eficiente. Complejidad de ![Fórmula](https://latex.codecogs.com/png.latex?\{O(nlogn)})
- En cambio, `reduce` combina el filtrado y el ordenamiento en una sola pasada. Complejidad de ![Fórmula](https://latex.codecogs.com/png.latex?\{O(nlogk)}) donde `k` es el número de elementos que se desea mantener, en este caso, `records`.

**Pruebas de Consumo:**

![alt_text](/assets/test_api.png)

---

- **Ejercicio 2:** Nomenclatura

Te presentamos el siguiente fragmento de código:

```js
function f(x, y, z) {
 let a = x + y;
 let b = a * z;
 let c = Math.sin(b);
 return c;
}
```
Reemplaza los nombres de las variables con nombres más descriptivos que reflejen mejor su función.

**PROPUESTA DE SOLUCIÓN**

```js
function f(x, y, z) {
  let sumOfValues = x + y;
  let scaledSum = sumOfValues * z;

  let sineResult = Math.sin(scaledSum);

  return sineResult;
}
```

Explicación de los nombres de las variables:

- La función calcula el seno de una suma escalada, de aquí podemos interpretar que `x` y `y` son valores numéricos con la misma unidad de medida y `z` un factor de escala o constante relacionados con `x` y `y`
- Se reemplaza `a` por `sumOfValues` ya que indica más claramente que se está realizando una suma (asi sea obvio, pero en fórmulas más complejas puede ser un desafio encontrarse con el nombre `a`)
- Se reemplaza `b` por `scaledSum` ya que indica más claramente que se está escalando una suma dado un factor de escala o constante.
- Se reemplaza `c` por sineResult ya que indica más claramente que se está calculando el seno de una suma escalada (asi sea obvio, pero en fórmulas más complejas puede ser un desafio encontrarse con el nombre `c`)

---

- **Ejercicio 3:** Pensamiento lógico

Escribe una función que tome un número entero como entrada y devuelva un array con todos los números enteros impares desde 1 hasta el número de entrada. Por ejemplo, si el número de entrada es 9, la función debería devolver [1, 3, 5, 7, 9].

**PROPUESTA DE SOLUCIÓN**

```js
function getOddNumbers(n) {
    return Array.from({ length: Math.ceil(n / 2) }, (_, iterator) => iterator * 2 + 1);
}
```

Pruebas de la función:
![alt_text](/assets/test_function_odd_numbers.png)

La complejidad algoritmica de esta propuesta de solución seria de ![Fórmula](https://latex.codecogs.com/png.latex?\{O(n)}) donde `n` es el número de elementos en el array de salida. Esto es eficiente para este tipo de operación, ya que la generación de cada elemento del array se hace en tiempo constante y la longitud del array es lineal respecto al número de entrada.

Sería la misma complejidad usar a `for` pero se ha decidido aprovechar un poco a `Array.from`.

---

- **Ejercicio 4:** Modelado de bases de datos

Imagina que estás construyendo un sistema de gestión de vídeos. Diseña un modelo de base de datos que incluya tablas para vídeos, autores, colaboradores, comentarios, reviews y usuarios. Asegúrate de incluir las claves primarias, las claves foráneas y las restricciones de integridad necesarias para que el sistema funcione correctamente.

**PROPUESTA DE SOLUCIÓN**

![alt_text](/assets/database_model_video_management.png)

---

- **Ejercicio 5:** Arquitectura del Back-End

Describe cómo estructurarías el Back-End de una aplicación de comercio electrónico. Habla sobre las tecnologías que utilizarías, la organización de los archivos, el uso de patrones de diseño, etc.

**PROPUESTA DE SOLUCIÓN**

**Modelo de Arquitectura bajo AWS**

![alt_text](/assets/model_architecture.png)

**Descripción del Modelo**

**Gestión de Tráfico y Balanceo de Carga**

- **Amazon Route 53:** Servicio DNS para dirigir el tráfico a los servicios backend.
- **Elastic Load Balancer (ELB):** Distribuye el tráfico entrante entre las instancias de backend, asegurando alta disponibilidad y balanceo de carga.

**Microservicios**

- **Amazon ECS/EKS/Fargate:** Orquestación de contenedores para desplegar microservicios que manejan diferentes aspectos del comercio electrónico:
    - **Servicio de Usuarios:** Gestión de registros, autenticación y perfiles de usuarios.
    - **Servicio de Productos:** Gestión del catálogo de productos, incluyendo detalles de productos y disponibilidad.
    - **Servicio de Pedidos:** Gestión del proceso de creación y seguimiento de pedidos.
    - **Servicio de Pagos:** Integración con pasarelas de pago y manejo de transacciones.
    - **Servicio de Inventario:** Seguimiento y gestión del inventario de productos.

**API Management**

- **Amazon API Gateway:** Para gestionar las APIs de los microservicios y facilitar la comunicación entre frontend y backend.

**Almacenamiento y Bases de Datos**

- **Amazon RDS (Aurora):** Base de datos relacional para datos transaccionales, como información de usuarios y pedidos.
- **Amazon DynamoDB:** Base de datos NoSQL para datos que requieren baja latencia, como catálogos de productos y sesiones de usuario.
- **Amazon S3:** Para almacenar imágenes de productos, documentos y otros archivos no estructurados.
- **Amazon ElastiCache:** Para almacenamiento en caché, mejorando el rendimiento de la base de datos y acelerando las consultas frecuentes.

**Mensajería y Comunicación**

- **Amazon SQS:** Sistema de colas para la comunicación asíncrona entre microservicios, como la confirmación de pedidos y actualizaciones de inventario.
- **Amazon SNS:** Servicio de notificaciones para eventos y alertas, como confirmaciones de pedidos y notificaciones de envío.

**Seguridad y Gestión de Acceso**

- **AWS IAM:** Gestión de identidades y accesos, asegurando que solo usuarios autorizados puedan acceder a ciertos recursos.
- **AWS Cognito:** Autenticación y gestión de usuarios, proporcionando un servicio seguro para el inicio de sesión y registro de usuarios.

**Monitorización y Logging**

- **Amazon CloudWatch:** Para monitorización, alertas y gestión de logs.
- **AWS X-Ray:** Rastreo de solicitudes y debugging para identificar problemas de rendimiento.
- **AWS CloudTrail:** Auditoría y registro de actividades en AWS para mantener un historial de cambios y accesos.

**Tecnologias Lenguajes y Frameworks:**

- TypeScript
- Node.js
- GraphQL
- Terraform
- AWS
- GitHub

**Patrones de Diseño**

- **Microservicios:** Cada módulo (auth, products, orders, users) es un microservicio independiente con su propia lógica y base de datos.

- **Repository Pattern:** Cada servicio tiene su propio repositorio para la interacción con la base de datos, asegurando separación de preocupaciones.

- **CQRS:** Implementado en servicios críticos como orders y products, separando las operaciones de lectura y escritura.

- **Event-Driven Architecture:** Para operaciones como notificación de usuarios y actualización de inventario, utilizando Amazon SNS/SQS.

- **Domain-Driven Design (DDD):** Cada módulo está diseñado en torno a los dominios del negocio, lo que facilita la comprensión y la evolución del código.

- **Hexagonal Architecture (Ports and Adapters):** La lógica de negocio central está aislada de la infraestructura externa, permitiendo cambios en la infraestructura sin afectar la lógica central.

---

- **Ejercicio 6:** Nomenclatura

Crea un documento de políticas de nomenclatura para el equipo de desarrollo de una compañía, la política debe incluir nomenclatura de: bases de datos, variables, funciones, clases, git, etc.

**PROPUESTA DE SOLUCIÓN**

# Documento de Políticas de Nomenclatura para el Equipo de Desarrollo

## Introducción
En este documento se establecen los estándares de nomenclatura para los diversos recursos de la compañía, esto debe cumplirse para garantizar la consistencia del proyecto.

También ayuda a la analítica del proyecto y optimización de costos (Ej: Estamos usando JIRA para la gestión del proyecto, el usar el ID de JIRA en los commits y PRs de GitHub, se puede hacer una integración para revisar que tan eficiente está siendo el equipo con los despliegues)

## 1. Nomenclatura de Bases de Datos
### 1.1. Nombres de Bases de Datos
- Deben ser en inglés y describir el propósito o el contenido de la base de datos.
- Utilizar snake_case (minúsculas y guiones bajos).
- Ejemplo: ecommerce_db, user_management_db

### 1.2. Nombres de Tablas
- Deben ser en inglés, descriptivos y en plural.
- Utilizar snake_case.
- Ejemplo: customers, order_items

### 1.3. Nombres de Columnas
- Deben ser en inglés y descriptivos.
- Utilizar snake_case.
- Ejemplo: first_name, order_date

## 2. Nomenclatura de Variables
### 2.1. Variables en Código
- Deben ser en inglés y descriptivos.
- Utilizar camelCase para variables locales y snake_case para constantes.
- Ejemplo: totalPrice, user_name, MAX_USERS

### 2.2. Variables en Archivos de Configuración
- Utilizar UPPER_SNAKE_CASE.
- Ejemplo: DATABASE_URL, API_KEY

## 3. Nomenclatura de Funciones
### 3.1. Funciones en Código
- Deben ser en inglés y describir claramente la acción que realiza la función.
- Utilizar camelCase.
- Ejemplo: calculateTotalPrice, fetchUserData

## 4. Nomenclatura de Clases
### 4.1. Clases en Código
- Deben ser en inglés y descriptivos.
- Utilizar PascalCase.
- Ejemplo: UserController, OrderService

## 5. Nomenclatura en Git
### 5.1. Repositorios
- Cada microservicio debe tener su propio repositorio exclusivo.
- Nombres en inglés, descriptivos y en kebab-case.
- Ejemplo: user-management-service, order-processing-service

### 5.2. Commits
- El título de cada commit debe seguir el formato {GitHubEmoji} + {ID_Jira} + {Descripción}.
- Ejemplo: :sparkles: [JIRA-123] Implement user authentication

### 5.3. Pull Requests (PR)
- El título de cada PR debe seguir el mismo formato que los commits.
- Ejemplo: :sparkles: [JIRA-123] Implement user authentication
- Aprobaciones de PR:
  - Al menos dos aprobaciones requeridas antes de fusionar a la rama principal.

### 5.4. Ramas
- Utilizar las siguientes ramas estándar:
  - `prod` para producción.
  - `stg` para staging.
  - `dev` para desarrollo.
- Ramas de características:
  - Nombres en formato feature/{ID_Jira}.
  - Ejemplo: feature/JIRA-456

## 6. Ambiente de Desarrollo
### 6.1. Naming Conventions para Entornos
- Nombres de ambientes:
  - `prod` para producción.
  - `stg` para staging.
  - `dev` para desarrollo.

## 7. Gestión de Proyectos y Métricas
### 7.1. Nombres de Proyectos
- Deben ser en inglés y describir el objetivo del proyecto.
- Utilizar PascalCase.
- Ejemplo: EcommercePlatform, UserManagementSystem

### 7.2. Nombres de Documentos de Proyecto
- Utilizar snake_case para todos los documentos relacionados con el proyecto.
- Ejemplo: project_plan.md, requirements_specification.pdf

### 7.3. Métricas y Logs
- Utilizar snake_case para nombres de métricas y registros.
- Ejemplo: response_time, error_count

## 8. Otras Consideraciones
### 8.1. Documentación
- Debe seguir las mismas convenciones de nomenclatura para garantizar la consistencia.
- Nombres de documentos y archivos en snake_case.
- Ejemplo: api_documentation.md, deployment_guide.pdf

### 8.2. Archivos de Configuración
- Nombres descriptivos y en snake_case.
- Ejemplo: database_config.yml, application_settings.json

## 9. Estándares Adicionales
### 9.1. Nombres de Scripts
- Utilizar snake_case para scripts.
- Ejemplo: backup_database.sh, deploy_application.py

### 9.2. Nombres de Directorios
- Utilizar kebab-case para nombres de directorios.
- Ejemplo: user-management, order-processing

### 9.3. Nombres de APIs
- Utilizar camelCase para endpoints.
- Ejemplo: /getUserInfo, /createOrder

## 10. DevOps
### 10.1. Pipelines
- Los nombres de pipelines deben ser descriptivos y en kebab-case.
- Ejemplo: build-and-deploy, run-tests

### 10.2. Rollbacks
- Utilizar nombres descriptivos y en kebab-case para scripts de rollback.
- Ejemplo: rollback-database.sh, rollback-deployment.py

### 10.3. Archivos de Infraestructura como Código (IaC)
- Utilizar snake_case para archivos de Terraform y otros IaC.
- Ejemplo: main.tf, variables.tf

### 10.4. Nombres de Recursos en la Nube
- Utilizar snake_case y nombres descriptivos para recursos en la nube.
- Ejemplo: s3_bucket_name, ec2_instance_type


---

By<br>
Volkmar Carrillo
Systems Engineer