import styled from "styled-components";
import { Container, Table, Button } from "react-bootstrap";

export const TitleTableEmployee = styled.h2`
  text-align: center;
  margin: 2rem;
`;
export const ContainerTableEmployee = styled(Container)`
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
`;

export const TableEmployee = styled(Table)`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  @media (max-width: 756px) {
    width: auto;
  }
`;

export const ButtonAction = styled(Button)`
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.2rem;
  @media (max-width: 756px) {
    width: 100%;
  }
`;
