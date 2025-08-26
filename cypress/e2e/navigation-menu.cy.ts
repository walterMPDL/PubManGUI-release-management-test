describe('Navigation Menu', () => {

  const loginName = Cypress.env('testUser').loginName
  const password = Cypress.env('testUser').password
  const baseUrl = baseUrlWithoutTrailingSlashes()

  beforeEach(() => {
    cy.loginViaAPI(loginName, password)
  })

  afterEach(() => {
    cy.logoutViaAPI()
  })

  it('Entry', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-entry"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/edit')
  })

  it('My datasets', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-my-datasets"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/my')
  })

  it('QA Area', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-qa-area"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/qa')
  })

  it('Imports', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-qa-area"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/qa')
  })

  //TODO: Add Tests for: New & My Imports

  it('Batch', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-batch"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/batch/logs')
  })

  //TODO: Add Tests for: Batch Datasets, Batch Actions & Batch Logs

  it('Basket', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-basket"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/cart')
  })

  it('Organizational Units', () => {
    //Given
    cy.visit('/')
    //When
    cy.get('[data-test="sidenav-organizational-units"]').filter(':visible').click()
    //Then
    cy.url().should('eq', baseUrl + '/ou_tree')
  })

  /**
   * Remove trailing forward slashes from baseUrl
   * (Angulars default baseUrl http://localhost:4200/ has a trailing slash, the baseUrl configured in cypress.config.ts has none)
   */
  function baseUrlWithoutTrailingSlashes() {
    // @ts-ignore
    return Cypress.config().baseUrl.replace(/\/+$/, '')
  }

})
