declare type RawRole = {
  createdAt: string
  description: string
  name: string
  permissions: StrapiRawCollection<RawPermission>
  type: string
  updatedAt: string
  users: StrapiRawCollection<RawUser>
}

declare type Role = {
  id: number
  createdAt: string
  description: string
  name: string
  permissions: StrapiCollection<Permission>
  type: string
  updatedAt: string
  users: StrapiCollection<User>
}

declare type RawPermission = {
  action: string
  createdAt: string
  updatedAt: string
  role: StrapiRawEntity<RawRole>
}

declare type Permission = {
  id: number
  action: string
  createdAt: string
  updatedAt: string
  role: StrapiEntity<Role>
}
