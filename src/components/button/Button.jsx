import React from "react";
import { ButtonSend } from "./Button.styled";

export const Button = ({ children, disabled, variant, type , onClick}) => {
  return (
    <ButtonSend disabled={disabled} variant={variant} type={type} onClick={onClick}>
      {children}
    </ButtonSend>
  );
};
