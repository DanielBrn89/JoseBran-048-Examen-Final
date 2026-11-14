// Login único: carné + hora actual (HHmmss)
export function loginUnico(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `bran15044_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}
