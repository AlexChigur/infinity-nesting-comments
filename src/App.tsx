import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CommentsList } from "./components/comments/CommentsList";
import { getAuthors } from "./services/authors";
import { Author } from "./entities/authors";
import { Comment, CommentWithAuthor, CommentWithChildren } from "./entities/comments";
import { getComments } from "./services/comments";
import './styles/main.css'

function App() {
    const [comments, setComments] = useState<Comment[]>([])
    const [authors, setAuthors] = useState<Author[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
  
    const fetchData = async () => {
        const authors = await getAuthors()
        setAuthors(authors)
        const comments = await getComments(1)
        if (comments) {
            setComments(comments)
            setIsLoading(false)
        }
    }

    useEffect(() => {
       fetchData()
    }, [])

    return (
        <div className="App">
            <CommentsList 
                list={comments}
                authors={authors}
            />
        </div>
    );
}

export default App;
