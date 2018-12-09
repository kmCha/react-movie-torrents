import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export async function getMovieList({ page }) {
  return await instance.get('/movies', {
    params: {
      page: page
    }
  })
}

export async function getTotalCount() {
  return await instance.get('/totalcount')
}