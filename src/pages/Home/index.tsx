import coffeeDeliverySectionImg from '../../assets/coffee-delivery-section.svg'
import { MainContainer, SectionContainer, SectionContent } from './styles'
import { ItemsSection } from '../../components/ItemsSection'
import { Coffee } from '../../components/Coffee'
import { useCoffee } from '../../hooks/useCoffee'

export function Home() {
  const { coffees } = useCoffee()

  return (
    <>
      <SectionContainer>
        <SectionContent>
          <div className="title">
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <span>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </span>
            <div className="items">
              <ItemsSection />
            </div>
          </div>
          <img src={coffeeDeliverySectionImg} alt="" />
        </SectionContent>
      </SectionContainer>

      <MainContainer>
        <strong>Nossos cafés</strong>
        <div className="coffee">
          {coffees.map((coffee) => (
            <Coffee key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </MainContainer>
    </>
  )
}
