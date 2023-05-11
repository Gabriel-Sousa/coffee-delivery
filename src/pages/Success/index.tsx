import { SuccessContainer } from './styles'
import deliveryImg from '../../assets/delivery.svg'
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import { useCoffee } from '../../hooks/useCoffee'

export function Success() {
  const { deliveryData } = useCoffee()

  const dataDelivery = { ...deliveryData }

  const typeData = deliveryData.paymentMethod?.typeOfPayment

  const typePayment =
    typeData === 'creditCard'
      ? 'Cartão de Crédito'
      : typeData === 'creditDebit'
      ? 'Cartão de Débito'
      : typeData === 'money'
      ? 'Dinheiro'
      : ''

  return (
    <SuccessContainer>
      <div className="titleSuccess">
        <span>Uhu! Pedido confirmado</span>
        <span>Agora é só aguardar que logo o café chegará até você</span>
      </div>

      <div className="bodySuccess">
        <div className="gradientBody">
          <div className="content">
            <div>
              <span className="map">
                <MapPin weight="fill" size={16} />
              </span>
              <div className="information">
                <span>
                  Entrega em
                  <strong>
                    {' '}
                    {dataDelivery.data.street}, {dataDelivery.data.number}
                  </strong>
                </span>
                <span>
                  {dataDelivery.data.district} - {dataDelivery.data.city},{' '}
                  {dataDelivery.data.uf}
                </span>
              </div>
            </div>
            <div>
              <span className="timer">
                <Timer weight="fill" size={16} />
              </span>
              <div className="information">
                <span>Previsão de entrega</span>
                <strong>20 min - 30 min </strong>
              </div>
            </div>
            <div>
              <span className="dollar">
                <CurrencyDollar size={16} />
              </span>
              <div className="information">
                <span>Pagamento na entrega</span>
                <strong>{typePayment}</strong>
              </div>
            </div>
          </div>
        </div>
        <img src={deliveryImg} alt="" />
      </div>
    </SuccessContainer>
  )
}
