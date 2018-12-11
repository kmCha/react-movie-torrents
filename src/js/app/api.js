import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

export async function getMovieList({ page, tag, search }) {
  return await instance.get('/movies', {
    params: {
      page,
      tag,
      search
    }
  })
}

export async function getTotalCount({ tag, search }) {
  return await instance.get('/totalcount', {
    params: {
      tag,
      search
    }
  })
}

export async function getTagList() {
  return await instance.get('/taglist')
}