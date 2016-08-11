import React, { Component } from 'react'
import Map from './map'
import Instagram from './instagram'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      auth: false,
      latLng: {
        lat: 65.0061203,
        lng: -18.5298597
      },
      pictures: []
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleMapClicked = this.handleMapClicked.bind(this)
    this.handlePicturesLoaded = this.handlePicturesLoaded.bind(this)
  }

  handleLogin () {
    this.setState({
      auth: true
    })
  }

  handleMapClicked ({ lat, lng }) {
    this.setState({
      latLng: {
        lat: lat(),
        lng: lng()
      }
    })
  }

  handlePicturesLoaded ({ data }) {
    this.setState({
      pictures: data
    })
  }

  render () {
    const { auth, latLng, pictures } = this.state

    return (
      <div>
        <Map
          latLng={latLng}
          onMapClick={this.handleMapClicked}
        />
        <Instagram
          auth={auth}
          onLogin={this.handleLogin}
          onPicturesLoaded={this.handlePicturesLoaded}
          pictures={pictures}
          position={latLng}
        />
      </div>
    )
  }
}

export default App
