import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { CheckoutContainer, FormContainer, ItemsSelection } from './styles'

import { useNavigate } from 'react-router-dom'
import { useCoffee } from '../../hooks/useCoffee'
import { CoffeeCheckout } from '../../components/CoffeeCheckout'

export function Checkout() {
  const navigate = useNavigate()
  const { cart } = useCoffee()

  function handleSuccess() {
    navigate('/success')
  }

  return (
    <CheckoutContainer>
      <div>
        <span className="titleComplete">Complete seu pedido</span>
        <FormContainer>
          <div className="containerForm">
            <div className="headerForm">
              <span className="mapPin">
                <MapPin size={22} />
              </span>
              <div className="formTitle">
                <span>Endereço de Entrega</span>
                <span>Informe o endereço onde deseja receber seu pedido</span>
              </div>
            </div>

            <div className="inputGrid">
              <input
                className="cep"
                type="number"
                placeholder="CEP"
                autoFocus
                min={0}
              />
              <input className="rua" type="text" placeholder="Rua" disabled />
              <input
                className="num"
                type="number"
                placeholder="Número"
                disabled
              />
              <input
                className="com"
                type="text"
                placeholder="Complemento"
                disabled
              />
              <input
                className="bai"
                type="text"
                placeholder="Bairro"
                disabled
              />
              <input
                className="cid"
                type="text"
                placeholder="Cidade"
                disabled
              />
              <input className="uf" type="text" placeholder="UF" disabled />
            </div>
          </div>

          <div className="paymentMethod">
            <div className="headerPayment">
              <span className="currency">
                <CurrencyDollar size={22} />
              </span>
              <div>
                <span className="paymentTitle">Pagamento</span>
                <span className="paymentSubTitle">
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </span>
              </div>
            </div>

            <div className="btn-payment">
              <button type="button" className="active">
                <span>
                  <CreditCard size={16} />
                </span>
                Cartão de crédito
              </button>
              <button type="button">
                <span>
                  <Bank size={16} />
                </span>
                Cartão de débito
              </button>
              <button type="button">
                <span>
                  <Money size={16} />
                </span>
                Dinheiro
              </button>
            </div>
          </div>
        </FormContainer>
      </div>

      <ItemsSelection>
        <span>Cafés selecionados</span>
        <div className="itemSelect">
          {cart.map((item) => (
            <CoffeeCheckout key={item.id} item={item} />
          ))}

          <div className="total">
            <div>
              <span>Total de itens</span>
              <span>R$ 29,70</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>R$ 3,50</span>
            </div>
            <div>
              <span>Total</span>
              <span>R$ 33,20</span>
            </div>
          </div>
          <button type="submit" onClick={handleSuccess}>
            confirmar pedido
          </button>
        </div>
      </ItemsSelection>
    </CheckoutContainer>
  )
}
