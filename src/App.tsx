import { Route, Routes } from 'react-router-dom'
import { HotelPage } from './pages/HotelPage'
import { HomePage } from './pages/HomePage'
import { RestaurantPage } from './pages/RestaurantPage'
import { RoomsPage } from './pages/RoomsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hotel" element={<HotelPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
    </Routes>
  )
}

export default App
