import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const fallbackVehicles = [
  { id: 'demo-bmw', brand: 'BMW', model: 'X5 xDrive', year: 2024, price: 84900, currency: 'USD', mileage: 0, transmission: 'Automático', status: 'available', cover_image_url: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=80' },
  { id: 'demo-mercedes', brand: 'Mercedes-Benz', model: 'GLC 300', year: 2023, price: 67500, currency: 'USD', mileage: 0, transmission: 'Automático', status: 'available', cover_image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80' },
  { id: 'demo-porsche', brand: 'Porsche', model: 'Macan', year: 2022, price: 71900, currency: 'USD', mileage: 0, transmission: 'Automático', status: 'reserved', cover_image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80' }
]

export default function Dashboard({ onOpenVehicle }) {
  const [vehicles, setVehicles] = useState(fallbackVehicles)
  const [message, setMessage] = useState('Cargando inventario…')

  useEffect(() => {
    if (!supabase) { setMessage('Modo demostración: agregá tus credenciales de Supabase para conectar el inventario.'); return }
    supabase.from('vehicles').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (error) { setMessage('No se pudo leer Supabase; se muestran vehículos de ejemplo.'); return }
      setVehicles(data?.length ? data : fallbackVehicles)
      setMessage(data?.length ? 'Inventario conectado a Supabase.' : 'No hay vehículos aún; se muestran ejemplos.')
    })
  }, [])

  return <main className="app-shell"><aside><div className="brand">AUTO<span>VISION</span><small>AI V4</small></div><nav><a className="active">Resumen</a><a>Vehículos</a><a>Consultas</a><a>Reservas</a><a>Configuración</a></nav><div className="profile">Administrador<br/><small>Panel de control</small></div></aside><section className="content"><header><div><p className="eyebrow">PANEL DE ADMINISTRACIÓN</p><h1>Buenos días, Alan</h1><p className="muted">{message}</p></div><button>+ Añadir vehículo</button></header><div className="metrics"><Metric label="Vehículos publicados" value={String(vehicles.length).padStart(2, '0')} change="Inventario actual"/><Metric label="Consultas nuevas" value="18" change="+12% vs. semana anterior"/><Metric label="Reservas activas" value={String(vehicles.filter(v => v.status === 'reserved').length).padStart(2, '0')} change="Requieren atención"/></div><div className="section-heading"><div><h2>Inventario reciente</h2><p className="muted">Vehículos publicados en AutoVision</p></div><a>Ver todos →</a></div><div className="grid">{vehicles.map((v) => <article className="vehicle" key={v.id} onClick={() => onOpenVehicle(v)}><img src={v.cover_image_url || fallbackVehicles[0].cover_image_url} alt={`${v.brand} ${v.model}`}/><div className="vehicle-info"><span className={v.status === 'reserved' ? 'status reserved' : 'status'}>{v.status === 'reserved' ? 'Reservado' : 'Disponible'}</span><h3>{v.brand} {v.model}</h3><p>{v.year} · {v.transmission || 'Automático'} · {Number(v.mileage).toLocaleString('es-UY')} km</p><strong>{v.currency || 'USD'} {Number(v.price).toLocaleString('es-UY')}</strong></div></article>)}</div></section></main>
}
function Metric({ label, value, change }) { return <article className="metric"><p>{label}</p><strong>{value}</strong><small>{change}</small></article> }
