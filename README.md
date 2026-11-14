# Examen Final — Aseguramiento de la Calidad del Software (048)

**Universidad Mariano Gálvez de Guatemala** · III Serie
**Estudiante:** José Daniel Bran Benito — 1790-22-15044
**Sitio bajo prueba:** [Buggy Cars Rating](https://buggy.justtestit.org)
**Fecha de ejecución:** 14/11/2026

## 📁 Documentación

> [!IMPORTANT]
> ### 📂 [ABRIR CARPETA DE DRIVE — Excel de casos de prueba y Word de reporte de errores](https://drive.google.com/drive/folders/1jM8spcEM-F-O1ZNgWiLHrRwL5sUPBfRx?usp=drive_link)

**Archivos en el repositorio**

| Documento | Archivo |
|-----------|---------|
| 📊 Casos de prueba (plantilla Excel) | [docs/Casos_de_prueba.xlsx](docs/Casos_de_prueba.xlsx) |
| 📝 Reporte de errores (plantilla Word) | [docs/Reporte_de_defectos.docx](docs/Reporte_de_defectos.docx) |
| 🧪 Reporte HTML de Playwright | [reportes/html-report/index.html](reportes/html-report/index.html) |
| 🖼️ Evidencias automatizadas | [evidencias/automatizacion/](evidencias/automatizacion/) |
| 🖼️ Evidencias manuales | [evidencias/manuales/](evidencias/manuales/) |

## Descripción

Pruebas sobre **HU-1 Registro de usuario**, **HU-2 Actualizar perfil** y **HU-3 Votar por autos**. Son 5 casos de prueba: 3 automatizados con Playwright + TypeScript y 2 manuales. Se encontraron 2 defectos.

## Navegador utilizado

| Tipo de prueba | Navegador | Sistema |
|----------------|-----------|---------|
| Automatizadas | Chromium (Playwright, Desktop Chrome) — Playwright 1.65.1 | Windows 11 |
| Manuales | Google Chrome | Windows 11 |

## Instalación

Requisitos: Node.js 18 o superior y Git.

```bash
git clone https://github.com/DanielBrn89/JoseBran-048-Examen-Final.git
cd JoseBran-048-Examen-Final
npm install
npx playwright install chromium
```

> Nota: `.npmrc` tiene `ignore-scripts=true`, por eso el navegador se instala aparte.

## Ejecución

```bash
npx playwright test
npx playwright test --headed
npx playwright test --grep "@hu1"
npx playwright show-report reportes/html-report
```

**Resultado esperado: 2 passed, 1 failed.** CP-02 falla a propósito porque es un defecto del sitio (BUG-001); según las indicaciones del examen, el test no se modificó para que pase.

Evidencia: [terminal_resultado_1.png](evidencias/automatizacion/terminal_resultado_1.png) · [terminal_resultado_2.png](evidencias/automatizacion/terminal_resultado_2.png)

## Casos de prueba

| ID | Historia / criterio | Tipo | Resultado obtenido | Estado | Evidencia |
|----|---------------------|------|--------------------|--------|-----------|
| CP-01 | HU-1 C4, confirmación de clave distinta | Automatizado | "Passwords do not match" y botón Register deshabilitado | ✅ OK | [CP-01_claves_no_coinciden.png](evidencias/automatizacion/CP-01_claves_no_coinciden.png) |
| CP-02 | HU-1 C2, clave de 6 caracteres válida según la historia | Automatizado | "InvalidPasswordException: Password did not conform with policy: Password not long enough" | ❌ FALLO → BUG-001 | [CP-02_clave_6_caracteres.png](evidencias/automatizacion/CP-02_clave_6_caracteres.png) |
| CP-03 | HU-3 C4, sin sesión, primer auto de Overall Rating | Automatizado | "You need to be logged in to vote." sin botón Vote | ✅ OK | [CP-03_debe_iniciar_sesion.png](evidencias/automatizacion/CP-03_debe_iniciar_sesion.png) |
| CP-04 | HU-2 C2, nueva clave de 8 caracteres desde el perfil | Manual | Se aceptó: "The profile has been saved successful" | ❌ FALLO → BUG-002 | [CP-04_0_usuario_registrado.png](evidencias/manuales/CP-04_0_usuario_registrado.png), [CP-04_1_perfil_clave_8.png](evidencias/manuales/CP-04_1_perfil_clave_8.png), [CP-04_2_resultado.png](evidencias/manuales/CP-04_2_resultado.png) |
| CP-05 | HU-2 C3, guardar perfil con nombre vacío | Manual | "First Name is required" y botón Save deshabilitado | ✅ OK | [CP-05_1_nombre_vacio.png](evidencias/manuales/CP-05_1_nombre_vacio.png) |

**Resumen:** 5 casos · 3 OK · 2 FALLO · 60 % de aprobación.

- Usuario de los casos manuales: `bran15044_1026` (sin contraseña). Los tests generan un login único `bran15044_<HHmmss>`.
- Nota CP-03: la página del modelo es muy alta y la captura de página completa falla, por eso se guarda la parte visible.

## Defectos encontrados

| ID | Título | Severidad | Prioridad | Caso | Issue |
|----|--------|-----------|-----------|------|-------|
| BUG-001 | El registro rechaza una clave de 6 caracteres que cumple los criterios de HU-1 C2 | Alta | P1 | CP-02 | #1 |
| BUG-002 | El perfil acepta una nueva clave de 8 caracteres aunque HU-2 C2 exige mínimo 10 | Alta | P2 | CP-04 | #2 |

Detalle completo en [docs/Reporte_de_defectos.docx](docs/Reporte_de_defectos.docx) y en la carpeta de Drive.

## Estructura del repositorio

```
.
├── docs/                      # Casos de prueba (Excel) y reporte de defectos (Word)
├── evidencias/
│   ├── automatizacion/        # Capturas de CP-01..CP-03 y de la terminal
│   └── manuales/              # Capturas de CP-04 y CP-05
├── helpers/                   # evidencia.ts (capturas), login.ts (login único)
├── pages/                     # Page Objects: RegisterPage, OverallPage
├── tests/                     # hu1-registro.spec.ts, hu3-votar.spec.ts
├── reportes/html-report/      # Reporte HTML de Playwright
├── playwright.config.ts       # Configuración de Playwright
├── .gitignore                 # Excluye node_modules/ y test-results/
├── .npmrc                     # ignore-scripts=true
└── package.json
```
