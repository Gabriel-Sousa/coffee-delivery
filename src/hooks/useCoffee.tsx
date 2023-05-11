import {
  createContext,
  ReactNode,
  useCallback,
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

export interface localProps {
  cep: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  uf: string
  cityHeader?: string
  ufHeader?: string
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
  resetCoffeeAtCart: () => void
}

const coffee = [
  {
    id: 1,
    title: 'Expresso Tradicional',
    subtitle: 'O tradicional café feito com água quente e grãos moídos',
    type: ['tradicional'],
    price: 3.5,
    stock: 5,
    imgUrl: '/assets/coffee/expresso.svg',
  },
  {
    id: 2,
    title: 'Expresso Americano',
    subtitle: 'Expresso diluído, menos intenso que o tradicional',
    type: ['tradicional'],
    price: 9.5,
    stock: 3,
    imgUrl: '/assets/coffee/americano.svg',
  },
  {
    id: 3,
    title: 'Expresso Cremoso',
    subtitle: 'Café expresso tradicional com espuma cremosa',
    type: ['tradicional'],
    price: 2.99,
    stock: 6,
    imgUrl: '/assets/coffee/expresso_cremoso.svg',
  },
  {
    id: 4,
    title: 'Expresso Gelado',
    subtitle: 'Bebida preparada com café expresso e cubos de gelo',
    type: ['tradicional', 'gelado'],
    price: 7.99,
    stock: 3,
    imgUrl: '/assets/coffee/cafe_gelado.svg',
  },
  {
    id: 5,
    title: 'Café com Leite',
    subtitle: 'Meio a meio de expresso tradicional com leite vaporizado',
    type: ['tradicional', 'com leite'],
    price: 3.99,
    stock: 10,
    imgUrl: '/assets/coffee/cafe_com_leite.svg',
  },
  {
    id: 6,
    title: 'Latte',
    subtitle: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    type: ['tradicional', 'com leite'],
    price: 9.9,
    stock: 3,
    imgUrl: '/assets/coffee/latte.svg',
  },
  {
    id: 7,
    title: 'Capuccino',
    subtitle: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    type: ['tradicional', 'com leite'],
    price: 9.9,
    stock: 10,
    imgUrl: '/assets/coffee/capuccino.svg',
  },
  {
    id: 8,
    title: 'Macchiato',
    subtitle: 'Café expresso misturado com um pouco de leite quente e espuma',
    type: ['tradicional', 'com leite'],
    price: 9.9,
    stock: 4,
    imgUrl: '/assets/coffee/macchiato.svg',
  },
  {
    id: 9,
    title: 'Mocaccino',
    subtitle: 'Café expresso com calda de chocolate, pouco leite e espuma',
    type: ['tradicional', 'com leite'],
    price: 9.9,
    stock: 2,
    imgUrl: '/assets/coffee/mochaccino.svg',
  },
  {
    id: 10,
    title: 'Chocolate Quente',
    subtitle: 'Bebida feita com chocolate dissolvido no leite quente e café',
    type: ['especial', 'com leite'],
    price: 9.9,
    stock: 1,
    imgUrl: '/assets/coffee/chocolate_quente.svg',
  },
  {
    id: 11,
    title: 'Cubano',
    subtitle: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    type: ['especial', 'com leite', 'gelado'],
    price: 9.9,
    stock: 6,
    imgUrl: '/assets/coffee/cubano.svg',
  },
  {
    id: 12,
    title: 'Havaiano',
    subtitle: 'Bebida adocicada preparada com café e leite de coco',
    type: ['especial'],
    price: 9.9,
    stock: 12,
    imgUrl: '/assets/coffee/havaiano.svg',
  },
  {
    id: 13,
    title: 'Árabe',
    subtitle: 'Bebida preparada com grãos de café árabe e especiarias',
    type: ['especial'],
    price: 9.9,
    stock: 9,
    imgUrl: '/assets/coffee/arabe.svg',
  },
  {
    id: 14,
    title: 'Irlandês',
    subtitle: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    type: ['especial', 'alcoólico'],
    price: 9.9,
    stock: 8,
    imgUrl: '/assets/coffee/irlandes.svg',
  },
]

const CoffeeContext = createContext({} as CoffeeContextData)

export function CoffeeProvider({ children }: CoffeeProviderProps) {
  const [coffees, setCoffees] = useState<Coffee[]>([])
  const [cart, setCart] = useState<Coffee[]>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:cart-state-1.0.0',
    )

    if (storedStateAsJSON) {
      console.log(storedStateAsJSON)
      return JSON.parse(storedStateAsJSON)
    }

    return []
  })
  const [paymentMethod, setPaymentMethod] = useState<Payment>(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:payment-type-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {
      typeOfPayment: '',
    } as Payment
  })

  const [deliveryData, setDeliveryData] = useState(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:delivery-data-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {} as deliveryDataProps
  })

  const [local, setLocal] = useState(() => {
    const storedStateAsJSON = localStorage.getItem(
      '@coffee-delivery:local-1.0.0',
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }

    return {
      cep: '',
      street: '',
      number: '',
      district: '',
      complement: '',
      city: '',
      uf: '',
      cityHeader: '',
      ufHeader: '',
    } as localProps
  })

  // useEffect(() => {
  //   fetch('https://servercoffeedelivery-production.up.railway.app/coffee')
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const data = responseData.map((item: Coffee) => {
  //         return { ...item, formattedPrice: formatPrice(item.price) }
  //       })
  //       setCoffees(data)
  //     })
  // }, [])

  useEffect(() => {
    const coffeeResult = coffee.map((item) => {
      return { ...item, formattedPrice: formatPrice(item.price) }
    })

    setCoffees(coffeeResult as Coffee[])
  }, [])

  useEffect(() => {
    localStorage.setItem('@coffee-delivery:local-1.0.0', JSON.stringify(local))
  }, [local])

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
      const stateJSON = JSON.stringify(amountModified)

      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
      // console.log('Já está no carrinho')
      return
    }

    // console.log('Não está no carrinho')

    const newItemAtCart = {
      ...coffee,
      amount,
      total: amount * coffee.price,
      formattedTotal: formatPrice(amount * coffee.price),
    }
    setCart((state) => [...state, newItemAtCart])

    const stateJSON = JSON.stringify([...cart, newItemAtCart])

    localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)

    toast.success('Adicionado com sucesso')
  }

  function updatedCoffees(data: Coffee[]) {
    setCart(data)
  }

  function resetCoffeeAtCart() {
    setPaymentMethod({
      typeOfPayment: '',
    })
    setCart([])
  }

  function removeCoffeeAtCart(id: number) {
    const removedCoffee = cart.filter((item) => item.id !== id)
    setCart(removedCoffee)
    localStorage.setItem(
      '@coffee-delivery:cart-state-1.0.0',
      JSON.stringify(removedCoffee),
    )
    toast.success('Removido com sucesso')
  }

  const updatedLocal = useCallback((data: localProps) => setLocal(data), [])

  function changePaymentMethod(data: Payment) {
    setPaymentMethod(data)
    localStorage.setItem(
      '@coffee-delivery:payment-type-1.0.0',
      JSON.stringify(data),
    )
  }

  function updatedDeliveryData(data: localProps) {
    setDeliveryData({ data, paymentMethod })
    setCart([])
    setPaymentMethod({ typeOfPayment: '' })
    setLocal({
      cep: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      uf: '',
      cityHeader: '',
      ufHeader: '',
    })
    localStorage.setItem('@coffee-delivery:cart-state-1.0.0', '')
    localStorage.setItem('@coffee-delivery:local-1.0.0', '')
    localStorage.setItem(
      '@coffee-delivery:delivery-data-1.0.0',
      JSON.stringify({ data, paymentMethod }),
    )
    localStorage.setItem('@coffee-delivery:payment-type-1.0.0', '')
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
        resetCoffeeAtCart,
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
