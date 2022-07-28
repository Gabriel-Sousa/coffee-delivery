import { ShoppingCart } from 'phosphor-react'
import { CoffeeCardContainer } from './styles'
import { Amount } from '../Amount'
import { useCoffee } from '../../hooks/useCoffee'
import { useState } from 'react'

interface CoffeePropsData {
  id: number
  title: string
  subtitle: string
  type: [string]
  price: number
  stock: number
  imgUrl: string
  amount: number
}

interface CoffeeCompProps {
  coffee: CoffeePropsData
}

export function Coffee({ coffee }: CoffeeCompProps) {
  const { addCoffeeAtCart } = useCoffee()
  const [amount, setAmount] = useState(0)

  function updatedAmount(amountUpdated: number) {
    setAmount(amountUpdated)
  }

  function handleAddCart() {
    addCoffeeAtCart({ amount, coffee })
  }

  return (
    <CoffeeCardContainer>
      <header>
        <img src={coffee.imgUrl} alt="" />
        <div className="type">
          {coffee.type.map((type: string) => (
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
          <span>R$ </span>
          <span>{coffee.price.toFixed(2).replace('.', ',')}</span>
        </div>

        <Amount amount={amount} page={'home'} onUpdatedAmount={updatedAmount} />

        <span className="shoppingCartOfCard" onClick={handleAddCart}>
          <ShoppingCart weight="fill" />
        </span>
      </footer>
    </CoffeeCardContainer>
  )
}
