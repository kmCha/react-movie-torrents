import axios from 'axios'

var apiHost = 'http://35.189.151.61:3000'

if (__DEBUG) {
  apiHost = 'http://localhost:3000'
}

var instance = axios.create({
  baseURL: apiHost,
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