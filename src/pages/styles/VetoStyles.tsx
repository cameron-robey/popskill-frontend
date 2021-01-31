import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
  width: 70%;
  max-width: 80rem;
  margin: auto;

`;

export const WelcomeWrapper = styled.div`
  * {
    margin: 10px;
  }
`;

export const SectionTitle = styled.h1`

`;

export const WelcomeSubtitle = styled.p`

`;

export const InputTitles = styled.p``;

export const NameInputWrapper = styled.div``;

export const NameInput = styled.input``;

export const SubmitButton = styled.a`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #30315e;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: #434343;
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
}
`;

export const MapsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

interface MapProps {
  mapImage: string
}

export const Map = styled.div<MapProps>`
  overflow: hidden;
  height: 340px;
  width: 100%;
  background-image: url('/assets/map/${({mapImage}) => mapImage}.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 40%;
  }

  p {
    text-transform: capitalize;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 10px;
    padding: 0 20px;
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
  }
`;

export const SidesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

interface SideProps {
  sideImage: string
}

export const Side = styled.div<SideProps>`
  overflow: hidden;
  height: 340px;
  width: 100%;
  background-image: url('/assets/sides/${({sideImage}) => sideImage}background.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 40%;
    max-width: 100px;
  }

  p {
    text-transform: capitalize;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 10px;
    padding: 0 20px;
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
  }
`;

export const FinalMapsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  div {
    height: 700px;
    cursor: default;
  }
`;
