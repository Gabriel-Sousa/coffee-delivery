import { MapPin, ShoppingCart } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import { HeaderContainer, HeaderContent } from './styles'

interface LocalProps {
  state: string
  uf: string
}

export function Header() {
  const [local, setLocal] = useState<LocalProps>({
    state: '',
    uf: '',
  } as LocalProps)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((data) => {
        api
          .get(
            `/reverse?lat=${data.coords.latitude}&lon=${data.coords.longitude}&format=json`,
          )
          .then((response) =>
            setLocal({
              ...response.data.address,
              uf: response.data.address['ISO3166-2-lvl4'],
            }),
          )
      })
    } else {
      alert('Erro, seu navegador não suporta o serviço de geolocalização.')
    }
  }, [])

  function whereState() {
    if (local.state === '' || undefined) {
      return ''
    } else {
      return local.state + ', ' + local.uf.split('-', 2)[1]
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
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
