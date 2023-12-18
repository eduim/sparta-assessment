import type { AuthReponse } from "../types";
import { buildToken } from "../utils/utils";

const serverAPI = {
  async login(email: string, password: string): Promise<AuthReponse> {
    return await fakeFetch(email, password);
  },
};

export default serverAPI;

function fakeFetch(email: string, password: string): Promise<AuthReponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = buildToken(email, password);
      resolve({ token });
    }, 1000);
  });
}
