describe('GalleryCard', () => {
  beforeEach(() => {
    cy.fixture('gallery-cards.json').then((galleryCardsJSON) => {
      this.galleryCards = galleryCardsJSON
    })

    cy.visit('/gallery')
  })

  it('should render', () => {
    cy.get('.row>.flexbox').parent().should('exist')
  })

  it('should render country flag', () => {
    cy.get('img.me-2').should('exist')

    cy.get('img.me-2').invoke('attr', 'src').should('exist')
    cy.get('img.me-2').invoke('attr', 'src').should('include', this.galleryCards[0].country_code)

    cy.get('img.me-2')
      .invoke('attr', 'src')
      .then((src) => {
        cy.request(src as string)
          .its('status')
          .should('eq', 200)
      })
  })

  it('should render breed name', () => {
    cy.get('.text-center').should('contain', this.galleryCards[0].name)
  })

  it('should render lifespan and weigh', () => {
    cy.get('h6').should('contain', 'years')
    cy.get('h6').should('contain', this.galleryCards[0].weight_metric)
    cy.get('h6').should('contain', 'kg')
    cy.get('h6').should('contain', this.galleryCards[0].life_span)
  })

  it('should render breed description', () => {
    cy.get('p').should('contain', this.galleryCards[0].description)
  })

  it('should render wikipidia url', () => {
    cy.get('a.link-secondary').should('exist')

    cy.get('a.link-secondary')
      .invoke('attr', 'href')
      .should('eq', this.galleryCards[0].wikipedia_url)

    cy.get('a.link-secondary')
      .invoke('attr', 'href')
      .then((href) => {
        cy.request(href as string)
          .its('status')
          .should('eq', 200)
      })
  })

  it('should render breed flag', () => {
    cy.get('img.card-img-top').should('exist')

    cy.get('img.card-img-top').invoke('attr', 'src').should('exist')

    cy.get('img.card-img-top')
      .invoke('attr', 'src')
      .then((src) => {
        cy.request(src as string)
          .its('status')
          .should('eq', 200)
      })
  })
})
