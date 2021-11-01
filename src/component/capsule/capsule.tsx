import { ReactNode } from "react"
import { useTranslation } from "react-i18next";
import "./capsule.scss";

interface CapsuleProps {
    title: string
    content: string
}
function Capsule (props: CapsuleProps) {
    const { t } = useTranslation()

    return (
        <div className="capsule flex1">
            <div className="title">{t(props.title)}</div>
            <div className="content">{t(props.content)}</div>
        </div>
    )
}
export default Capsule