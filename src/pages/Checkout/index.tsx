import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { CheckoutContainer, FormContainer, ItemsSelection } from './styles'

import { useNavigate } from 'react-router-dom'
import { Payment, useCoffee } from '../../hooks/useCoffee'
import { CoffeeCheckout } from '../../components/CoffeeCheckout'
import { useEffect, useState } from 'react'
import { apiCEP } from '../../services/api'

export function Checkout() {
  const navigate = useNavigate()
  const { cart, local, updatedLocal, changePaymentMethod, paymentMethod } =
    useCoffee()
  const [cep, setCEP] = useState(
    local.cep === '' ? '' : local.cep.replace('-', ''),
  )
  const [disabled, setDisabled] = useState(() => {
    if (cep !== '') {
      return false
    } else {
      return true
    }
  })

  useEffect(() => {
    function Trim(strTexto: string) {
      // Substitúi os espaços vazios no inicio e no fim da string por vazio.
      return strTexto.replace(/^\s+|\s+$/g, '')
    }

    // Função para validação de CEP.
    function IsCEP(strCEP: string, blnVazio: string) {
      // Caso o CEP não esteja nesse formato ele é inválido!
      const objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/

      strCEP = Trim(strCEP)
      if (strCEP.length > 0) {
        if (objER.test(strCEP)) {
          return true
        } else {
          return false
        }
      } else {
        return blnVazio
      }
    }

    if (cep !== '' && IsCEP(cep, '')) {
      apiCEP.get(`/${cep}/json/`).then((response) => {
        if (local.start === true) {
          updatedLocal(response.data)
          if (response.data.erro === 'true') {
            updatedLocal({
              logradouro: '',
              bairro: '',
              localidade: '',
              uf: '',
              cep: '',
            })
          }
        }
      })
    }
  }, [cep, updatedLocal, local])

  function handleSuccess() {
    navigate('/success')
  }

  function handleCEP(data: string) {
    setCEP(data)

    local.start = true
  }

  function paymentType(data: Payment) {
    changePaymentMethod(data)
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
                value={cep}
                onChange={(e) => handleCEP(e.target.value)}
                onFocus={() => setDisabled(false)}
              />
              <input
                className="rua"
                type="text"
                placeholder="Rua"
                disabled={disabled}
                value={local.logradouro}
              />
              <input
                className="num"
                type="number"
                placeholder="Número"
                disabled={disabled}
              />
              <input
                className="com"
                type="text"
                placeholder="Complemento"
                disabled={disabled}
              />
              <input
                className="bai"
                type="text"
                placeholder="Bairro"
                disabled={disabled}
                value={local.bairro}
              />
              <input
                className="cid"
                type="text"
                placeholder="Cidade"
                disabled={disabled}
                value={local.localidade}
              />
              <input
                className="uf"
                type="text"
                placeholder="UF"
                disabled={disabled}
                value={local.uf}
              />
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
              <button
                type="button"
                onClick={() => {
                  paymentType({ typeOfPayment: 'creditCard' })
                }}
                className={
                  paymentMethod.typeOfPayment === 'creditCard' ? 'active' : ''
                }
              >
                <span>
                  <CreditCard size={16} />
                </span>
                Cartão de crédito
              </button>
              <button
                type="button"
                onClick={() => {
                  paymentType({ typeOfPayment: 'creditDebit' })
                }}
                className={
                  paymentMethod.typeOfPayment === 'creditDebit' ? 'active' : ''
                }
              >
                <span>
                  <Bank size={16} />
                </span>
                Cartão de débito
              </button>
              <button
                type="button"
                onClick={() => {
                  paymentType({ typeOfPayment: 'money' })
                }}
                className={
                  paymentMethod.typeOfPayment === 'money' ? 'active' : ''
                }
              >
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
        <span className="titleSelect">Cafés selecionados</span>
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
