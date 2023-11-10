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

    it('should create a new Breed instance from a BreedResponse without an image', () => {
      const breedResponse = CreateBreedNoImageReponse()
      const breed = new Breed(breedResponse)

      expect(breed.name).toEqual(breedResponse.name)
      expect(breed.origin).toEqual(breedResponse.origin)
      expect(breed.weight_metric).toEqual(breedResponse.weight.metric)
      expect(breed.life_span).toEqual(breedResponse.life_span)
      expect(breed.description).toEqual(breedResponse.description)
      expect(breed.wikipedia_url).toEqual(breedResponse.wikipedia_url)
      expect(breed.reference_image_id).toBeUndefined()
    })
  })

  describe('fetchAll', () => {
    it('should fetch a list of breeds from the API and return an array of Breed instances', async () => {
      const breedsData = Array.from({ length: 5 }, () => CreateBreedReponse())
      // @ts-ignore
      axios.get.mockResolvedValueOnce({ data: breedsData })

      const breeds = await Breed.fetchAll(axios)

      expect(breeds).toHaveLength(5)

      for (let i = 0; i < breeds.length; i++) {
        expect(breeds[i]).toBeInstanceOf(Breed)

        expect(breeds[i].name).toBe(breedsData[i].name)
        expect(breeds[i].origin).toBe(breedsData[i].origin)
        expect(breeds[i].weight_metric).toBe(breedsData[i].weight.metric)
        expect(breeds[i].life_span).toBe(breedsData[i].life_span)
        expect(breeds[i].description).toBe(breedsData[i].description)
        expect(breeds[i].wikipedia_url).toBe(breedsData[i].wikipedia_url)
      }
    })
  })
})
