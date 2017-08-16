export interface CreateUserProperties {
  uid: string
  email: string
  password: string
  emailVerified: boolean
}

export const USER_NOT_VERIFIED = {
  uid: 'USER_NOT_VERIFIED',
  email: 'user-not-verified@mailinator.com',
  password: 'testtest',
  emailVerified: false,
}

export const USER_VERIFIED_NO_PROFILE = {
  uid: 'USER_VERIFIED_NO_PROFILE',
  email: 'user-verified-no-profile@mailinator.com',
  password: 'testtest',
  emailVerified: true,
}

export const USER_VERIFIED_PROFILE = {
  uid: 'USER_VERIFIED_PROFILE',
  email: 'user-verified-profile@mailinator.com',
  password: 'testtest',
  emailVerified: true,
}

export const USERS = [
  USER_NOT_VERIFIED,
  USER_VERIFIED_NO_PROFILE,
  USER_VERIFIED_PROFILE,
]
