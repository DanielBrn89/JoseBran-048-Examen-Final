# Examen de Aseguramiento de la Calidad — Buggy Cars Rating

## Descripción
Pruebas del sitio https://buggy.justtestit.org (Buggy Cars Rating) para las historias HU-1 (Registro de usuario) y HU-3 (Votar por autos). Incluye 3 casos automatizados con Playwright + TypeScript (Page Object Model) y 2 casos manuales.

## Navegador utilizado
Chromium de Playwright (Desktop Chrome), Playwright 1.65.1 (`npx playwright --version`).

## Instalación
```bash
npm install
npx playwright install chromium
```

## Ejecución
```bash
npx playwright test
npx playwright test --headed
npx playwright show-report reportes/html-report
```

## Casos automatizados
| ID | HU / criterio | Archivo | Resultado | Evidencia |
|----|---------------|---------|-----------|-----------|
| CP-01 | HU-1 / C4 — confirmación de clave distinta | tests/hu1-registro.spec.ts | Pasó | [CP-01](evidencias/automatizacion/CP-01_claves_no_coinciden.png) |
| CP-02 | HU-1 / C2 — clave de 6 caracteres válida | tests/hu1-registro.spec.ts | **Falló (defecto)** | [CP-02](evidencias/automatizacion/CP-02_clave_6_caracteres.png) |
| CP-03 | HU-3 / C4 — votar sin sesión | tests/hu3-votar.spec.ts | Pasó | [CP-03](evidencias/automatizacion/CP-03_debe_iniciar_sesion.png) |

## Casos manuales
- CP-04 y CP-05: ver [evidencias/manuales/](evidencias/manuales/).

## Defectos
Ver [docs/Reporte_de_defectos.docx](docs/Reporte_de_defectos.docx).

## Estructura del repositorio
```
pages/        Page Objects (RegisterPage, OverallPage)
helpers/      evidencia.ts (capturas), login.ts (login único)
tests/        hu1-registro.spec.ts, hu3-votar.spec.ts
evidencias/   automatizacion/ y manuales/
docs/         Reporte de defectos
reportes/     Reporte HTML de Playwright
playwright.config.ts
```
