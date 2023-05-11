import { Minus, Plus } from 'phosphor-react'
import { toast } from 'react-toastify'
import { Coffee } from '../../hooks/useCoffee'
import { AmountContainer } from './styles'

interface AmountCompProps {
  amount: number
  page: string
  onUpdatedAmount: (value: number) => void
  coffee: Coffee
}

export function Amount({
  amount,
  page,
  onUpdatedAmount,
  coffee,
}: AmountCompProps) {
  function HandleAddItemHome() {
    if (coffee.stock <= amount) {
      toast.error('Quantidade solicitada fora de estoque')
      return
    }
    onUpdatedAmount(amount + 1)
  }
  function HandleRemoveItemHome() {
    if (amount === 0) {
      toast.error('Erro na adição do produto')
      return
    }
    onUpdatedAmount(amount - 1)
  }

  function HandleAddItemCheckout() {
    if (coffee.stock <= coffee.amount) {
      toast.error('Quantidade solicitada fora de estoque')
      return
    }
    onUpdatedAmount(amount + 1)
  }

  function HandleRemoveItemCheckout() {
    if (amount === 1) {
      toast.error('Erro na retirada do produto')
      return
    }
    onUpdatedAmount(amount - 1)
  }

  return (
    <AmountContainer>
      <div className="amount">
        <button
          type="button"
          disabled={page === 'home' ? amount <= 0 : amount <= 1}
          onClick={() =>
            page === 'home'
              ? HandleRemoveItemHome()
              : HandleRemoveItemCheckout()
          }
        >
          <Minus />
        </button>
        <span>{amount}</span>
        <button type="button">
          <Plus
            onClick={() => {
              page === 'home' ? HandleAddItemHome() : HandleAddItemCheckout()
            }}
          />
        </button>
      </div>
    </AmountContainer>
  )
}
