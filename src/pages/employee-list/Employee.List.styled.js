import styled from "styled-components";
import { Container, Table } from "react-bootstrap";

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
  align-items: center;
  text-align: center;
  justify-content: center;
  @media (max-width: 756px) {
    width: 100%;
  }
`;

export const FigureImage = styled.img`
  border-radius: 1rem;
`;

export const Div = styled.div`
  width: 9rem;
`;
