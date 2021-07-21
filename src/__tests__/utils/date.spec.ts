import { formatTime, formatToLocaleDateString } from '../../utils/date'

test('should sucessfully format am time', () => {
  const date = new Date()

  date.setHours(9)
  date.setMinutes(5)

  expect(formatTime(date)).toEqual(`09:05 AM`)
})

test('should sucessfully format pm time', () => {
  const date = new Date()

  date.setHours(21)
  date.setMinutes(5)

  expect(formatTime(date)).toEqual(`09:05 PM`)
})

const mockedDate = new Date(2021, 0, 10, 11, 12)

test('should successfully format date with default values', () => {
  expect(formatToLocaleDateString(mockedDate)).toEqual('Sunday, 01/10/2021, 11:12 AM')
})

test('should successfully format date with custom options', () => {
  expect(formatToLocaleDateString(mockedDate, undefined, { weekday: 'short' })).toEqual('Sun')
})
