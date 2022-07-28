import { ShoppingCart } from 'phosphor-react'
import { useState } from 'react'
import { CoffeeCardContainer } from './styles'
import { toast } from 'react-toastify'
import { Amount } from '../Amount'
import { useCoffee } from '../../hooks/useCoffee'

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
  const [amount, setAmount] = useState(0)

  const { addCoffeeAtCart } = useCoffee()

  function handleRemoveItem() {
    if (amount === 0) {
      toast.error('Erro na adição do produto')
      return
    }
    setAmount(amount - 1)
  }
  function handleAddItem() {
    setAmount(amount + 1)
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

        <Amount
          amount={amount}
          onHandleRemoveItem={handleRemoveItem}
          onHandleAddItem={handleAddItem}
        />

        <span className="shoppingCartOfCard" onClick={handleAddCart}>
          <ShoppingCart weight="fill" />
        </span>
      </footer>
    </CoffeeCardContainer>
  )
}
