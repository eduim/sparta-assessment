import type { AuthReponse, FetchFunction, CredentialsForm } from "../types";
import { buildToken } from "../utils/utils";
const ServerAPI = (fetch: FetchFunction) => ({
  async login({ email, password }: CredentialsForm): Promise<AuthReponse> {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },
});
export function fakeFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  switch (url) {
    case "/login": {
      const { email, password } = JSON.parse(options?.body as string);
      return new Promise((resolve) => {
        setTimeout(() => {
          const token = buildToken(email, password);
          const fakeResponse = new Response(JSON.stringify({ token }));
          resolve(fakeResponse);
        }, 1000);
      });
    }
    default:
      throw new Error(`Unhandled endpoint: ${url}`);
  }
}

export default ServerAPI;
