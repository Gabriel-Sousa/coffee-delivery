import axios from 'axios'

const api = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/',
})

export default api
