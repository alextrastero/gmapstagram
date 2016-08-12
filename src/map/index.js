import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import MiniGallery from './mini-gallery'
import loadGmap from './utils/gmap-loader'

class Map extends Component {
  constructor (props) {
    super(props)

    this.markers = []
    this.handleMapClick = this.handleMapClick.bind(this)
    this.generateMap = this.generateMap.bind(this)
    this.createMarkers = this.createMarkers.bind(this)
  }

  componentWillMount () {
    loadGmap().then(this.generateMap)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.pics.length !== this.props.pics.length
  }

  createMarkers () {
    const { pics } = this.props
    this.clearAllMarkers()

    if (!pics.length) return
    const { Marker, LatLng, InfoWindow } = window.google.maps

    this.markers = pics.map((pic) => {
      const { latitude, longitude } = pic.location

      // createMarker
      let marker = new Marker({
        position: new LatLng(latitude, longitude),
        map: this.myMap
      })

      // createInfoWindow
      let infowindow = new InfoWindow({
        content: this.renderPicTeaser(pic)
      })
      marker.addListener('click', () => infowindow.open(this.myMap, marker))
      return marker
    })
  }

  renderPicTeaser (pic) {
    return (
      '<div>' +
      `<p>${pic.caption.text}</p>` +
      `<img src=${pic.images.thumbnail.url} width=150 height=150>` +
      '</div>'
    )
  }

  clearAllMarkers () {
    this.markers.forEach((marker) => {
      marker.setMap(null)
    })
  }

  handleMapClick ({ latLng }) {
    this.props.onMapClick(latLng)
  }

  generateMap () {
    const { Map } = window.google.maps
    const { latLng: { lat, lng } } = this.props

    const mapOptions = {
      zoom: 12,
      center: { lat, lng }
    }

    this.myMap = new Map(ReactDOM.findDOMNode(this.refs.gmap), mapOptions)
    this.myMap.addListener('click', this.handleMapClick)
    this.props.onMapLoaded()
  }

  render () {
    const headerStyle = {
      position: 'absolute',
      width: '100%',
      zIndex: 1,
      textAlign: 'center',
      background: 'white',
      padding: '10px 0'
    }

    this.createMarkers()
    return (
      <div>
        <p style={headerStyle}>Click anywhere on the map to see Pictures in a radius of 5km</p>
        <MiniGallery pics={this.props.pics} />
        <div style={{height: '100vh'}} ref='gmap' />
      </div>
    )
  }
}

Map.propTypes = {
  latLng: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onMapClick: PropTypes.func.isRequired,
  onMapLoaded: PropTypes.func.isRequired,
  pics: PropTypes.array
}

export default Map
