import { Author } from "src/entities/authors"
import { Comment } from "src/entities/comments"
import '../../styles/commentListItem.css'
import like from '../../assets/images/like.png'
import { getCommentDate } from "src/services/comments"
import React from "react"

type CommentListItemProps = {
    comment: Comment
    allComments: Comment[] 
    replies: Comment[]
    author: Author | undefined
    authors: Author[]
    getReplies: (list: Comment[], repliesId: number) => Comment[]
    getAuthor: (list: Author[], commentId: number) => Author | undefined
}

export const CommentsListItem = React.memo(({
    comment, 
    replies,
    authors,
    allComments,
    author, 
    getReplies, 
    getAuthor
}: CommentListItemProps) => {
    return (
        <div className="comment-list-item">
            <div className="root-comment">
                <img className="author-image" src={author?.avatar} alt={author?.name} />
                <div className="comment-info">
                    <div className="comment-header">
                        <div className="name-and-created">
                        {author?.name}
                        <span className="created-at">
                            {getCommentDate(comment.created)}
                        </span>
                        </div>
                        <div className="likes">
                            <img className="img-like" src={like} alt="like"/>
                            {comment.likes}
                        </div>
                    </div>
                    {comment.text}
                </div>
            </div>
            <div className="replies-block">
                    {replies.map(r => {
                        return <CommentsListItem
                                key={r.id} 
                                comment={r}
                                allComments={allComments}  
                                replies={getReplies(allComments, r.id)} 
                                getReplies={getReplies}
                                getAuthor={getAuthor}
                                author={getAuthor(authors, r.author)}
                                authors={authors}
                            />
                        })
                    }
                </div>
        </div>
    )
}, (prev, current) => prev.comment.id === current.comment.id)