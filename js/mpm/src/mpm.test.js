const path = require('node:path')
const mpm = require('./mpm.js')

describe('mpm.getPinnedReference', () => {
  test('~version', async () => {
    const { name, reference } = await mpm.getPinnedReference({
      name: 'react',
      reference: '~15.3.0',
    })

    expect(name).toBe('react')
    expect(reference).toBe('15.3.2')
  })

  test('version', async () => {
    const { name, reference } = await mpm.getPinnedReference({
      name: 'react',
      reference: '15.3.0',
    })

    expect(name).toBe('react')
    expect(reference).toBe('15.3.0')
  })

  test('not version', async () => {
    const { name, reference } = await mpm.getPinnedReference({
      name: 'react',
      reference: '/tmp/react-15.3.2.tar.gz',
    })

    expect(name).toBe('react')
    expect(reference).toBe('/tmp/react-15.3.2.tar.gz')
  })

  test('not found package', async () => {
    await expect(
      mpm.getPinnedReference({
        name: 'reacttt',
        reference: '~15.3.0',
      })
    ).rejects.toThrowError(new Error('Couldn\'t fetch package "reacttt"'))
  })

  test('not found version', async () => {
    await expect(
      mpm.getPinnedReference({
        name: 'react',
        reference: '~99.0.0',
      })
    ).rejects.toThrowError(
      new Error(
        'Couldn\'t find a version matching "~99.0.0" for package  "react"'
      )
    )
  })
})

describe('mpm.fetchPackage', () => {
  test('react-16.4.0', async () => {
    const buffer = await mpm.fetchPackage({
      name: 'react',
      reference: '16.4.0',
    })

    expect(Buffer.isBuffer(buffer)).toBe(true)
    expect(buffer.length).toBeGreaterThan(255)
  })

  test('local file', async () => {
    const buffer = await mpm.fetchPackage({
      name: 'mpm',
      reference: './src/mpm.js',
    })

    expect(Buffer.isBuffer(buffer)).toBe(true)
    expect(buffer.length).toBeGreaterThan(255)
  })

  test('not found package', async () => {
    await expect(
      mpm.fetchPackage({
        name: 'react',
        reference: '99.0.0',
      })
    ).rejects.toThrow()
  })
})

describe('mpm.getPackageDependencies', () => {
  test('react-16.4.0', async () => {
    const { dependencies, devDependencies } = await mpm.getPackageDependencies({
      name: 'react',
      reference: '16.4.0',
    })

    expect(Array.isArray(dependencies)).toBe(true)
    expect(Array.isArray(devDependencies)).toBe(true)
    expect(dependencies.length).toBeGreaterThan(3)
    expect(devDependencies.length).toBe(0)
  })

  test('semver-5.5.0', async () => {
    const { dependencies, devDependencies } = await mpm.getPackageDependencies({
      name: 'semver',
      reference: '5.5.0',
    })

    expect(Array.isArray(dependencies)).toBe(true)
    expect(Array.isArray(devDependencies)).toBe(true)
    expect(dependencies.length).toBe(0)
    expect(devDependencies.length).toBe(1)
  })
})

describe('mpm.getPackageDependencyTree', () => {
  beforeAll(() => {
    jest.setTimeout(30000)
  })

  afterAll(() => {
    jest.setTimeout(5000)
  })

  test('mpm-0.1.0', async () => {
    const packageDependencies = [
      {
        name: 'semver',
        reference: '5.5.0',
      },
    ]

    const { name, reference, dependencies } =
      await mpm.getPackageDependencyTree({
        name: 'mpm',
        reference: null,
        dependencies: packageDependencies,
      })

    expect(name).toBe('mpm')
    expect(reference).toBe(null)
    expect(Array.isArray(dependencies)).toBe(true)
    expect(dependencies.length).toBe(1)
  })

  test('should skip available package (exact match)', async () => {
    const packageDependencies = [
      {
        name: 'semver',
        reference: '5.5.0',
      },
    ]
    const available = new Map([['semver', '5.5.0']])

    const { name, reference, dependencies } =
      await mpm.getPackageDependencyTree(
        {
          name: 'mpm',
          reference: null,
          dependencies: packageDependencies,
        },
        available
      )

    expect(name).toBe('mpm')
    expect(reference).toBe(null)
    expect(Array.isArray(dependencies)).toBe(true)
    expect(dependencies.length).toBe(0)
  })

  test('should skip available package (semver match)', async () => {
    const packageDependencies = [
      {
        name: 'semver',
        reference: '^5.5.0',
      },
    ]
    const available = new Map([['semver', '5.6.0']])

    const { name, reference, dependencies } =
      await mpm.getPackageDependencyTree(
        {
          name: 'mpm',
          reference: null,
          dependencies: packageDependencies,
        },
        available
      )

    expect(name).toBe('mpm')
    expect(reference).toBe(null)
    expect(Array.isArray(dependencies)).toBe(true)
    expect(dependencies.length).toBe(0)
  })
})

describe('mpm.linkPackages', () => {
  beforeAll(() => {
    jest.setTimeout(60000)
  })

  afterAll(() => {
    jest.setTimeout(5000)
  })

  test('mpm-0.1.0', async () => {
    const packageDependencies = [
      {
        name: 'semver',
        reference: '5.7.0',
      },
    ]

    await expect(
      mpm.linkPackages(
        {
          name: 'mpm',
          reference: null,
          dependencies: packageDependencies,
        },
        path.join(__dirname)
      )
    ).resolves.toBeUndefined()
  })
})
