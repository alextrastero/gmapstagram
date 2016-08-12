import React, { Component } from 'react'
import Map from './map'

import { getUrlToken, loadInstagram, AUTH_URL } from './utils'

class App extends Component {
  constructor (props) {
    super(props)

    this.token = getUrlToken()
    this.state = {
      auth: !!this.token,
      latLng: { // Berlin
        lat: 52.5151335,
        lng: 13.4087289
      },
      mapLoaded: false,
      instagramLoaded: false,
      pics: []
    }

    this.handleMapClicked = this.handleMapClicked.bind(this)
    this.handleMapLoaded = this.handleMapLoaded.bind(this)
    this.handleInstagramLoaded = this.handleInstagramLoaded.bind(this)
  }

  handleMapLoaded () {
    this.setState({
      mapLoaded: true
    })
  }

  handleInstagramLoaded ({ data }) {
    this.setState({
      instagramLoaded: true,
      pics: data
    })
  }

  handleMapClicked ({ lat, lng }) {
    this.setState({
      latLng: {
        lat: lat(),
        lng: lng()
      },
      instagramLoaded: false
    })
  }

  renderLogin () {
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 4,
      backgroundColor: 'rgba(0,0,0,.8)'
    }

    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      padding: '20px',
      textAlign: 'center',
      zIndex: '3',
      overflow: 'auto',
      width: '300px',
      margin: '-40px 0 0 -200px',
      backgroundColor: '#eeeeee',
      border: '1px solid #333',
      borderRadius: '4px',
      backgroundClip: 'padding-box'
    }

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <p>You need to login to instagram to view</p>
          <a href={AUTH_URL}>Login</a>
        </div>
      </div>
    )
  }

  renderInstagram () {
    const { auth, latLng, instagramLoaded, mapLoaded } = this.state

    if (!auth) return this.renderLogin()

    if (mapLoaded && !instagramLoaded) {
      loadInstagram(this.token, latLng).then(this.handleInstagramLoaded)
    }
  }

  render () {
    const { latLng, pics } = this.state

    return (
      <div>
        <Map
          latLng={latLng}
          onMapClick={this.handleMapClicked}
          onMapLoaded={this.handleMapLoaded}
          pics={pics}
        />
        {this.renderInstagram()}
      </div>
    )
  }
}

export default App
