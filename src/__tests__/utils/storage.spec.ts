import { Storage } from "../../utils/storage"

const KEY = 'key'
const KEY2 = 'key2'
const VALUE = 'value'
const VALUE2 = 'value2'
const OBJECT_KEY = 'object'
const OBJECT_VALUE = { key: 'key', key2: 'key2' }

beforeEach(async () => {
  await Storage.clear()
})

afterEach(async () => {
  await Storage.clear()
})

test('should be empty when no values are stored', async () => {
  expect(await Storage.size()).toEqual(0)
})

test('should have size 1 when new item is added', async () => {
  expect(await Storage.size()).toEqual(0)

  await Storage.set(KEY, VALUE)

  expect(await Storage.size()).toEqual(1)
})

test('should not be able to retrieve item if not present', async () => {
  expect(await Storage.get(KEY)).toEqual(null)
})

test('should be able to retrieve stored item', async () => {
  await Storage.set(KEY, VALUE)

  expect(await Storage.get(KEY)).toEqual(VALUE)
})

test('should be able to remove stored item', async () => {
  await Storage.set(KEY, VALUE)

  expect(await Storage.get(KEY)).toEqual(VALUE)

  await Storage.remove(KEY)

  expect(await Storage.get(KEY)).toEqual(null)
})

test('should be able to clear the storage', async () => {
  await Storage.set(KEY, VALUE)
  await Storage.set(KEY2, VALUE2)

  expect(await Storage.size()).toEqual(2)

  await Storage.clear()

  expect(await Storage.size()).toEqual(0)
})

test('should be able get all keys', async () => {
  await Storage.set(KEY, VALUE)
  await Storage.set(KEY2, VALUE2)

  const keys = await Storage.keys()

  expect(keys.length).toEqual(2)
  expect(keys).toContain(KEY)
  expect(keys).toContain(KEY2)
})

test('should be able retrieve stored object', async () => {
  await Storage.set(OBJECT_KEY, JSON.stringify(OBJECT_VALUE))

  const rawObject = await Storage.get(OBJECT_KEY) || ''

  expect(rawObject).not.toEqual(null)
  expect(<typeof OBJECT_VALUE>JSON.parse(rawObject)).toEqual(OBJECT_VALUE)
})
