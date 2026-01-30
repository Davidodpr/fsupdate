import { string } from 'yup'

export const emailString = string().email().required()
