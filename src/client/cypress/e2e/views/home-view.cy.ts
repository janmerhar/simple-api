describe('Home Page', () => {
  describe('When the user visits the home page', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('displays 9 cards', () => {
      cy.get('.card').should('have.length', 9)
    })

    it('displays the page in pagination', () => {
      cy.get('.pagination').should('exist')
      cy.get('.page-item.active>a').contains('1')
    })

    it('displays the next page on clicking next button', () => {
      cy.get('[aria-label="Next"]').click()

      cy.url().should('include', '/2')
    })
  })

  describe('When the user visits the middle page', () => {
    beforeEach(() => {
      cy.visit('/2')
    })

    it('displays 9 cards', () => {
      cy.get('.card').should('have.length', 9)
    })

    it('displays the page in pagination', () => {
      cy.get('.pagination').should('exist')
      cy.get('.page-item.active>a').contains('2')
    })

    it('displays the next page on clicking next button', () => {
      cy.get('[aria-label="Next"]').click()

      cy.url().should('include', '/3')
    })

    it('displays the next page on clicking previou button', () => {
      cy.get('[aria-label="Previous"]').click()

      cy.url().should('include', '/1')
    })
  })

  describe('When the user visits the last page', () => {
    beforeEach(() => {
      cy.visit('/8')
    })

    it('displays 4 cards', () => {
      cy.get('.card').should('have.length', 4)
    })

    it('displays the page in pagination', () => {
      cy.get('.pagination').should('exist')
      cy.get('.page-item.active>a').contains('8')
    })

    it('displays the previous page on clicking previous button', () => {
      cy.get('[aria-label="Previous"]').click()

      cy.url().should('include', '/7')
    })
  })

  describe('When the user visits the page that does not exist', () => {
    beforeEach(() => {
      cy.visit('/9')
    })

    it('displays no breeds found', () => {
      cy.get('h3.text-center').contains('No breeds found')
    })
  })

  describe('When the user searches for a breed', () => {
    beforeEach(() => {
      cy.visit('/9')

      cy.get('input').type('coon')
      cy.contains('button', 'Search').click()
    })

    it('displays found breed', () => {
      cy.contains('.title-spacing', 'Maine Coon')
    })

    it('should not display pagination', () => {
      cy.get('.pagination').should('not.exist')
    })

    it('displays url without pagination', () => {
      cy.url().should('not.include', '9')
    })
  })
})
