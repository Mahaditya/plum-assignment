import { isValid, parse } from 'date-fns'

export function isValidEmailAddress(email: string) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  )
}

export const isValidDateOfBirth = (dob: string) => {
  if (!dob) {
    return false
  }
  try {
    const date = parse(dob, 'dd/MM/yyyy', new Date())
    if (!isValid(date)) {
      throw new Error('Invalid Date')
    }
    return true
  } catch (err) {
    return false
  }
}

export const isValidName = (name: string) => {
  if (!name) {
    return false
  }

  const alphabetCount = [...name].reduce((count, character) => {
    if (character >= 'a' && character <= 'z') {
      return count + 1
    }
    if (character > 'A' && character <= 'Z') {
      return count + 1
    }
    return count
  }, 0)

  return alphabetCount >= 3
}

export const isValidGender = (gender: string) => {
  if (!gender) {
    return false
  }
  return ['Male', 'Female', 'Other'].includes(gender)
}
