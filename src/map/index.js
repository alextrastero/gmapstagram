import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import gmap from './utils/gmap-loader'

class Map extends Component {
  constructor (props) {
    super(props)

    this.init = this.init.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
  }

  componentDidMount () {
    gmap().then(this.init)
  }

  init () {
    const { Map } = window.google.maps
    const { latLng: { lat, lng } } = this.props

    const mapOptions = {
      zoom: 6,
      center: { lat, lng }
    }

    const myMap = new Map(ReactDOM.findDOMNode(this.refs.gmap), mapOptions)
    myMap.addListener('click', this.handleMapClick)
  }

  handleMapClick ({ latLng }) {
    this.props.onMapClick(latLng)
  }

  render () {
    return (
      <div style={{height: '400px'}} ref='gmap' />
    )
  }
}

Map.propTypes = {
  latLng: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onMapClick: PropTypes.func.isRequired
}

export default Map
