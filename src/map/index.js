import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import loadGmap from './utils/gmap-loader'

class Map extends Component {
  constructor (props) {
    super(props)

    this.markers = []
    this.handleMapClick = this.handleMapClick.bind(this)
    this.generateMap = this.generateMap.bind(this)
    this.renderMarkers = this.renderMarkers.bind(this)
  }

  componentWillMount () {
    loadGmap().then(this.generateMap)
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.pics.length !== this.props.pics.length
  }

  renderMarkers () {
    const { pics } = this.props
    this.clearAllMarkers()

    if (!pics.length) return
    const { Marker, LatLng } = window.google.maps

    this.markers = pics.map((pic) => {
      const { latitude, longitude } = pic.location
      return new Marker({
        position: new LatLng(latitude, longitude),
        map: this.myMap
      })
    })
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
    this.renderMarkers()

    return (
      <div style={{height: '100vh'}} ref='gmap' />
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
