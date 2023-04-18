import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import { Author } from "src/entities/authors";

export const getAuthors = async (): Promise<Author[]> => {
    return await getAuthorsRequest()
}

export const getAuthorByCommentId = (authorCommentId: number, authors: Author[]): Author | undefined => {
    return authors.find(author => author.id === authorCommentId)
}