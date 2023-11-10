import type { BreedResponse } from '@/entities/Breed'

export const CreateBreedReponse = (): BreedResponse => {
  return {
    weight: {
      imperial: '8 - 15',
      metric: '4 - 7'
    },
    id: 'asho',
    name: 'American Shorthair',
    cfa_url: 'http://cfa.org/Breeds/BreedsAB/AmericanShorthair.aspx',
    vetstreet_url: 'http://www.vetstreet.com/cats/american-shorthair',
    vcahospitals_url: 'https://vcahospitals.com/know-your-pet/cat-breeds/american-shorthair',
    temperament: 'Active, Curious, Easy Going, Playful, Calm',
    origin: 'United States',
    country_codes: 'US',
    country_code: 'US',
    description:
      'The American Shorthair is known for its longevity, robust health, good looks, sweet personality, and amiability with children, dogs, and other pets.',
    life_span: '15 - 17',
    indoor: 0,
    lap: 1,
    alt_names: 'Domestic Shorthair',
    adaptability: 5,
    affection_level: 5,
    child_friendly: 4,
    dog_friendly: 5,
    energy_level: 3,
    grooming: 1,
    health_issues: 3,
    intelligence: 3,
    shedding_level: 3,
    social_needs: 4,
    stranger_friendly: 3,
    vocalisation: 3,
    experimental: 0,
    hairless: 0,
    natural: 1,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: 'https://en.wikipedia.org/wiki/American_Shorthair',
    hypoallergenic: 0,
    reference_image_id: 'JFPROfGtQ'
  }
}
