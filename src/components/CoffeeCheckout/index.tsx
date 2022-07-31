import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { Coffee, useCoffee } from '../../hooks/useCoffee'
import { Amount } from '../Amount'
import { CoffeeCheckoutContainer } from './styles'

interface CoffeeCheckoutProps {
  item: Coffee
  key: number
}

export function CoffeeCheckout({ item }: CoffeeCheckoutProps) {
  const coffeeCheckoutData = { ...item }
  const { addCoffeeAtCart, removeCoffeeAtCart } = useCoffee()
  const [amount, setAmount] = useState(coffeeCheckoutData.amount)

  function updatedAmount(amountUpdated: number) {
    setAmount(amountUpdated)

    addCoffeeAtCart({ amount: amountUpdated, coffee: coffeeCheckoutData })
  }

  function handleRemove(id: number) {
    removeCoffeeAtCart(id)
  }

  return (
    <CoffeeCheckoutContainer>
      <div className="item" key={coffeeCheckoutData.id}>
        <img src={coffeeCheckoutData.imgUrl} alt="" />
        <div className="itemBody">
          <span>{coffeeCheckoutData.title}</span>
          <div className="footerItem">
            <Amount
              page={'checkout'}
              amount={amount}
              onUpdatedAmount={updatedAmount}
              coffee={coffeeCheckoutData}
            />
            <button
              className="remove"
              type="button"
              onClick={() => handleRemove(coffeeCheckoutData.id)}
            >
              <span>
                <Trash />
              </span>
              Remover
            </button>
          </div>
        </div>
        <div className="valueItem">{item.formattedTotal}</div>
      </div>
    </CoffeeCheckoutContainer>
  )
}
