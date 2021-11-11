import { PropsWithChildren } from "react";

export interface ALinkProps {
    url: string
    target?: string
    features?: string
    className?: string
}

function ALink(props: PropsWithChildren<ALinkProps>) {
    const { url, target, features, className, children } = props
    const onClick = () => {
        window.open(url, target, features);
        return false;
    }
    return (
        <a className={className} style={{cursor: 'pointer'}} onClick={onClick}>{children}</a>
    )
}
export default ALink;