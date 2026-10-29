export const cafeConfig = {
  name: 'Sozo Café Kebena',
  tagline: 'Good food. Great coffee. Beautiful moments.',
  phone: '+251 911 123 456',
  address: 'Kebena, Addis Ababa, Ethiopia',
  email: 'hello@sozocafe.com',
  openingHours: 'Every day · 8:00 AM – 10:00 PM',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  tiktok: 'https://www.tiktok.com/@sozo.caf.kebena',
  googleMaps: 'https://maps.app.goo.gl/mcDpNdDQXhvbRt7C8',
}
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '251911123456').replace(/\D/g, '')
