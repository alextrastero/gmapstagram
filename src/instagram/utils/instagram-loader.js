import reqwest from 'reqwest'

const buildLocationUrl = (token, { lat, lng }) => {
  return `https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&access_token=${token}`
}

const getConfig = (url) => {
  return {
    type: 'jsonp',
    url
  }
}

export default (token, locationId) => {
  return new Promise((resolve, reject) => {
    reqwest(getConfig(buildLocationUrl(token, locationId)))
      .then((data) => {
        resolve(data)
      })
  })
}
