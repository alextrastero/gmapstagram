import reqwest from 'reqwest'

const buildLocationUrl = (token, { lat, lng }) => {
  return `https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&access_token=${OTHER}&distance=15000`
}

const getConfig = (url) => {
  return {
    type: 'jsonp',
    url
  }
}

export const loadInstagram = (token, locationId) => {
  return new Promise((resolve, reject) => {
    reqwest(getConfig(buildLocationUrl(token, locationId)))
      .then((data) => {
        resolve(data)
      })
  })
}

const CLIENT_ID = '9c902689248943e2a7e1d63ee05e6635'
const REDIRECT_URL = 'http://localhost:8080'

export const OTHER = '344409158.9c90268.1e18813245de4129850596724634099d'
export const ACCESS_TOKEN = 'access_token'
export const AUTH_URL = `//api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&scope=public_content`

export const getUrlToken = () => {
  const { hash } = window.location
  const parsed = hash.substring(1).split('=')

  return parsed[0] === ACCESS_TOKEN && parsed[1]
}
