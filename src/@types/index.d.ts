interface IAuth {
  accessToken: string
  user: IUser
}

interface IUser {
  _id: string
  avatar?: string
  username: StringDecoder
  name: string
  surname: string
  role: import('~/entities/enums').Role
  createAt: string
  updateAt: string
}

interface IPost {
  _id: string
  image?: string
  message: string
  likes: Array<IUser>
  author: IUser
  location: string
  status: import('~/entities/enums').Status
  createdAt: string
  updatedAt: string
}

type TPostData = {
  message: string
  image?: string
  location: string
  status?: Status
}

type TEventInput = import('react').ChangeEvent<HTMLInputElement & HTMLTextAreaElement>

type TEventForm = import('react').FormEvent<HTMLFormElement>

type TEventSelect = import('react').ChangeEvent<HTMLSelectElement>
