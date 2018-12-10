import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export async function getMovieList({ page, tag }) {
  return await instance.get('/movies', {
    params: {
      page,
      tag
    }
  })
}

export async function getTotalCount({ tag }) {
  return await instance.get('/totalcount', {
    params: {
      tag
    }
  })
}

export async function getTagList() {
  return await instance.get('/taglist')
}