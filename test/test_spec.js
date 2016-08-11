/* global describe, it */
import expect from 'expect'

describe('A girl', () => {
  const arya = {}

  it('has no name', () => {
    expect(arya.name).toBe(undefined)
  })
})
