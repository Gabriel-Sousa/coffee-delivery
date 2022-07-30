import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { CheckoutContainer, FormContainer, ItemsSelection } from './styles'

// import { useNavigate } from 'react-router-dom'
import { Payment, useCoffee } from '../../hooks/useCoffee'
import { CoffeeCheckout } from '../../components/CoffeeCheckout'
import { useEffect, useState } from 'react'
import { apiCEP } from '../../services/api'
import { formatPrice } from '../../utils/priceFormatted'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { toast } from 'react-toastify'

const deliveryDataFormValidationSchema = zod.object({
  cep: zod.string().min(8, 'CEP inválido'),
  street: zod.string().min(1, 'Digite o nome da rua'),
  number: zod.string().min(1, 'Digite um número'),
  complement: zod.string().optional(),
  district: zod.string().min(1, 'Digite o nome do Bairro'),
  city: zod.string().min(1, 'Digite o nome da Cidade'),
  uf: zod.string().min(2, 'Digite a Unidades federativas'),
})

type DeliveryDataForm = zod.infer<typeof deliveryDataFormValidationSchema>

export function Checkout() {
  // const navigate = useNavigate()
  const { register, handleSubmit, watch, formState, reset } =
    useForm<DeliveryDataForm>({
      resolver: zodResolver(deliveryDataFormValidationSchema),
      defaultValues: {
        cep: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        uf: '',
      },
    })
  const { cart, changePaymentMethod, paymentMethod } = useCoffee()
  const [disabled, setDisabled] = useState(true)

  const cep = watch('cep')

  const errors = formState.errors

  if (errors.cep?.message === 'CEP inválido') {
    toast.error('CEP inválido')
  }
  console.log(formState.errors)
  function handleCreateNewRequest(data: any) {
    console.log(data)
    reset()
    // navigate('/success')
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
          console.log(response.data)
        })
      }
    }
  }, [cep])

  function paymentType(data: Payment) {
    changePaymentMethod(data)
  }

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal + product.total
  }, 0)

  return (
    <CheckoutContainer onSubmit={handleSubmit(handleCreateNewRequest)}>
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
                {...register('cep')}
              />
              <input
                className="rua"
                autoComplete="off"
                type="text"
                placeholder="Rua"
                disabled={disabled}
                {...register('street')}

                // value={rua}
                // onChange={(e) => setRua(e.target.value)}
              />
              <input
                className="num"
                type="number"
                autoComplete="off"
                placeholder="Número"
                disabled={disabled}
                {...register('number')}

                // value={numero}
                // onChange={(e) => {
                //   updatedLocal({ ...local, numero: String(e.target.value) })
                //   setNumero(String(e.target.value))
                // }}
              />
              <input
                className="com"
                type="text"
                placeholder="Complemento"
                autoComplete="off"
                disabled={disabled}
                {...register('complement')}

                // value={complemento}
                // onChange={(e) => {
                //   updatedLocal({
                //     ...local,
                //     complemento: String(e.target.value),
                //   })
                //   setComplemento(String(e.target.value))
                // }}
              />
              <input
                className="bai"
                type="text"
                placeholder="Bairro"
                autoComplete="off"
                disabled={disabled}
                {...register('district')}

                // value={bairro}
                // onChange={(e) => setBairro(e.target.value)}
              />
              <input
                className="cid"
                type="text"
                autoComplete="off"
                placeholder="Cidade"
                disabled={disabled}
                {...register('city')}

                // value={cidade}
                // onChange={(e) => setCidade(e.target.value)}
              />
              <input
                className="uf"
                type="text"
                autoComplete="off"
                placeholder="UF"
                disabled={disabled}
                {...register('uf')}

                // value={uf}
                // onChange={(e) => setUf(e.target.value)}
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
