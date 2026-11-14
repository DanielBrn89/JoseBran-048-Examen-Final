import { test, expect } from '@playwright/test';
import { OverallPage } from '../pages/OverallPage';
import { evidencia } from '../helpers/evidencia';

test.describe('HU-3 Votar por autos', () => {
  test('CP-03 Sin sesión, abrir el primer auto de Overall Rating @hu3', async ({ page }, testInfo) => {
    const overall = new OverallPage(page);
    await overall.goto();
    await overall.openFirstCar();

    const aviso = page.getByText(/You need to be logged in to vote/i);
    await aviso.waitFor({ state: 'visible' }).catch(() => {});
    await evidencia(page, testInfo, 'CP-03_debe_iniciar_sesion');

    // Esperado: aviso de iniciar sesión y ningún botón Vote habilitado
    await expect(aviso).toBeVisible();
    await expect(page.getByRole('button', { name: 'Vote!' }).and(page.locator(':enabled'))).toHaveCount(0);
  });
});
