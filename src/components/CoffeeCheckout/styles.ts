import styled from 'styled-components'

export const CoffeeCheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme['base-card']};
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-radius: 6px 44px;
  margin-top: 1rem;

  .item {
    display: flex;
    padding-bottom: 2.2rem;
    border-bottom: 1px solid ${(props) => props.theme['base-button']};
    gap: 1rem;

    @media (max-width: 1080px) {
      gap: 0.1rem;
    }

    &.item + .item {
      margin-top: 2rem;
    }

    @media (max-width: 1000px) {
      justify-content: space-evenly;
    }

    img {
      width: 4rem;
      height: 4rem;
      margin-right: 1.25rem;
      @media (max-width: 1146px) {
        margin-right: 0.1rem;
      }
    }

    .itemBody {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      > span {
        color: ${(props) => props.theme['base-subtitle']};

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.3;
      }
    }

    .footerItem {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .remove {
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${(props) => props.theme['base-button']};
      color: ${(props) => props.theme['base-text']};

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.6;

      border: 0;

      span {
        color: ${(props) => props.theme['purple-500']};
        display: flex;
        align-self: center;
      }

      padding: 0.5rem;
      border-radius: 6px;
      gap: 0.25rem;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.3;
      cursor: pointer;

      :hover {
        background: ${(props) => props.theme['base-hover']};
        color: ${(props) => props.theme['base-subtitle']};
        span {
          color: ${(props) => props.theme['purple-700']};
        }
      }
    }

    .valueItem {
      color: ${(props) => props.theme['base-text']};

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      line-height: 1.3;
    }
  }
`
