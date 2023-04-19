import { useEffect } from "react"
import '../../styles/errorNotification.css'

type ErrorNotificationPorps = {
    clearError: (value: boolean) => void
}

export const ErrorNotification = ({clearError}: ErrorNotificationPorps) => {
    useEffect(() => {
        setTimeout(() => clearError(false), 2000)
    }, [])
    return (
        <div className="error-notification">
            Something went wrong! Please, try again.
        </div>
    )
}