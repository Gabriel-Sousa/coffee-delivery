import { Minus, Plus } from 'phosphor-react'
import { AmountContainer } from './styles'

// interface AmountProps {
//   itemSelect: number
//   onHandleRemoveItem: () => void
//   onHandleAddItem: () => void
// }

export function Amount() {
  return (
    <AmountContainer>
      <div className="amount">
        <button disabled>
          <Minus />
        </button>
        <span>{0}</span>
        <button>
          <Plus />
        </button>
      </div>
    </AmountContainer>
  )
}
