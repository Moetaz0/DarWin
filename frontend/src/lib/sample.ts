import type { Listing } from '@/types'

const g = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`

// Placeholder data until the listings API exists.
export const sampleListings: Listing[] = [
  { id: 1, title: 'Sea-view villa', city: 'La Marsa', rooms: 4, area: 220, price: 2800, tour: true, gradient: g('#0e4a5a', '#67e8f9') },
  { id: 2, title: 'Modern apartment', city: 'Tunis', rooms: 2, area: 85, price: 1100, tour: true, gradient: g('#11233a', '#19b5a5') },
  { id: 3, title: 'Blue-door house', city: 'Sidi Bou Said', rooms: 3, area: 140, price: 1900, tour: false, gradient: g('#19b5a5', '#f4efe6') },
  { id: 4, title: 'Cozy studio', city: 'Ariana', rooms: 1, area: 40, price: 650, tour: true, gradient: g('#0b1726', '#19b5a5') },
  { id: 5, title: 'Family flat', city: 'Sousse', rooms: 3, area: 110, price: 900, tour: false, gradient: g('#0e4a5a', '#f4efe6') },
  { id: 6, title: 'Garden duplex', city: 'Hammamet', rooms: 4, area: 180, price: 1700, tour: true, gradient: g('#67e8f9', '#0b1726') },
]