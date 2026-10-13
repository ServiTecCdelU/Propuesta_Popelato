export const WHATSAPP_NUMBER = '5493442641600'
export const WHATSAPP_DISPLAY = '+54 9 3442 64-1600'
export const PHONE_DISPLAY = '03442-43-3300'
export const PHONE_HREF = 'tel:+543442433300'

export function whatsappUrl(message = 'Hola, quisiera hacer una consulta.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const socials = [
  { name: 'Facebook', handle: '/ropelatoDM', href: 'https://www.facebook.com/ropelatoDM' },
  { name: 'Instagram', handle: '/ropelatodm', href: 'https://www.instagram.com/ropelatodm' },
  { name: 'YouTube', handle: '/RopelatoDM', href: 'https://www.youtube.com/RopelatoDM' },
  { name: 'LinkedIn', handle: '/company/ropelatodm', href: 'https://www.linkedin.com/company/ropelatodm' },
] as const

export const mainNav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Promociones', href: '#promociones' },
  { label: 'Sucursales', href: '#sucursales' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Contacto', href: '#contacto' },
]

export const shopNav = [
  { label: 'Promos bancarias', href: '#promociones' },
  { label: 'Ofertas', href: '#promociones' },
  { label: 'Novedades', href: '#promociones' },
  { label: 'Envío gratis', href: '#tienda' },
]

export const quickCategories = [
  { label: 'Ofertas', icon: 'Tag' },
  { label: 'Chapas', icon: 'Layers' },
  { label: 'Cerámicas y Porcelanatos', icon: 'Grid3x3' },
  { label: 'Ladrillos', icon: 'BrickWall' },
  { label: 'Cemento y Cal', icon: 'Package' },
  { label: 'Hierros', icon: 'Columns3' },
  { label: 'Construcción en seco', icon: 'PanelsTopLeft' },
  { label: 'Sanitarios', icon: 'Bath' },
  { label: 'Alambres', icon: 'Cable' },
  { label: 'Cielorraso', icon: 'LayoutPanelTop' },
  { label: 'Electricidad', icon: 'Zap' },
] as const

export const heroSlides = [
  { image: '/images/hero-1.png', kicker: 'Construcción civil', alt: 'Casa en construcción con paredes de ladrillo al atardecer' },
  { image: '/images/hero-2.png', kicker: 'Tu casa terminada', alt: 'Casa moderna terminada con jardín al anochecer' },
  { image: '/images/hero-3.png', kicker: 'Corralón y acopio', alt: 'Depósito de materiales con ladrillos, cemento y hierros' },
  { image: '/images/cat-bano.png', kicker: 'Baños y sanitarios', alt: 'Baño moderno con bacha de apoyo y grifería negra' },
  { image: '/images/cat-cocina.png', kicker: 'Cocinas y lavaderos', alt: 'Cocina moderna con bacha de acero y mesada de piedra' },
]

export const heroChips = ['Envío gratis en Entre Ríos', 'Hasta 6 cuotas sin interés', 'Retiro en sucursal']

export const stats = [
  { prefix: '+', value: 40, suffix: '', label: 'años de experiencia' },
  { prefix: '', value: 3, suffix: '', label: 'sucursales en Entre Ríos' },
  { prefix: '', value: 26, suffix: ' mil', label: 'seguidores en redes' },
  { prefix: '', value: 6, suffix: '', label: 'cuotas sin interés' },
]

export const marqueeCategories = [
  'Construcción',
  'Terminaciones',
  'Sanitarios',
  'Pinturas',
  'Aberturas',
  'Ferretería',
  'Deco',
]

export const categories = [
  { title: 'Construcción civil', detail: 'Cemento, ladrillos, hierro, chapas y caños', image: '/images/cat-civil.png' },
  { title: 'Construcción en seco y Steel Framing', detail: 'Perfiles, placas y aislantes', image: '/images/cat-seco.png' },
  { title: 'Electricidad', detail: 'Cables, tableros, llaves e iluminación', image: '/images/cat-electricidad.png' },
  { title: 'Sanitarios y grifería', detail: 'Baños, cocinas y lavaderos', image: '/images/cat-bano.png' },
  { title: 'Cerámicos y porcelanatos', detail: 'Pisos y revestimientos', image: '/images/cat-pisos.png' },
  { title: 'Pinturas', detail: 'Látex, esmaltes, impermeabilizantes', image: '/images/cat-pinturas.png' },
  { title: 'Aberturas', detail: 'Puertas y ventanas', image: '/images/cat-aberturas.png' },
  { title: 'Artefactos', detail: 'Cocinas, termotanques y calefacción', image: '/images/cat-artefactos.png' },
  { title: 'Ferretería y herramientas', detail: 'Manuales, eléctricas y accesorios', image: '/images/cat-herramientas.png' },
  { title: 'Patio y exterior', detail: 'Jardín, piletas y decks', image: '/images/cat-patio.png' },
  { title: 'Deco hogar', detail: 'Detalles que hacen tu casa', image: '/images/cat-deco.png' },
]

