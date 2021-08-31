type RoleType = {
  id: number
  name: string
  description: string
  type: string
}

// NOTE: This type musth have the same structure as the backend model.
declare interface UserType {
  username: string
  email: string
  provider: string
  resetPasswordToken: string
  confirmationToken: string
  confirmed: boolean
  blocked: boolean
  role: RoleType
  votes: VoteType[]
  applications: ApplicationType[]
}
