import { describe, expect, vi, beforeEach, it } from 'vitest'
import { Breed } from '../Breed'

import { CreateBreedReponse } from './create-breed-response.stub'
import { CreateImageReponse } from './create-image-response.stub'
import { CreateBreedNoImageReponse } from './create-breed-no-image-response.stub'

import axios, { type AxiosResponse } from 'axios'

vi.mock('axios')

describe('Breed', () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockReset()
  })

  describe('constructor', () => {
    it('should create a new Breed instance from a BreedResponse with an image', () => {
      const breedResponse = CreateBreedReponse()
      const breed = new Breed(breedResponse)

      expect(breed.name).toEqual(breedResponse.name)
      expect(breed.origin).toEqual(breedResponse.origin)
      expect(breed.weight_metric).toEqual(breedResponse.weight.metric)
      expect(breed.life_span).toEqual(breedResponse.life_span)
      expect(breed.description).toEqual(breedResponse.description)
      expect(breed.wikipedia_url).toEqual(breedResponse.wikipedia_url)
      expect(breed.reference_image_id).toEqual(breedResponse.reference_image_id)
    })
})
