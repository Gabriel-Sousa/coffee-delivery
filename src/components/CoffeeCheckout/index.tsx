import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { Coffee, useCoffee } from '../../hooks/useCoffee'
import { Amount } from '../Amount'

interface CoffeeCheckoutProps {
  item: Coffee
  key: number
}

export function CoffeeCheckout({ item }: CoffeeCheckoutProps) {
  const { addCoffeeAtCart } = useCoffee()
  const [amount, setAmount] = useState(item.amount)

  function updatedAmount(amountUpdated: number) {
    setAmount(amountUpdated)

    addCoffeeAtCart({ amount: amountUpdated, coffee: item })
  }

  return (
    <div className="item" key={item.id}>
      <img src={item.imgUrl} alt="" />
      <div className="itemBody">
        <span>{item.title}</span>
        <div className="footerItem">
          <Amount
            page={'checkout'}
            amount={amount}
            onUpdatedAmount={updatedAmount}
          />
          <div className="remove">
            <span>
              <Trash />
            </span>
            Remover
          </div>
        </div>
      </div>
      <div className="valueItem">
        R$ {item.price.toFixed(2).replace('.', ',')}
      </div>
    </div>
  )
}
