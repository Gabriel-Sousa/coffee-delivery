import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { useCoffee } from '../../hooks/useCoffee'
import { HeaderContainer, HeaderContent } from './styles'

// interface LocalProps {
//   state: string
//   uf: string
// }

export function Header() {
  const { local } = useCoffee()

  function whereState() {
    if (local.localidade === '' || undefined) {
      return ''
    } else {
      if (local.bairro === '') {
        return local.localidade + ', ' + local.uf.split('-', 2)[1]
      } else {
        return local.localidade + ', ' + local.uf
      }
    }
  }

  const localModify = whereState()

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to={'/'}>
          <img src={logoImg} alt="" />
        </Link>
        <div>
          <span className="location">
            <MapPin size={22} weight="fill" />
            <span>{localModify}</span>
          </span>
          <Link to={'/checkout'} className="shoppingCart">
            <ShoppingCart size={22} weight="fill" />
          </Link>
          <span className="amountCart"></span>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
