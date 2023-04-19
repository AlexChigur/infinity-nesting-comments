import '../../styles/baseButton.css'
import { Spinner } from './Spinner'

type BaseButtonProps = {
    buttonText: string
    padding?: string
    onClick: () => void,
    isLoading?: boolean
}

export const BaseButton = ({
    buttonText, 
    padding, 
    onClick, 
    isLoading = false
}: BaseButtonProps) => {
    return (
        <div 
            className="base-button"
            style={{ padding: padding }}
        >
            <button 
                className='button'
                onClick={onClick}
            >
                {isLoading ? <Spinner /> : buttonText}
            </button>
        </div>
    )
}