import { Author } from "./authors"

export type Comment = {
    id: number
    created: string
    text: string
    author: number
    parent?: number
    likes: number
}

export type Pagination = {
    page: number
    size: number
    total_pages: number
}

export type CommentWithAuthor = {
    comment: Comment
    author: Author
}

export type CommentWithChildren = Comment & {
    children: CommentWithChildren[]
}

export type TotalLikesAndCommentsResponse = {
    totalLikes: number
    totalComments: number
}

export type CommentsPageResponse = {
    pagination: Pagination
    comments: Comment[]
}