import styled from 'styled-components'

export const CoffeeCardContainer = styled.div`
  width: 16rem;
  height: 19rem;
  background: ${(props) => props.theme['base-card']};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 6px 36px;

  margin-bottom: 2.5rem;

  header {
    margin-top: -5rem;
    margin-bottom: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 7.5rem;
    }

    span {
      margin-top: 1rem;
      background: ${(props) => props.theme['yellow-300']};
      color: ${(props) => props.theme['yellow-700']};
      text-align: center;

      border-radius: 999px;
      padding: 4px 8px;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 0.625rem;
      line-height: 130%;
    }

    .type {
      display: flex;
      gap: 0.25rem;
      justify-content: center;
      align-items: center;
    }
  }

  section {
    display: flex;
    flex-direction: column;

    text-align: center;
    strong {
      font-family: 'Baloo 2';
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.3;
      margin-bottom: 0.5rem;
    }

    p {
      max-width: 13.5rem;
      margin-bottom: 2rem;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.3;

      color: ${(props) => props.theme['base-label']};
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;

    > div:first-child {
      color: ${(props) => props.theme['base-text']};

      span:first-child {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.3;
      }
      span:last-child {
        font-family: 'Baloo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 1.5rem;
        line-height: 1.3;
      }
    }

    .shoppingCartOfCard {
      background: ${(props) => props.theme['purple-700']};
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 6px;
      color: ${(props) => props.theme.white};
      cursor: pointer;

      transition: background 0.2ms;

      :hover {
        background: ${(props) => props.theme['purple-500']};
      }
    }
  }
`
