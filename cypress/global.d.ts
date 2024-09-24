declare namespace Cypress {
  interface Chainable {
    /**
     * Login using the REST API
     */
    loginViaAPI(username: string, password: string): void

    /**
     * Logout using the REST API
     */
    logoutViaAPI(): void
  }
}
