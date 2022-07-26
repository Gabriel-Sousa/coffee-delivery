import styled from 'styled-components'

const BaseContainer = styled.div`
  font-family: 'Roboto' sans-serif;
  font-size: 1rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: ${(props) => props.theme['base-text']};

  span {
    border-radius: 999px;
    padding: 0.5rem;
    display: flex;
    font-size: 1rem;

    :first-of-type {
      color: ${(props) => props.theme.white};
    }
  }
`

export const ShoppingContainer = styled(BaseContainer)`
  span {
    background: ${(props) => props.theme['yellow-700']};
  }
`
export const PackageContainer = styled(BaseContainer)`
  span {
    background: ${(props) => props.theme['base-text']};
  }
`
export const TimerContainer = styled(BaseContainer)`
  span {
    background: ${(props) => props.theme['yellow-500']};
  }
`
export const CoffeeContainer = styled(BaseContainer)`
  span {
    background: ${(props) => props.theme['purple-500']};
  }
`
