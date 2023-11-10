import type { ImageResponse } from '@/entities/Breed'
import { CreateBreedReponse } from './create-breed-response.stub'

export const CreateImageReponse = (): ImageResponse => {
  return {
    id: 'JFPROfGtQ',
    url: 'https://cdn2.thecatapi.com/images/JFPROfGtQ.jpg',
    breeds: Array.from({ length: 5 }, () => CreateBreedReponse()),
    width: 1600,
    height: 1200
  }
}
