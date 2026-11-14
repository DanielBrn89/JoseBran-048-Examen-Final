import { Page, TestInfo } from '@playwright/test';

// Guarda captura completa en evidencias/automatizacion y la adjunta al reporte
export async function evidencia(page: Page, testInfo: TestInfo, nombre: string) {
  const ruta = `evidencias/automatizacion/${nombre}.png`;
  try {
    await page.screenshot({ path: ruta, fullPage: true });
  } catch {
    // Páginas muy largas (ej. modelo con ~180000 px) no admiten fullPage: se usa el viewport
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: ruta });
  }
  await testInfo.attach(nombre, { path: ruta, contentType: 'image/png' });
}
