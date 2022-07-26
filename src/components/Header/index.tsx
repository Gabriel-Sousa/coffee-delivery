import { MapPin, ShoppingCart } from 'phosphor-react'
import logoImg from '../../assets/logo.svg'
import { HeaderContainer, HeaderContent } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <div>
          <span className="location">
            <MapPin size={22} weight="fill" />
            <span>Rio de Janeiro, RJ</span>
          </span>
          <span className="shoppingCart">
            <ShoppingCart size={22} weight="fill" />
          </span>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
