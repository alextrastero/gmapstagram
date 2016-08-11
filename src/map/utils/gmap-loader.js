const GMAP_CALLBACK = 'initMap'
const API_KEY = 'AIzaSyCjjHe3-79pylVkIhc8SNrzLIVaNRWv574'
const GMAP_URL = `//maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${GMAP_CALLBACK}`

export default () => {
  return new Promise(resolve => {
    const gmapScript = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = GMAP_URL
      window[GMAP_CALLBACK] = gmapCallback

      document.body.appendChild(script)
    }

    const gmapCallback = () => {
      resolve()
    }

    gmapScript()
  })
}
