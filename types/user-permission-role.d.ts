declare interface IAdminUser {
  __typename?: 'AdminUser'
  id: string
  username?: string
  firstname: string
  lastname: string
}

declare interface IUserInput {
  fullname?: string
  username: string
  email: string
  avatar?: IUploadFile
  provider?: string
  password?: string
  resetPasswordToken?: string
  confirmationToken?: string
  confirmed?: boolean
  blocked?: boolean
  role?: string
  applications?: Array<string>
  votes?: Array<string>
  created_by?: string
  updated_by?: string
}

declare interface IUsersPermissionsUser {
  __typename?: 'UsersPermissionsUser'
  id: string
  created_at: string
  updated_at: string
  fullname?: string
  username: string
  email: string
  avatar?: IUploadFile
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  role?: IUsersPermissionsRole
  applications?: Array<IApplication>
  votes?: Array<IVote>
}

declare interface IUsersPermissionsMe {
  __typename?: 'UsersPermissionsMe'
  id: string
  fullname: string
  username: string
  email: string
  avatar?: IUploadFile
  confirmed?: boolean
  blocked?: boolean
  role?: IUsersPermissionsMeRole
}

declare interface IUsersPermissionsMeRole {
  __typename?: 'UsersPermissionsMeRole'
  id: string
  name: string
  description?: string
  type?: string
}

declare interface IUsersPermissionsPermission {
  __typename?: 'UsersPermissionsPermission'
  id: string
  type: string
  controller: string
  action: string
  enabled: boolean
  policy?: string
  role?: IUsersPermissionsRole
}

declare interface IUsersPermissionsRole {
  __typename?: 'UsersPermissionsRole'
  id: string
  name: string
  description?: string
  type?: string
  permissions?: Array<IUsersPermissionsPermission>
  users?: Array<IUsersPermissionsUser>
}

declare interface IMutationLoginArgs {
  input: {
    identifier: string
    password: string
    provider?: string
  }
}

declare interface IMutationRegisterArgs {
  input: {
    username: string
    email: string
    password: string
  }
}

declare interface IMutationForgotPasswordArgs {
  email: string
}

declare interface IMutationResetPasswordArgs {
  password: string
  passwordConfirmation: string
  code: string
}

declare interface IMutationEmailConfirmationArgs {
  confirmation: string
}
