import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RestaurantPage } from './pages/RestaurantPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
    </Routes>
  )
}

export default App
