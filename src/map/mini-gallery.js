import React, { PropTypes } from 'react'

const style = {
  position: 'absolute',
  bottom: 0,
  zIndex: 1,
  width: '100%',
  padding: '10px 0',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const MiniGallery = ({ pics }) =>
  <div style={style}>
    {
      pics.map((pic, idx) =>
        <div key={`pic-${idx}`} style={{marginRight: '10px'}}>
          <img src={pic.images.thumbnail.url} />
        </div>
      )
    }
  </div>

MiniGallery.propTypes = {
  pics: PropTypes.array.isRequired
}

export default MiniGallery
