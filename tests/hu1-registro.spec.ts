import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { evidencia } from '../helpers/evidencia';
import { loginUnico } from '../helpers/login';

test.describe('HU-1 Registro de usuario', () => {
  test('CP-01 Registro con confirmación de clave distinta @hu1', async ({ page }, testInfo) => {
    const registro = new RegisterPage(page);
    await registro.goto();
    // Clave y confirmación distintas (C4)
    await registro.fillForm(loginUnico(), 'Daniel', 'Bran', 'Qa#12345', 'Qa#99999');
    await evidencia(page, testInfo, 'CP-01_claves_no_coinciden');

    // Esperado: aviso de claves distintas, botón deshabilitado y sin registro exitoso
    await expect(registro.mismatchMessage).toBeVisible();
    await expect(registro.registerButton).toBeDisabled();
    await expect(registro.successMessage).toHaveCount(0);
  });

  test('CP-02 Registro con clave de 6 caracteres válida @hu1', async ({ page }, testInfo) => {
    const registro = new RegisterPage(page);
    await registro.goto();
    // Qa#123: 6 caracteres, mayúscula y carácter especial (C2)
    await registro.fillForm(loginUnico(), 'Daniel', 'Bran', 'Qa#123', 'Qa#123');
    await registro.register();
    // Espera a que aparezca algún resultado (éxito o error) antes de la captura
    await registro.successMessage.or(registro.serverAlert.first()).waitFor({ state: 'visible' }).catch(() => {});
    await evidencia(page, testInfo, 'CP-02_clave_6_caracteres');

    // Esperado según la historia: registro exitoso
    await expect(registro.successMessage).toBeVisible();
  });
});
