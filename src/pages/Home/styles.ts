import styled from 'styled-components'
import backgroundSectionImg from '../../assets/background-section.svg'

export const SectionContainer = styled.section`
  background-image: url(${backgroundSectionImg});
  background-color: ${(props) => props.theme.background};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(5px);

  display: flex;

  img {
    max-width: 28rem;
  }
`
export const SectionContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 920px) {
    > img {
      max-width: 26rem;
    }
  }
  @media (max-width: 885px) {
    flex-direction: column;
    margin: 0 auto;
    margin-top: 2rem;

    > img {
      max-width: 24rem;
    }
  }
  @media (max-width: 720px) {
    > img {
      max-width: 24rem;
    }
  }

  margin: 5.8rem 2rem 6.75rem;

  gap: 3.5rem;

  .title {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;

    h1 {
      font-family: 'Baloo 2';
      font-size: 3rem;
      line-height: 1.3;
      font-weight: 800;

      color: ${(props) => props.theme['base-title']};
    }

    span {
      font-family: 'Baloo 2';
      font-size: 1.25rem;
      line-height: 1.3;
      font-weight: 400;

      color: ${(props) => props.theme['base-subtitle']};
    }

    .items {
      margin-top: 3rem;

      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem 2.5rem;
    }
  }
`

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;

  > strong {
    font-family: 'Baloo 2';
    font-weight: 800;
    font-size: 2rem;
    line-height: 1.3;
    margin-top: 3rem;
    margin-bottom: 3rem;

    @media (max-width: 820px) {
      text-align: center;
      margin-bottom: 5rem;
    }
  }

  .coffee {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-gap: 2rem;
    flex-wrap: wrap;

    @media (max-width: 820px) {
      display: flex;
      justify-content: center;
      align-self: center;
      width: 100%;
      grid-gap: 2rem;
    }
  }
`
