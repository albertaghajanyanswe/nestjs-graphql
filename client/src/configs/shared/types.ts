import React from "react";

export type iLogin = {
  email: '';
  password: '';
}

export type iRegistration = {
  firstName: '';
  lastName: '';
  email: '';
  username: '';
  password: '';
  role: '';
}

export type iInput = {
  id: string,
  name: string,
  label: string,
  type: string,
  variant: string,
  icon: React.ReactNode,
}

export type iInputs = {
  inputs: iInput[]
}