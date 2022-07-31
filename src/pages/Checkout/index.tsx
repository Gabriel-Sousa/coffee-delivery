import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { CheckoutContainer, FormContainer, ItemsSelection } from './styles'

import { useNavigate } from 'react-router-dom'
import { Payment, useCoffee } from '../../hooks/useCoffee'
import { CoffeeCheckout } from '../../components/CoffeeCheckout'
import { FormEvent, useEffect, useState } from 'react'
import { apiCEP } from '../../services/api'
import { formatPrice } from '../../utils/priceFormatted'
import { toast } from 'react-toastify'

export function Checkout() {
  const {
    cart,
    changePaymentMethod,
    paymentMethod,
    updatedLocal,
    local,
    updatedDeliveryData,
  } = useCoffee()
  const navigate = useNavigate()

  const [cep, setCEP] = useState(local.cep !== '' ? local.cep : '')
  const [street, setStreet] = useState(local.street !== '' ? local.street : '')
  const [number, setNumber] = useState(local.number !== '' ? local.number : '')
  const [complement, setComplement] = useState(
    local.complement !== '' ? local.complement : '',
  )
  const [district, setDistrict] = useState(
    local.district !== '' ? local.district : '',
  )
  const [city, setCity] = useState(local.city !== '' ? local.city : '')
  const [uf, setUF] = useState(local.uf !== '' ? local.uf : '')
  const [cityHeader, setCityHeader] = useState(
    local.city !== '' ? local.city : '',
  )
  const [ufHeader, setUfHeader] = useState(local.uf !== '' ? local.uf : '')
  const [disabled, setDisabled] = useState(
    !(
      cep.length > 0 &&
      street.length > 0 &&
      number.length > 0 &&
      city.length > 0 &&
      district.length > 0 &&
      uf.length > 0
    ),
  )
  const [oldCEP, setOldCEP] = useState(cep !== '' ? cep : '')

  function handleCreateNewRequest(event: FormEvent) {
    event.preventDefault()

    try {
      if (cep.length <= 0) {
        throw new Error('CEP Inválido')
      } else if (street.length <= 0) {
        throw new Error('Dígite o nome da Rua')
      } else if (number.length <= 0) {
        throw new Error('Dígite o Número da casa')
      } else if (district.length <= 0) {
        throw new Error('Dígite o nome do Bairro')
      } else if (city.length <= 0) {
        throw new Error('Dígite o nome da Cidade')
      } else if (uf.length !== 2) {
        throw new Error('Dígite A Unidade Federativa')
      } else if (paymentMethod.typeOfPayment === '') {
        throw new Error('Selecione a forma de pagamento')
      } else if (cart.length === 0) {
        throw new Error('Nenhum café selecionado')
      }
      const data = {
        cep,
        street,
        number,
        complement,
        district,
        city,
        uf,
      }
      updatedDeliveryData(data)
      navigate('/success')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

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

    if (cep !== undefined) {
      if (IsCEP(String(cep), '')) {
        apiCEP.get(`/${String(cep)}/json/`).then((response) => {
          const data = response.data

          try {
            if (data) {
              if (data.erro === 'true') {
                throw new Error('Error 404')
              }

              if (oldCEP === cep) {
                throw new Error('same')
              }

              setOldCEP(cep)
              updatedLocal({
                cep: cep !== '' ? cep : data.cep,
                street: street !== '' ? street : data.logradouro,
                number: number !== '' ? number : '',
                complement: complement !== '' ? complement : '',
                district: district !== '' ? district : data.bairro,
                city: city !== '' ? city : data.localidade,
                uf: uf !== '' ? uf : data.uf,
                cityHeader: cityHeader !== '' ? city : data.localidade,
                ufHeader: ufHeader !== '' ? ufHeader : data.uf,
              })
              setCEP(cep)
              setStreet(data.logradouro)
              setDistrict(data.bairro)
              setCity(data.localidade)
              setUF(data.uf)
              setCityHeader(data.city)
              setUfHeader(data.uf)
            }
          } catch (e: any) {
            if (e.message === 'Error 404') {
              toast.error('CEP Inválido ')
            }
          }
        })
      }
    }
  }, [
    cep,
    updatedLocal,
    city,
    district,
    complement,
    number,
    street,
    uf,
    cityHeader,
    ufHeader,
    oldCEP,
  ])

  function paymentType(data: Payment) {
    changePaymentMethod(data)
  }

  function handleCEP(data: string) {
    setCEP(data)

    updatedLocal({
      ...local,
      cep: data,
    })
  }

  function handleStreet(data: string) {
    setStreet(data)
    updatedLocal({
      ...local,
      street: data,
    })
  }

  function handleNumber(data: string) {
    setNumber(data)

    updatedLocal({
      ...local,
      number: data,
    })
  }

  function handleDistrict(data: string) {
    setDistrict(data)
    updatedLocal({
      ...local,
      district: data,
    })
  }

  function handleComplement(data: string) {
    setComplement(data)

    updatedLocal({
      ...local,
      complement: data,
    })
  }

  function handleCity(data: string) {
    setCity(data)
    updatedLocal({
      ...local,
      city: data,
    })
  }

  function handleUF(data: string) {
    setUF(data)
    updatedLocal({
      ...local,
      uf: data,
    })
  }

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal + product.total
  }, 0)

  return (
    <CheckoutContainer onSubmit={handleCreateNewRequest}>
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
                onFocus={() => setDisabled(false)}
                onChange={(e) => handleCEP(e.target.value)}
                value={cep}
              />
              <input
                className="rua"
                autoComplete="off"
                type="text"
                placeholder="Rua"
                value={street}
                disabled={disabled}
                onChange={(e) => handleStreet(e.target.value)}
              />
              <input
                className="num"
                type="number"
                autoComplete="off"
                placeholder="Número"
                value={number}
                disabled={disabled}
                onChange={(e) => handleNumber(e.target.value)}
              />
              <input
                className="com"
                type="text"
                placeholder="Complemento"
                autoComplete="off"
                value={complement}
                disabled={disabled}
                onChange={(e) => handleComplement(e.target.value)}
              />
              <input
                className="bai"
                type="text"
                placeholder="Bairro"
                autoComplete="off"
                disabled={disabled}
                value={district}
                onChange={(e) => handleDistrict(e.target.value)}
              />
              <input
                className="cid"
                type="text"
                autoComplete="off"
                placeholder="Cidade"
                disabled={disabled}
                value={city}
                onChange={(e) => handleCity(e.target.value)}
              />
              <input
                className="uf"
                type="text"
                autoComplete="off"
                placeholder="UF"
                value={uf}
                disabled={disabled}
                onChange={(e) => handleUF(e.target.value)}
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
        <div className={`itemSelect ${cart.length === 0 ? ' noneCoffee' : ''}`}>
          {cart.map((item) => (
            <CoffeeCheckout key={item.id} item={item} />
          ))}

          <div
            className={`total ${cart.length === 0 ? ' noneCoffeeTotal' : ''}`}
          >
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
          <button
            type="submit"
            disabled={disabled || paymentMethod.typeOfPayment === ''}
          >
            confirmar pedido
          </button>
        </div>
      </ItemsSelection>
    </CheckoutContainer>
  )
}
