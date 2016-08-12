/* global describe, it */
import MiniGallery from '../src/map/mini-gallery'
import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'

describe('<MiniGallery />', () => {
  it('renders a <MiniGallery />', () => {
    const pics = [
      { images: { thumbnail: { url: 'url' } } }
    ]
    const shallowRender = shallow(
      <MiniGallery pics={pics} />
    )
    expect(shallowRender.find('div.mini-gallery').node).toExist()
  })
})
