import styled from "styled-components";
import { Container } from "react-bootstrap";

export const ContainerRegisterEmployee = styled(Container)`
width: 50%;
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  justify-content: space-evenly;
  box-shadow: 0px 0px 15px -5px #222;
  @media (max-width: 756px) {
      width: 100%;
  }
`;

export const TitleRegister = styled.h1`
  margin-bottom: 3rem;
  text-align: center;
`;
