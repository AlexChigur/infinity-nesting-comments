import getCommentsRequest from "src/api/comments/getCommentsRequest"
import { Author } from "src/entities/authors"
import { Comment, CommentWithChildren } from "src/entities/comments"

export const fetchComments = async (page: number): Promise<Comment[]> => {
    const response = await getCommentsRequest(page)
    return response.data
}

export const getComments = async (page: number): Promise<Comment[] | undefined> => {
    try {
        const comments = await fetchComments(page);

  
        const sortedComments = comments.sort((a, b) => Number(new Date(b.created)) - Number(new Date(a.created)))
        
        return sortedComments
    } catch (e) {
        console.log(e)
    }
}


export const getRepliesByCommentId = (commentId: number, comments: Comment[]): Comment[] => {
    return comments
        .filter((comment) => comment.parent === commentId)
        .sort((a, b) => Number(new Date(b.created)) - Number(new Date(a.created)))
}

export const getCommentDate = (date: string): string => {
   return  new Date(date).getDay() === new Date().getDay()
        ? `${new Date().getHours() - new Date(date).getHours()} hours ago`
        : new Date(date).toLocaleDateString(
            undefined, 
            {
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            })
}