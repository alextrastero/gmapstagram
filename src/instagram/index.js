import React, { Component, PropTypes } from 'react'
import instagramLoader from './utils/instagram-loader'

import { ACCESS_TOKEN, AUTH_URL } from './utils/config'

class Instagram extends Component {
  constructor (props) {
    super(props)

    this.init = this.init.bind(this)
    this.token = this.getUrlToken()
  }

  componentWillMount () {
    const { onLogin } = this.props

    if (this.token) onLogin()
  }

  componentDidMount () {
    const { auth, position } = this.props

    if (!auth) return

    instagramLoader(this.token, position).then(this.init)
  }

  componentWillReceiveProps ({ position }) {
    instagramLoader(this.token, position).then(this.init)
  }

  init ({ data }) {
    const { lat, lng } = this.props.position

    if (!data.length) {
      console.log('No pictures for this location', lat, lng)
    }
  }

  getUrlToken () {
    const { hash } = window.location
    const parsed = hash.substring(1).split('=')

    return parsed[0] === ACCESS_TOKEN && parsed[1]
  }

  renderLogin () {
    if (this.props.auth) return

    return (
      <div>
        <p>You need to login to instagram to view</p>
        <a href={AUTH_URL}>Login</a>
      </div>
    )
  }

  render () {
    const { pictures } = this.props

    return (
      <div>
        {
          pictures.map((pic) => {
            return <img src={pic.url} />
          })
        }
        {this.renderLogin()}
      </div>
    )
  }
}

Instagram.propTypes = {
  auth: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

export default Instagram
