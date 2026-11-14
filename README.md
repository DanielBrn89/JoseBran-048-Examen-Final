# Examen de Aseguramiento de la Calidad — Buggy Cars Rating

## Descripción
Pruebas del sitio https://buggy.justtestit.org (Buggy Cars Rating) para las historias HU-1 (Registro), HU-2 (Perfil) y HU-3 (Votar por autos). Incluye 3 casos automatizados con Playwright + TypeScript (Page Object Model) y 2 casos manuales.

Usuario de prueba: `bran15044_1026`.

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

## Casos de prueba
| ID | HU / Criterio | Tipo | Resultado | Estado | Evidencia |
|----|---------------|------|-----------|--------|-----------|
| CP-01 | HU-1 C4 | Automatizado | "Passwords do not match" y botón Register deshabilitado | OK | [CP-01](evidencias/automatizacion/CP-01_claves_no_coinciden.png) |
| CP-02 | HU-1 C2 | Automatizado | "InvalidPasswordException: Password did not conform with policy: Password not long enough" | FALLO (BUG-001) | [CP-02](evidencias/automatizacion/CP-02_clave_6_caracteres.png) |
| CP-03 | HU-3 C4 | Automatizado | "You need to be logged in to vote." sin botón Vote | OK | [CP-03](evidencias/automatizacion/CP-03_debe_iniciar_sesion.png) |
| CP-04 | HU-2 C2 | Manual | Clave de 8 caracteres aceptada: "The profile has been saved successful" | FALLO (BUG-002) | [0](evidencias/manuales/CP-04_0_usuario_registrado.png), [1](evidencias/manuales/CP-04_1_perfil_clave_8.png), [2](evidencias/manuales/CP-04_2_resultado.png) |
| CP-05 | HU-2 C3 | Manual | "First Name is required" y Save deshabilitado | OK | [CP-05](evidencias/manuales/CP-05_1_nombre_vacio.png) |

Nota CP-03: la página del modelo es muy alta y `fullPage` falla, por eso se toma solo la parte visible.

## Ejecución de la suite
Resultado: 2 passed, 1 failed. [terminal_resultado_1](evidencias/automatizacion/terminal_resultado_1.png) · [terminal_resultado_2](evidencias/automatizacion/terminal_resultado_2.png)

> CP-02 falla a propósito: es un defecto del sitio y el test no se modificó para que pase (indicación del examen).

## Defectos encontrados
- **BUG-001** — El registro rechaza una clave de 6 caracteres que cumple HU-1 C2 (Prioridad Alta).
- **BUG-002** — El perfil acepta una nueva clave de 8 caracteres aunque HU-2 C2 exige mínimo 10 (Prioridad Alta).

Reporte: [docs/Reporte_de_defectos.docx](docs/Reporte_de_defectos.docx)

## Documentación
- [docs/Casos_de_prueba.xlsx](docs/Casos_de_prueba.xlsx)
- [docs/Reporte_de_defectos.docx](docs/Reporte_de_defectos.docx)

## Estructura del repositorio
```
pages/        RegisterPage.ts, OverallPage.ts
helpers/      evidencia.ts, login.ts
tests/        hu1-registro.spec.ts, hu3-votar.spec.ts
evidencias/   automatizacion/, manuales/
docs/         Casos_de_prueba.xlsx, Reporte_de_defectos.docx
reportes/     html-report (Playwright)
playwright.config.ts, package.json, .npmrc, .gitignore
```
