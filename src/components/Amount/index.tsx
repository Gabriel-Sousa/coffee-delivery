import { Minus, Plus } from 'phosphor-react'
import { AmountContainer } from './styles'

interface AmountProps {
  amount: number
  onHandleRemoveItem: () => void
  onHandleAddItem: () => void
}

export function Amount({
  amount,
  onHandleRemoveItem,
  onHandleAddItem,
}: AmountProps) {
  return (
    <AmountContainer>
      <div className="amount">
        <button
          onClick={() => {
            onHandleRemoveItem()
          }}
        >
          <Minus />
        </button>
        <span>{amount}</span>
        <button>
          <Plus
            onClick={() => {
              onHandleAddItem()
            }}
          />
        </button>
      </div>
    </AmountContainer>
  )
}
