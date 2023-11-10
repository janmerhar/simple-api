import type { AxiosInstance } from 'axios'

export type Weight = {
  imperial: string
  metric: string
}

export interface BreedResponse {
  weight: Weight
  id: string
  name: string
  cfa_url: string
  vetstreet_url: string
  vcahospitals_url: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap: number
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url: string
  hypoallergenic: number
  reference_image_id?: string
}

export type ImageResponse = {
  id: string
  url: string
  breeds: BreedResponse[]
  width: number
  height: number
}

export class Breed
  implements
    Pick<
      BreedResponse,
      'name' | 'origin' | 'life_span' | 'description' | 'wikipedia_url' | 'reference_image_id'
    >
{
  name: string
  origin: string
  weight_metric: string
  life_span: string
  description: string
  wikipedia_url: string
  reference_image_id?: string

  constructor(breedResponse: BreedResponse) {
    this.name = breedResponse.name
    this.origin = breedResponse.origin
    this.weight_metric = breedResponse.weight.metric
    this.life_span = breedResponse.life_span
    this.description = breedResponse.description
    this.wikipedia_url = breedResponse.wikipedia_url

    // Checking if the image of this breed exists
    if (breedResponse.reference_image_id) {
      this.reference_image_id = breedResponse.reference_image_id
    }
  }
}
