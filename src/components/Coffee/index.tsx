import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { coffee } from '../../pages/Home'
import { CoffeeCardContainer } from './styles'

interface CoffeeProps {
  key: number
  coffee: coffee
}

export function Coffee({ coffee }: CoffeeProps) {
  return (
    <CoffeeCardContainer>
      <header>
        <img src={coffee.imgUrl} alt="" />
        <div className="type">
          {coffee.type.map((type) => (
            <span key={coffee.id + type}>{type.toUpperCase()}</span>
          ))}
        </div>
      </header>

      <section>
        <strong>{coffee.title}</strong>
        <p>{coffee.subtitle}</p>
      </section>

      <footer>
        <div>
          <span>R$</span>
          <span>{coffee.price.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="amount">
          <button>
            <Minus />
          </button>
          <span>1</span>
          <button>
            <Plus />
          </button>
        </div>

        <span className="shoppingCartOfCard">
          <ShoppingCart weight="fill" />
        </span>
      </footer>
    </CoffeeCardContainer>
  )
}
