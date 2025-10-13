# IdeaSoft MultiAPI

Proyecto backend construido con [AdonisJS](https://adonisjs.com/) y TypeScript, diseñado para exponer APIs, incluyendo endpoints de IA y autenticación, con despliegue automatizado vía GitHub Actions.

## Estructura del Proyecto

- `app/` — Lógica de negocio (controladores, modelos, servicios, validadores, etc.)
- `bin/` — Scripts de arranque y consola
- `commands/` — Comandos personalizados
- `config/` — Archivos de configuración
- `database/` — Migraciones y seeds
- `resources/`, `inertia/` — Recursos de frontend (si aplica)
- `start/` — Archivos de arranque de la app
- `storage/` — Archivos persistentes (subidas, logs, etc.)
- `tests/` — Pruebas automatizadas

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu_usuario/tu_repo.git
    cd tu_repo
    ```

2. Instala dependencias:

    ```sh
    corepack enable
    pnpm install
    ```

3. Copia el archivo de entorno y configura tus variables:

    ```sh
    cp .env.example .env
    # Edita .env según tus necesidades
    ```

4. Ejecuta migraciones (si aplica):
    ```sh
    node ace migration:run
    ```

## Uso en desarrollo

```sh
pnpm run dev
```

## Compilación para producción

```sh
pnpm run build
```

## Despliegue

El despliegue está automatizado mediante GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).  
Incluye pasos para instalar dependencias, compilar, gestionar variables de entorno y reiniciar el proceso con PM2.

## Endpoints principales

- `/api/ia` — Endpoint POST para generar respuestas de IA (ver [app/controllers/api_controller.ts](app/controllers/api_controller.ts))

## Licencia

MIT

---

> Para dudas o contribuciones, abre un issue o pull request.
> Primero descargar e instalar localmente Ollama

https://ollama.com/download

luego ejecutar en terminal para descargar el modelo:

ollama pull tinyllama
ollama pull gemma:2b
ollama pull gemma3
ollama pull gpt-oss:120b-cloud