export const promoCampaigns = [
  { title: 'Rope Week', copy: 'Una semana con los mejores precios del año.', tone: 'lime' },
  { title: 'SALE Ropelato', copy: 'Descuentos en sanitarios, pisos y aberturas.', tone: 'carbon' },
  { title: 'Ofertas', copy: 'Precios especiales que se renuevan cada semana.', tone: 'coral' },
  { title: 'Novedades', copy: 'Lo último en diseño para tu casa.', tone: 'mist' },
  { title: 'Promos bancarias', copy: 'Hasta 6 cuotas sin interés con tu tarjeta.', tone: 'graphite' },
] as const

export type Product = {
  name: string
  category: string
  image: string
  price: number
  listPrice?: number
  tag?: string
}

export const products: Product[] = [
  {
    name: 'Puerta de cedro con marco de cedro 90x15',
    category: 'Aberturas',
    image: '/images/prod-puerta.png',
    listPrice: 421181,
    price: 387487,
  },
  {
    name: 'Bacha Vitta Glaciar Schneider 60 cm',
    category: 'Sanitarios',
    image: '/images/prod-bacha.png',
    price: 340096,
    tag: 'Novedad',
  },
  {
    name: 'Jacuzzi Romana Five Saint 160x75',
    category: 'Baños',
    image: '/images/prod-jacuzzi.png',
    price: 1503355,
    tag: 'Destacado',
  },
  {
    name: 'Porcelanato símil cemento 60x60 (m²)',
    category: 'Pisos',
    image: '/images/cat-pisos.png',
    listPrice: 32990,
    price: 27990,
  },
  {
    name: 'Látex interior premium 20 L',
    category: 'Pinturas',
    image: '/images/cat-pinturas.png',
    listPrice: 129900,
    price: 109900,
  },
]

export const reasons = [
  {
    title: 'Más de 40 años de experiencia',
    copy: 'Acompañamos a familias, constructores y profesionales de Entre Ríos desde hace más de cuatro décadas.',
  },
  {
    title: 'Envío gratis en Entre Ríos y compra online',
    copy: 'Comprá desde tu casa con hasta 6 cuotas sin interés y recibí los materiales en tu obra.',
  },
  {
    title: 'Garantía, servicio técnico y acopio',
    copy: 'Respaldo real post-venta y acopio de materiales para que avances tu obra a tu ritmo.',
  },
]

export const brands = [
  'Ferrum',
  'Roca',
  'Capea',
  'Schneider',
  'Acindar',
  'Knauf',
  'Weber',
  'Sika',
  'Mapei',
  'Loma Negra',
  'Plavicon',
  'Ternium',
]

/** Edit addresses and opening hours here. Coordinates are percentages on the schematic map. */
export const branches = [
  {
    city: 'Concepción del Uruguay',
    label: 'Casa central',
    address: 'Dirección a confirmar 0000',
    hours: 'Lun a Vie 7:30 a 12 y 15 a 19 · Sáb 8 a 12',
    phone: PHONE_DISPLAY,
    x: 83,
    y: 52,
  },
  {
    city: 'Gualeguaychú',
    label: 'Sucursal',
    address: 'Dirección a confirmar 0000',
    hours: 'Lun a Vie 7:30 a 12 y 15 a 19 · Sáb 8 a 12',
    phone: PHONE_DISPLAY,
    x: 76,
    y: 74,
  },
  {
    city: 'Rosario del Tala',
    label: 'Sucursal',
    address: 'Dirección a confirmar 0000',
    hours: 'Lun a Vie 7:30 a 12 y 15 a 19 · Sáb 8 a 12',
    phone: PHONE_DISPLAY,
    x: 55,
    y: 54,
  },
]

export const paymentMethods = [
  'Visa',
  'Mastercard',
  'American Express',
  'Cabal',
  'Naranja',
  'Nativa',
  'Maestro',
  'Mercado Pago',
  'Pago Fácil',
  'Rapipago',
]

export const instagramPosts = [
  { image: '/images/cat-bano.png', alt: 'Baño moderno terminado' },
  { image: '/images/hero-2.png', alt: 'Casa terminada al anochecer' },
  { image: '/images/cat-pisos.png', alt: 'Colocación de porcelanato' },
  { image: '/images/cat-cocina.png', alt: 'Cocina moderna' },
  { image: '/images/cat-patio.png', alt: 'Patio con deck' },
  { image: '/images/cat-deco.png', alt: 'Living decorado' },
]

export function formatARS(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)
}
