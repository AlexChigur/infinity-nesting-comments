import '../../styles/spinner.css'

export type SpinnerProps = {
    width?: number
    height?: number
}

export const Spinner = ({width = 20, height = 20}: SpinnerProps) => 
    <div 
        style={{ width, height }}
        className="loader"
    />;