import type { AuthReponse } from "../types";

const serverAPI = {
  async login(email: string, password: string): Promise<AuthReponse> {
    const response = await fakeFetch(email, password);
    return response.token;
  },
};

export default serverAPI;

function fakeFetch(email: string, password: string): Promise<AuthReponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = `randomtoken:${email}:${password}`;
      resolve({ token });
    }, 1000);
  });
}
