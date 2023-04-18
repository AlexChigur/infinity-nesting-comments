import React, { useEffect, useState } from "react"
import { Author } from "src/entities/authors"
import { Comment } from "src/entities/comments"
import { CommentsListItem } from "./CommentsListItem"
import { getRepliesByCommentId } from "src/services/comments"
import { getAuthorByCommentId } from "src/services/authors"
import '../../styles/commentList.css'
import { BaseButton } from "../base/BaseButton"
import { TotalLikesAndComments } from "./TotalLikesAndComments"

type CommentsListProps = {
   list: Comment[],
   authors: Author[]
}

export const CommentsList = ({ list, authors }: CommentsListProps) => {

    const rootComments = list.filter(
        (comment) => comment.parent === null
      );

    const getReplies = (list: Comment[], commentId: number): Comment[] => {
        return getRepliesByCommentId(commentId, list)
    }

    const getAuthor = (authors: Author[], commentId: number): Author | undefined => {
        return getAuthorByCommentId(commentId, authors)
    }

    return (
        <div className="comment-list">
            <TotalLikesAndComments 
                totalComments={267} 
                totalLikes={232} 
            />
            {rootComments.map(c => 
                <CommentsListItem
                    key={c.id} 
                    comment={c} 
                    allComments={list}
                    replies={getReplies(list, c.id)} 
                    getReplies={getReplies}
                    author={getAuthor(authors, c.author)}
                    getAuthor={getAuthor}
                    authors={authors}
                />
                )
            }
            <BaseButton
                padding="15px 0 0 0"
                buttonText="More"
            />
        </div>
    )
}