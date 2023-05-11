import styled from 'styled-components'
import { useCoffee } from '../../hooks/useCoffee'

function CartLength() {
  const { cart } = useCoffee()
  return cart.length === 0 ? '' : cart.length
}

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
`

export const HeaderContent = styled.div`
  background: ${(props) => props.theme.background};
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1120px;

  img {
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: ${(props) => props.theme.background};
  }

  .location {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;

    background: ${(props) => props.theme['purple-300']};
    padding: 0.5rem;

    border-radius: 6px;

    :first-child {
      color: ${(props) => props.theme['purple-500']};
    }

    span {
      color: ${(props) => props.theme['purple-700']};
    }
  }

  .shoppingCart {
    cursor: pointer;
    display: flex;
    align-items: center;
    background: ${(props) => props.theme['yellow-300']};
    color: ${(props) => props.theme['yellow-700']};

    padding: 0.5rem;

    position: relative;
    border-radius: 6px;
  }
  .amountCart::after {
    content: '${CartLength}';
    display: flex;
    align-items: center;
    background: ${(props) => props.theme['yellow-700']};
    color: ${(props) => props.theme.white};
    position: relative;
    border-radius: 999px;
    padding: 0 5px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1.3;

    right: 22px;
    top: -18px;

    margin-right: -1rem;
  }
`
