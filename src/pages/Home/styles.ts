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
  justify-content: center;
  margin: 0 auto;

  img {
    max-width: 29rem;
  }
`
export const SectionContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 95%;
  max-width: 1120px;

  margin-top: 5.8rem;
  margin-bottom: 6.75rem;

  gap: 3.5rem;

  .title {
    display: flex;
    flex-direction: column;
    gap: 1rem;

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

  margin: 0 auto;
  width: 95%;
  max-width: 1120px;

  > strong {
    font-family: 'Baloo 2';
    font-weight: 800;
    font-size: 2rem;
    line-height: 1.3;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .coffee {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
`
