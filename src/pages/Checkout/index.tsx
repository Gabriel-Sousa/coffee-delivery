import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { CheckoutContainer, FormContainer, ItemsSelection } from './styles'

import { useNavigate } from 'react-router-dom'
import { Payment, useCoffee } from '../../hooks/useCoffee'
import { CoffeeCheckout } from '../../components/CoffeeCheckout'
import { FormEvent, useEffect, useState } from 'react'
import { apiCEP } from '../../services/api'
import { formatPrice } from '../../utils/priceFormatted'

export function Checkout() {
  const navigate = useNavigate()
  const {
    cart,
    local,
    updatedLocal,
    changePaymentMethod,
    paymentMethod,
    updatedDeliveryData,
    resetCoffeeAtCart,
  } = useCoffee()

  const [cep, setCEP] = useState(
    local.cep === '' ? '' : local.cep.replace('-', ''),
  )

  const [rua, setRua] = useState(
    local.logradouro === '' ? '' : local.logradouro,
  )

  const [numero, setNumero] = useState(local.numero === '' ? '' : local.numero)
  const [complemento, setComplemento] = useState(
    local.complemento === '' ? '' : local.complemento,
  )
  const [bairro, setBairro] = useState(local.bairro === '' ? '' : local.bairro)
  const [cidade, setCidade] = useState(
    local.localidade === '' ? '' : local.localidade,
  )
  const [uf, setUf] = useState(local.uf === '' ? '' : local.uf)

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
          updatedLocal({ ...response.data, complemento: '', numero: '' })
          setRua(response.data.logradouro)
          setBairro(response.data.bairro)
          setCidade(response.data.localidade)
          setUf(response.data.uf)

          if (response.data.erro === 'true') {
            updatedLocal({
              logradouro: '',
              bairro: '',
              localidade: '',
              uf: '',
              cep: '',
              complemento: '',
              numero: '',
            })
          }
        }
      })
    }
  }, [cep, updatedLocal, local])

  function handleForm(event: FormEvent) {
    event.preventDefault()

    const data = {
      cep,
      logradouro: rua,
      numero,
      complemento,
      bairro,
      localidade: cidade,
      uf,
    }

    updatedDeliveryData(data)
    resetCoffeeAtCart()
    updatedLocal({
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      cep: '',
      complemento: '',
      numero: '',
    })
    setCEP('')
    setRua('')
    setNumero('')
    setComplemento('')
    setBairro('')
    setCidade('')
    setUf('')
    setDisabled(true)

    navigate('/success')
  }

  function handleCEP(data: string) {
    setCEP(data)

    local.start = true
  }

  function paymentType(data: Payment) {
    changePaymentMethod(data)
  }

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal + product.total
  }, 0)

  return (
    <CheckoutContainer onSubmit={handleForm}>
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
                autoComplete="off"
                className="cep"
                type="number"
                placeholder="CEP"
                value={cep}
                name="cep"
                onChange={(e) => handleCEP(e.target.value)}
                onFocus={() => setDisabled(false)}
              />
              <input
                className="rua"
                autoComplete="off"
                type="text"
                placeholder="Rua"
                disabled={disabled}
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <input
                className="num"
                type="number"
                autoComplete="off"
                placeholder="Número"
                disabled={disabled}
                value={numero}
                onChange={(e) => {
                  updatedLocal({ ...local, numero: String(e.target.value) })
                  setNumero(String(e.target.value))
                }}
              />
              <input
                className="com"
                type="text"
                placeholder="Complemento"
                autoComplete="off"
                name="complemento"
                disabled={disabled}
                value={complemento}
                onChange={(e) => {
                  updatedLocal({
                    ...local,
                    complemento: String(e.target.value),
                  })
                  setComplemento(String(e.target.value))
                }}
              />
              <input
                className="bai"
                type="text"
                placeholder="Bairro"
                name="bairro"
                autoComplete="off"
                disabled={disabled}
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              <input
                className="cid"
                type="text"
                autoComplete="off"
                placeholder="Cidade"
                name="cidade"
                disabled={disabled}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <input
                className="uf"
                type="text"
                autoComplete="off"
                placeholder="UF"
                name="uf"
                disabled={disabled}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
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
              <span>{formatPrice(total)}</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>R$ 3,50</span>
            </div>
            <div>
              <span>Total</span>
              <span>{formatPrice(total + 3.5)}</span>
            </div>
          </div>
          <button type="submit">confirmar pedido</button>
        </div>
      </ItemsSelection>
    </CheckoutContainer>
  )
}
