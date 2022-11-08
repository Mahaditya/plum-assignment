import test from 'ava'

import { isValidDateOfBirth, isValidEmailAddress, isValidName } from './utils'

test('Email Validity Check', (t) => {
  t.is(isValidEmailAddress('mahadityakaushik@gmail.com'), true)
  t.is(isValidEmailAddress('@mail.com'), false)
})

test('Date of Birth Validity', (t) => {
  t.is(isValidDateOfBirth('01/09/1998'), true)
  t.is(isValidDateOfBirth('13/08/199'), true)
  t.is(isValidDateOfBirth('01/13/1994'), false)
  t.is(isValidDateOfBirth('133/09/1009'), false)
  t.is(isValidDateOfBirth(''), false)
})

test('Name Validity', (t) => {
  t.is(isValidName('Mahaditya'), true)
  t.is(isValidName('1344'), false)
  t.is(isValidName('as'), false)
  t.is(isValidName('abC'), true)
})
