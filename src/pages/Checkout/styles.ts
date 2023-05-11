import styled from 'styled-components'

export const CheckoutContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  max-width: 70rem;

  :first-of-type {
    margin-top: 2.5rem;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
  }

  .titleComplete {
    font-family: 'Baloo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.3;
    color: ${(props) => props.theme['base-subtitle']};
    margin-bottom: 1rem;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin-top: 2rem;

  .containerForm {
    padding: 2.5rem;
    background: ${(props) => props.theme['base-card']};
  }

  .headerForm {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .mapPin {
    color: ${(props) => props.theme['yellow-700']};
  }

  .formTitle {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    line-height: 1.3;

    span:first-child {
      font-size: 1rem;
      color: ${(props) => props.theme['base-subtitle']};
      display: block;
    }

    span:last-child {
      font-size: 0.875rem;
      color: ${(props) => props.theme['base-text']};
    }
  }

  .inputGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1rem;
    grid-column-gap: 0.75rem;

    grid-template-areas:
      'cep cep cep'
      'rua rua rua'
      'num com com'
      'bai cid uf';

    .cep {
      grid-area: cep;
    }
    .rua {
      grid-area: rua;
    }
    .num {
      grid-area: num;
    }
    .com {
      grid-area: com;
    }
    .bai {
      grid-area: bai;
    }
    .cid {
      grid-area: cid;
    }
    .uf {
      grid-area: uf;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 0;
      border-radius: 4px;
      border: 1px ${(props) => props.theme['base-button']} solid;

      background: ${(props) => props.theme['base-input']};
      color: ${(props) => props.theme['base-text']};

      ::placeholder {
        color: ${(props) => props.theme['base-label']};
      }

      :disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      :focus {
        border: 1px ${(props) => props.theme['yellow-700']} solid;
        outline: 1px ${(props) => props.theme['yellow-700']} solid;
      }
    }
  }

  .paymentMethod {
    background: ${(props) => props.theme['base-card']};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 2.5rem;
    margin-bottom: 2rem;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.3;

    .headerPayment {
      display: flex;
      margin-bottom: 2rem;
      gap: 0.5rem;
    }

    .currency {
      color: ${(props) => props.theme['purple-500']};
    }

    .paymentTitle {
      display: block;
      color: ${(props) => props.theme['base-subtitle']};
    }

    .paymentSubTitle {
      font-size: 0.75rem;
      color: ${(props) => props.theme['base-text']};
    }

    .btn-payment {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 0.75rem;

      color: ${(props) => props.theme['base-text']};

      font-size: 0.75rem;
      line-height: 1.6;

      > button {
        display: flex;
        justify-content: center;
        align-items: center;

        border: 0;
        border-radius: 6px;

        gap: 0.75rem;

        padding: 1rem;
        background: ${(props) => props.theme['base-button']};
        color: ${(props) => props.theme['base-subtitle']};

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.6;
        text-transform: uppercase;

        cursor: pointer;

        &.active {
          border: 1px ${(props) => props.theme['purple-500']} solid;
          outline: 1px ${(props) => props.theme['purple-500']} solid;
          background: ${(props) => props.theme['purple-300']};
        }

        :hover {
          background: ${(props) => props.theme['base-hover']};
        }

        @media (max-width: 1000px) {
          padding: 0.875rem;
        }
        @media (max-width: 700px) {
          padding: 0.75rem;
        }
        @media (max-width: 550px) {
          flex-direction: column;
          padding: 0.75rem;
        }

        span {
          display: flex;
          align-items: center;
          color: ${(props) => props.theme['purple-500']};
        }
      }
    }
  }
`

export const ItemsSelection = styled.div`
  width: 33rem;
  @media (max-width: 1000px) {
    width: 25rem;
  }

  .titleSelect {
    font-family: 'Baloo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.3;
  }
  .itemSelect {
    max-width: 28rem;

    @media (max-width: 1000px) {
      max-width: 35rem;
    }

    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme['base-card']};
    gap: 0.5rem;
    padding: 2.5rem;
    margin-bottom: 2rem;
    border-radius: 6px 44px;
    margin-top: 1rem;

    .total {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.3;

      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      color: ${(props) => props.theme['base-text']};

      div {
        display: flex;
        justify-content: space-between;

        :last-child {
          color: ${(props) => props.theme['base-subtitle']};
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
      }
    }

    .noneCoffeeTotal {
      border-top: 1px solid ${(props) => props.theme['base-button']};

      padding-top: 2rem;
    }
    button[type='submit'] {
      padding: 0.75rem;
      background: ${(props) => props.theme['yellow-500']};
      color: ${(props) => props.theme.white};
      border-radius: 6px;
      border: 0;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 0.875rem;
      line-height: 1.6;
      text-transform: uppercase;
      transition: background 2ms;
      cursor: pointer;

      :disabled {
        cursor: not-allowed;
        opacity: 0.9;

        :hover {
          background: ${(props) => props.theme['yellow-500']};
        }
      }

      :hover {
        background: ${(props) => props.theme['yellow-700']};
      }
    }
  }

  .noneCoffee {
    padding-top: 7.25rem;
  }
`
