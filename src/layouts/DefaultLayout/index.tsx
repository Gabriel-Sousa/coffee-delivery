// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  // const [local, setLocal] = useState({
  //   logradouro: '',
  //   bairro: '',
  //   localidade: '',
  //   uf: '',
  // } as localProps)
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
