describe('Pagination Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have a pagination component', () => {
    cy.get('.pagination').should('exist')
  })

  it("should have a 'Previous' button", () => {
    cy.get('[aria-label="Previous"]').should('exist')
  })

  it("should have a 'Next' button", () => {
    cy.get('[aria-label="Next"]').should('exist')
  })

  it("should have 'Previous' button disabled on first page", () => {
    cy.get('[aria-label="Previous"]').should('have.class', 'disabled')
  })
  it("should have 'Next' button disabled on last page", () => {
    cy.get('li.page-item>a.page-link').eq(8).click()
    cy.get('[aria-label="Next"]').should('have.class', 'disabled')
  })

  it("should have 'Previous' and 'Next' button availble on the middle page", () => {
    cy.visit('/2')

    cy.get('[aria-label="Previous"]').should('not.have.class', 'disabled')
    cy.get('[aria-label="Next"]').should('not.have.class', 'disabled')
  })

  it('should not be rendered on when searching for a breed', () => {
    cy.get('input').type('test')
    cy.contains('button', 'Search').click()

    cy.get('.pagination').should('not.exist')
  })

  it("should update url parameter when clicking on 'Next' button", () => {
    cy.get('[aria-label="Next"]').click()

    cy.url().should('include', '2')
  })

  it("should update url parameter when clicking on 'Previous' button", () => {
    cy.visit('/2')

    cy.get('[aria-label="Previous"]').click()

    cy.url().should('include', '1')
  })

  it('should update url parameter when clicking on any page number', () => {
    cy.get('li.page-item>a.page-link').eq(2).click()

    cy.url().should('include', '2')
  })
})
