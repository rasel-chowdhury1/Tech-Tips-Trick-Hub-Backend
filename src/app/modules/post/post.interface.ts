import { Types } from 'mongoose'

type TCategory =
  | 'software_engineering'
  | 'tech'
  | 'ml'
  | 'vr'
  | 'watch'
  | 'mobile'
  | 'macbook'
  | 'gaming'
  | 'others'

export interface TComment {
  commenter: Types.ObjectId
  content: string
  _id: string
}
export interface TPost {
  title: string
  content: string
  cover: string
  tags: 'premium' | 'everyone'
  comments?: TComment[]
  commentsCount?: number
  upVotes: Types.ObjectId[]
  downVotes: Types.ObjectId[]
  author: Types.ObjectId
  category: TCategory
  isActive: boolean
}
