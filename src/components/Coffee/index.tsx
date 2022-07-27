import { ShoppingCart } from 'phosphor-react'
import { useState } from 'react'
import { coffee } from '../../pages/Home'
import { CoffeeCardContainer } from './styles'
import { toast } from 'react-toastify'
import { Amount } from '../Amount'

interface CoffeeProps {
  coffee: coffee
}

export function Coffee({ coffee }: CoffeeProps) {
  const [itemSelect, setItemSelect] = useState(0)

  function handleRemoveItem() {
    if (itemSelect === 0) {
      toast.error('Erro na adição do produto')
      return
    }
    setItemSelect(itemSelect - 1)
  }
  function handleAddItem() {
    setItemSelect(itemSelect + 1)
  }

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
          <span>R$ </span>
          <span>{coffee.price.toFixed(2).replace('.', ',')}</span>
        </div>

        <Amount
          itemSelect={itemSelect}
          onHandleRemoveItem={handleRemoveItem}
          onHandleAddItem={handleAddItem}
        />

        <span className="shoppingCartOfCard">
          <ShoppingCart weight="fill" />
        </span>
      </footer>
    </CoffeeCardContainer>
  )
}
