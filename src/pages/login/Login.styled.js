import styled from "styled-components";
import { Card } from "react-bootstrap";

export const CardLoginPage = styled(Card)`
  padding: 1rem;
  display: flex;
  margin: 2rem auto;
  border-radius: 1rem;
  box-shadow: 0px 0px 15px -5px #222;
`;

export const ImageLogo = styled.img`
  width: 20%;
  margin: 0 auto;
  @media (max-width: 759px) {
    width: 30%;
  }
`;
