import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

interface CoffeeProviderProps {
  children: ReactNode
}

export interface Coffee {
  id: number
  title: string
  subtitle: string
  type: [string]
  price: number
  stock: number
  imgUrl: string
  amount: number
}
interface addCoffeeAtCartProps {
  amount: number
  coffee: Coffee
}

interface CoffeeContextData {
  coffees: Coffee[]
  addCoffeeAtCart: ({ amount, coffee }: addCoffeeAtCartProps) => void
  cart: Coffee[]
  updatedCoffees: (data: Coffee[]) => void
}

const CoffeeContext = createContext({} as CoffeeContextData)

export function CoffeeProvider({ children }: CoffeeProviderProps) {
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [cart, setCart] = useState<Coffee[]>([])

  useEffect(() => {
    fetch('http://192.168.1.3:3333/coffee')
      .then((response) => response.json())
      .then((responseData) => setCoffees(responseData))
  }, [])

  function addCoffeeAtCart({ amount, coffee }: addCoffeeAtCartProps) {
    const isAlreadyInCart = cart.findIndex((item) => item.id === coffee.id)
    if (amount === 0) {
      toast.error('Selecione pelo menos uma unidade')
      return
    }

    if (isAlreadyInCart !== -1) {
      const amountModified = cart.map((item) =>
        item.id === coffee.id ? { ...item, amount } : item,
      )
      setCart(amountModified)
      // console.log('Já está no carrinho')
      return
    }
    // console.log('Não está no carrinho')
    setCart((state) => [...state, { ...coffee, amount }])
  }

  function updatedCoffees(data: Coffee[]) {
    setCart(data)
  }

  return (
    <CoffeeContext.Provider
      value={{
        coffees,
        addCoffeeAtCart,
        cart,
        updatedCoffees,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  )
}

export function useCoffee(): CoffeeContextData {
  const context = useContext(CoffeeContext)
  return context
}
