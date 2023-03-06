import { Container } from "react-bootstrap";
import styled from "styled-components";

export const ContainerRouters = styled(Container)`
  display: flex;
  min-height: 85vh;
  align-items: center;
  justify-content: center;
`;

export const DivRouters = styled(Container)`
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

