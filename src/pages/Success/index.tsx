import { SuccessContainer } from './styles'
import deliveryImg from '../../assets/delivery.svg'
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'

export function Success() {
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
                  Entrega em <strong>Rua João Daniel Martinelli, 102</strong>
                </span>
                <span>Farrapos - Porto Alegre, RS</span>
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
                <strong>Cartão de Crédito</strong>
              </div>
            </div>
          </div>
        </div>
        <img src={deliveryImg} alt="" />
      </div>
    </SuccessContainer>
  )
}
