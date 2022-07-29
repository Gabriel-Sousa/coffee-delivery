import axios from 'axios'

const api = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
})
export const apiCEP = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
})

export default api
