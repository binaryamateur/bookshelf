// test.todo('formatDate formats the date to look nice')

const {formatDate} = require('utils/misc')

test('formatDate formats the date to look', () => {
  expect(formatDate(new Date('22 December 2008'))).toBe('Dec 08')
})
