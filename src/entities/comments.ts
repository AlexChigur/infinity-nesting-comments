import { Author } from "./authors"

export type Comment = {
    id: number
    created: string
    text: string
    author: number
    parent?: number
    likes: number
}

export type CommentWithAuthor = {
    comment: Comment
    author: Author
}

export type CommentWithChildren = Comment & {
    children: CommentWithChildren[]
}