import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import {
  CoffeeContainer,
  PackageContainer,
  ShoppingContainer,
  TimerContainer,
} from './styles'

export function ItemsSection() {
  return (
    <>
      <ShoppingContainer>
        <span>
          <ShoppingCart weight="fill" />
        </span>
        Compra simples e segura
      </ShoppingContainer>

      <PackageContainer>
        <span>
          <Package weight="fill" />
        </span>
        Embalagem mantém o café intacto
      </PackageContainer>

      <TimerContainer>
        <span>
          <Timer weight="fill" />
        </span>
        Entrega rápida e rastreada
      </TimerContainer>

      <CoffeeContainer>
        <span>
          <Coffee weight="fill" />
        </span>
        O café chega fresquinho até você
      </CoffeeContainer>
    </>
  )
}
