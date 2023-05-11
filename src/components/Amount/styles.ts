import styled from 'styled-components'

export const AmountContainer = styled.div`
  .amount {
    background: ${(props) => props.theme['base-button']};

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.25rem;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.3;

    button {
      background: transparent;
      border: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: ${(props) => props.theme['purple-500']};
      transition: color 0.2ms;

      :disabled {
        cursor: not-allowed;
        opacity: 0.5;
        :hover {
          color: ${(props) => props.theme['purple-500']};
        }
      }

      :hover {
        color: ${(props) => props.theme['purple-700']};
      }
    }
  }
`
