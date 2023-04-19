import getCommentsRequest from "src/api/comments/getCommentsRequest"
import { Comment, CommentsPageResponse } from "src/entities/comments"

export const fetchPageComments = async (page: number): Promise<CommentsPageResponse> => {
    const response = await getCommentsRequest(page)
    return {
        pagination: response.pagination,
        comments: response.data
    }
}

export const getComments = async (page: number): Promise<CommentsPageResponse | undefined> => {
    try {
        const response = await fetchPageComments(page);

        const sortedComments = response.comments.sort((a, b) => Number(new Date(b.created)) - Number(new Date(a.created)))
        
        return {
            pagination: response.pagination,
            comments: sortedComments
        }
    } catch (e) {
        console.log(e)
        throw Error()
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

