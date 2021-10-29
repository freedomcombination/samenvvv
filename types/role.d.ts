declare interface IRoleInput {
  name: string
  description?: string
  type?: string
  permissions?: Array<string>
  users?: Array<string>
  created_by?: string
  updated_by?: string
}
