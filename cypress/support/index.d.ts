/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<any>;
  }
}
