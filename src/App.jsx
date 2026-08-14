import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import VehicleDetail from './pages/VehicleDetail'

export default function App() {
  const [view, setView] = useState('dashboard')
  return view === 'detail' ? <VehicleDetail onBack={() => setView('dashboard')} /> : <Dashboard onOpenVehicle={() => setView('detail')} />
}
