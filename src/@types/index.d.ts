interface IUser {
  _id: string
  avatar?: string
  username: StringDecoder
  name: string
  surname: string
  role: Role
  createAt: Date
  updateAt: Date
}

interface IAuth {
  accessToken: string
  user: IUser
}
