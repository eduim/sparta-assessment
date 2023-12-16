import type { AuthReponse } from "../types";

const serverAPI = {
  async login(email: string, password: string): Promise<AuthReponse> {
    return await fakeFetch(email, password);
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
