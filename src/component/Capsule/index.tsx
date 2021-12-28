import { ReactNode } from "react"
// import "./capsule.scss";

interface CapsuleProps {
    title: ReactNode
    content: ReactNode
}
function Capsule (props: CapsuleProps) {
    const { title, content } = props
    return (
        <div className="flex items-center w-auto rounded overflow-hidden text-white cursor-pointer" style={{
            background: `linear-gradient(to bottom, #5f5f5f, #4e4e4e)`
        }}>
            <div className="py-1 pr-1 pl-3">{title}</div>
            <div className="py-1 pr-3 pl-1">{content}</div>
        </div>
    )
}
export default Capsule