import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { formatPrice } from '../utils/priceFormatted'

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
  formattedPrice: string
  total: number
  formattedTotal: string
}
interface addCoffeeAtCartProps {
  amount: number
  coffee: Coffee
}

interface localProps {
  logradouro?: string
  bairro?: string
  localidade: string
  uf?: string
  cep: string
  start?: boolean
  numero: string
  complemento: string
  rua?: string
}

export interface Payment {
  typeOfPayment: 'creditCard' | 'money' | 'creditDebit' | ''
}

export interface deliveryDataProps {
  data: localProps
  paymentMethod?: Payment
}

interface CoffeeContextData {
  coffees: Coffee[]
  cart: Coffee[]
  local: localProps
  paymentMethod: Payment
  addCoffeeAtCart: ({ amount, coffee }: addCoffeeAtCartProps) => void
  deliveryData: deliveryDataProps
  updatedCoffees: (data: Coffee[]) => void
  updatedDeliveryData: (data: localProps) => void
  removeCoffeeAtCart: (id: number) => void
  updatedLocal: (data: localProps) => void
  changePaymentMethod: (data: Payment) => void
}

const CoffeeContext = createContext({} as CoffeeContextData)

export function CoffeeProvider({ children }: CoffeeProviderProps) {
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [cart, setCart] = useState<Coffee[]>([])
  const [paymentMethod, setPaymentMethod] = useState<Payment>({
    typeOfPayment: '',
  } as Payment)
  const [deliveryData, setDeliveryData] = useState({} as deliveryDataProps)
  const [local, setLocal] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    cep: '',
  } as localProps)

  useEffect(() => {
    fetch('http://192.168.1.2:3333/coffee')
      .then((response) => response.json())
      .then((responseData) => {
        const data = responseData.map((item: Coffee) => {
          return { ...item, formattedPrice: formatPrice(item.price) }
        })
        setCoffees(data)
      })
  }, [])

  function addCoffeeAtCart({ amount, coffee }: addCoffeeAtCartProps) {
    const isAlreadyInCart = cart.findIndex((item) => item.id === coffee.id)
    if (amount === 0) {
      toast.error('Selecione pelo menos uma unidade')
      return
    }

    if (isAlreadyInCart !== -1) {
      const amountModified = cart.map((item) =>
        item.id === coffee.id
          ? {
              ...item,
              amount,
              total: amount * item.price,
              formattedTotal: formatPrice(amount * item.price),
            }
          : item,
      )
      setCart(amountModified)
      // console.log('Já está no carrinho')
      return
    }

    // console.log('Não está no carrinho')
    setCart((state) => [
      ...state,
      {
        ...coffee,
        amount,
        total: amount * coffee.price,
        formattedTotal: formatPrice(amount * coffee.price),
      },
    ])
    toast.success('Adicionado com sucesso')
  }

  function updatedCoffees(data: Coffee[]) {
    setCart(data)
  }

  function removeCoffeeAtCart(id: number) {
    const removedCoffee = cart.filter((item) => item.id !== id)
    setCart(removedCoffee)
  }

  function updatedLocal(data: localProps) {
    setLocal(data)
  }

  function changePaymentMethod(data: Payment) {
    setPaymentMethod(data)
  }

  function updatedDeliveryData(data: localProps) {
    console.log({ ...data, paymentMethod })

    setDeliveryData({ data, paymentMethod })
  }

  return (
    <CoffeeContext.Provider
      value={{
        coffees,
        addCoffeeAtCart,
        cart,
        updatedCoffees,
        removeCoffeeAtCart,
        local,
        updatedLocal,
        paymentMethod,
        changePaymentMethod,
        deliveryData,
        updatedDeliveryData,
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
