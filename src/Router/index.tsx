import { Routes, Route, Navigate } from 'react-router-dom'
import { useCoffee } from '../hooks/useCoffee'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Checkout } from '../pages/Checkout'
import { Home } from '../pages/Home'
import { Success } from '../pages/Success'

export function Router() {
  const { deliveryData } = useCoffee()
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/success"
          element={
            deliveryData.data === undefined ? (
              <Navigate to="/checkout" />
            ) : (
              <Success />
            )
          }
        />
      </Route>
    </Routes>
  )
}
