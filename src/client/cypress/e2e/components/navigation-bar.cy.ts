describe('Navigation bar', () => {
  describe('When the user visits the home page', () => {
    it('displays the navigation bar', () => {
      cy.visit('/')

      // Navigation bar
      cy.contains('nav', 'Home')
      cy.contains('nav', 'Gallery')

      // Checking the active link
      cy.get('.nav-link').first().should('have.class', 'active')
      cy.get('.nav-link').eq(1).should('not.have.class', 'active')
    })
  })

  describe('When the user visits the gallery page', () => {
    it('displays the navigation bar', () => {
      cy.visit('/gallery')

      // Navigation bar
      cy.contains('nav', 'Home')
      cy.contains('nav', 'Gallery')

      // Checking the active link
      cy.get('.nav-link').first().should('not.have.class', 'active')
      cy.get('.nav-link').eq(1).should('have.class', 'active')
    })
  })

  describe('When the user visits the 404 page', () => {
    it('displays the navigation bar', () => {
      cy.visit('/galfsda/asfdasdfds/fasdf')

      // Navigation bar
      cy.contains('nav', 'Home')
      cy.contains('nav', 'Gallery')

      // Checking the active link
      cy.get('.nav-link').first().should('not.have.class', 'active')
      cy.get('.nav-link').eq(1).should('not.have.class', 'active')
    })
  })

  describe('When the user clicks on the home link', () => {
    it('redirects to the home page', () => {
      cy.visit('/gallery')

      cy.get('.nav-link').first().click()

      cy.url().should('include', '/')
    })
  })

  describe('When the user clicks on the icon link', () => {
    it('redirects to the home page', () => {
      cy.visit('/gallery')

      cy.get('.navbar-brand').click()

      cy.url().should('include', '/')
    })
  })

  describe('When the user clicks on the gallery link', () => {
    it('redirects to the gallery page', () => {
      cy.visit('/')

      cy.get('.nav-link').eq(1).click()

      cy.url().should('include', '/gallery')
    })
  })
})
