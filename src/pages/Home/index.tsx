import { Header } from '../../components/Header'
import coffeeDeliverySectionImg from '../../assets/coffee-delivery-section.svg'
import { MainContainer, SectionContainer, SectionContent } from './styles'
import { ItemsSection } from '../../components/ItemsSection'
import { Coffee } from '../../components/Coffee'
import { useEffect, useState } from 'react'

export interface coffee {
  id: number
  title: string
  subtitle: string
  type: [string]
  price: number
  stock: number
  imgUrl: string
}

export function Home() {
  const [coffees, setCoffees] = useState<coffee[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/coffee')
      .then((response) => response.json())
      .then((responseData) => setCoffees(responseData))
  }, [coffees])

  return (
    <>
      <Header />

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
