import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CoffeeProvider } from './hooks/useCoffee'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CoffeeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CoffeeProvider>
      <ToastContainer
        theme="dark"
        className="toast"
        position="top-left"
        autoClose={2000}
      />
      <GlobalStyle />
    </ThemeProvider>
  )
}
