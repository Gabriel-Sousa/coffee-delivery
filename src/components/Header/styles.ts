import styled from 'styled-components'

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

  width: 95%;
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
    background: ${(props) => props.theme['yellow-300']};
    color: ${(props) => props.theme['yellow-700']};

    padding: 0.5rem;

    border-radius: 6px;
  }
`
