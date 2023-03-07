import React from "react";
import { DivRouters, ContainerRouters } from "./Container.styled";

export const Container = ({ children }) => {
  return (
    <ContainerRouters>
      <DivRouters>{children}</DivRouters>
    </ContainerRouters>
  );
};
