declare type RegisterInput = {
  email: string
  password: string
  username: string
}

declare type LoginInput = {
  identifier: string
  password: string
  provider?: string
}

declare type LoginPayload = {
  jwt?: string
  user: Me
}
