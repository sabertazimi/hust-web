jest.mock('node-fetch')
const fetch = require('node-fetch')
const mpm = require('./mpm.js')
const { getFileName } = require('./utils.js')

describe('utils.getFileName', () => {
  it('should return [null] when [virtualPath] mismatch [entryName]', () => {
    expect(getFileName('/app', 1)).toBe(null)
  })
})

describe('mpm.getPinnedReference', () => {
  it('should throw error when [fetch HTTP 204]', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 204,
      }),
    )

    await expect(
      mpm.getPinnedReference({
        name: 'react',
        reference: '~15.3.0',
      }),
    ).rejects.toThrow(new Error('HTTP 204'))
  })
})
