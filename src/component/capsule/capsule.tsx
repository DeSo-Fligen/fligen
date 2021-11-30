import { ReactNode } from "react"
import "./capsule.scss";

interface CapsuleProps {
    title: ReactNode
    content: ReactNode
    className?: string
    titleClass?: string
    contentClass?: string
}
function Capsule (props: CapsuleProps) {
    const { title, content, className, titleClass, contentClass} = props
    return (
        <div className={`capsule flex1 ${className}`}>
            <div className={`title ${titleClass}`}>{title}</div>
            <div className={`content ${contentClass}`}>{content}</div>
        </div>
    )
}
export default Capsule