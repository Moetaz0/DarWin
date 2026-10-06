export type Role = 'landlord' | 'client'

export interface User {
  id: number
  username: string
  email: string
  role: Role
  phone: string
}

export interface Listing {
  id: number
  title: string
  city: string
  rooms: number
  area: number
  price: number
  tour: boolean
  gradient: string
}