const serverAPI = {
  async login(email: string, password: string) {
    const response = await fakeFetch(email, password);
    return response.token;
  },
};

export default serverAPI;

function fakeFetch(
  email: string,
  password: string
): Promise<{ token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = `randomtoken:${email}:${password}`;
      resolve({ token });
    }, 1000);
  });
}
