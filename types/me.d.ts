declare type Me = {
  id: number
  blocked: boolean
  confirmed: boolean
  email: string
  role: MeRole
  username: string
}

declare type MeRole = {
  id: number
  description: string
  name: string
  type: string
}
