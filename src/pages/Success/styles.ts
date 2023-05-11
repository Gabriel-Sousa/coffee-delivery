import styled from 'styled-components'

export const SuccessContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .titleSuccess {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    gap: 0.25rem;

    @media (max-width: 1080px) {
      width: 100%;
      text-align: center;
    }

    span:first-child {
      font-family: 'Baloo 2';
      font-style: normal;
      font-weight: 800;
      font-size: 2rem;
      line-height: 1.3;
      color: ${(props) => props.theme['yellow-700']};
    }
    span:last-child {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.3;
      color: ${(props) => props.theme['base-subtitle']};

      margin-bottom: 2.5rem;

      @media (max-width: 1080px) {
        text-align: center;
      }
    }
  }

  .bodySuccess {
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      img {
        max-width: 31rem;
        padding: 1rem;
      }
    }
    .gradientBody {
      display: flex;
      align-self: center;

      border-radius: 6px 36px;
      padding: 2px;
      background: linear-gradient(
        to right,
        ${(props) => props.theme['yellow-500']},
        ${(props) => props.theme['purple-500']}
      );
      .content {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        background: #222;
        color: white;
        padding: 2.5rem;
        border-radius: 6px 36px;
        background: ${(props) => props.theme.white};
        color: ${(props) => props.theme.white};

        > div {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .map {
          background: ${(props) => props.theme['purple-500']};
          border-radius: 999px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
        }

        .timer {
          background: ${(props) => props.theme['yellow-500']};
          border-radius: 999px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
        }

        .dollar {
          background: ${(props) => props.theme['yellow-700']};
          border-radius: 999px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
        }

        .information {
          color: ${(props) => props.theme['base-text']};

          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }
`
