import '../../styles/baseButton.css'

type BaseButtonProps = {
    buttonText: string
    padding?: string
}

export const BaseButton = ({buttonText, padding}: BaseButtonProps) => {
    return (
        <div 
            className="base-button"
            style={{ padding: padding }}
        >
            <button className='button'>{buttonText}</button>
        </div>
    )
}