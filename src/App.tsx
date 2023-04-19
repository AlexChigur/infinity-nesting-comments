import { useEffect, useState } from "react";
import { CommentsList } from "./components/comments/CommentsList";
import { getAuthors } from "./services/authors";
import { Author } from "./entities/authors";
import { Comment } from "./entities/comments";
import { getComments } from "./services/comments";
import './styles/main.css'
import { TotalLikesAndComments } from "./components/comments/TotalLikesAndComments";
import { BaseButton } from "./components/base/BaseButton";
import { ErrorNotification } from "./components/base/ErrorNotification";
import { Spinner } from "./components/base/Spinner";

function App() {
    const [comments, setComments] = useState<Comment[]>([])
    const [totalLikes, setTotalLikes] = useState<number>(0)
    const [totalComments, setTotalComments] = useState<number>(0)
    const [authors, setAuthors] = useState<Author[]>([])
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
    const [isMainLoading, setIsMainLoading] = useState<boolean>(true)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [hasError, setHasError] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(0)
  
    const fetchMainData = async () => {
        try {
            const authors = await getAuthors()
            setAuthors(authors)
            const response = await getComments(pageNumber)
            if (response) {
                setPageNumber(pageNumber + 1)
                setComments(response.comments)
                const totalComments = response.comments.length
                setTotalComments(totalComments)
                const totalLikes = response.comments.reduce((acc, comment) => acc + comment.likes ,0)
                setTotalLikes(totalLikes)
                setTotalPages(response.pagination.total_pages)
            }
        } catch (e) {
            setHasError(true)
        } finally {
            setIsMainLoading(false)
        }
    }

    const fetcMore = async () => {
        setIsButtonLoading(true)
        try {
            const response = await getComments(pageNumber)
            if (response) {
                setPageNumber(pageNumber + 1)
                setComments(prev => [...prev, ...response.comments])
                const totalComments = response.comments.length
                setTotalComments(prev => prev + totalComments)
                const totalLikes = response.comments.reduce((acc, comment) => acc + comment.likes ,0)
                setTotalLikes(prev => prev + totalLikes)
            }
        } catch (e) {
            setHasError(true)
        } finally {
            setIsButtonLoading(false)
        }
    }


    useEffect(() => {
       fetchMainData()
    }, [])

    return (
        <div className="App">
            { isMainLoading 
                ? <Spinner/ >
                : <div>
                    {hasError && <ErrorNotification clearError={setHasError} />}
                    <TotalLikesAndComments 
                        totalComments={totalComments} 
                        totalLikes={totalLikes} 
                    />
                    <CommentsList
                        list={comments}
                        authors={authors}
                    />
                    { pageNumber <= totalPages 
                        ? <BaseButton
                            onClick={fetcMore}
                            padding="15px 0 0 0"
                            buttonText="More"
                            isLoading={isButtonLoading}
                        />
                        : null
                    }
                  </div>
            }
        </div>
    );
}

export default App;
