import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly username: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly mismatchMessage: Locator;
  readonly serverAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#username');
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.password = page.locator('#password');
    this.confirmPassword = page.locator('#confirmPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successMessage = page.getByText('Registration is successful');
    this.mismatchMessage = page.getByText('Passwords do not match');
    // Errores del servidor (recuadro rojo visible, fuera de los avisos ocultos del formulario)
    this.serverAlert = page.locator('.alert.alert-danger:visible, .result.alert-danger:visible');
  }

  async goto() {
    await this.page.goto('/register');
    await this.username.waitFor({ state: 'visible' });
  }

  async fillForm(login: string, nombre: string, apellido: string, clave: string, confirmacion: string) {
    await this.username.fill(login);
    await this.firstName.fill(nombre);
    await this.lastName.fill(apellido);
    await this.password.fill(clave);
    await this.confirmPassword.fill(confirmacion);
    // Sale del último campo para que se dispare la validación
    await this.lastName.click();
  }

  async register() {
    await this.registerButton.click();
  }
}
