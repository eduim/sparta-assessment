export function buildToken(email: string, password: string) {
  return `randomtoken:${email}:${password}`;
}
