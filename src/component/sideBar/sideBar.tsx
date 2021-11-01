import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { routerList } from "../../utils/router";
import "./sideBar.scss";

function SideBar() {
    const { t } = useTranslation()
    const history = useHistory()
    const [selectIndex, setSelectIndex] = useState(0);

    const onItemClick = (index: number, hash: string) => {
        setSelectIndex(index)
        window.location.hash = hash
    }
    return (
        <div className="side-bar flex2 h100">
            {routerList.map((item, index) => (
                <div className={`side-bar-item flex4 ${selectIndex == index ? 'selected' : ''}`}
                    onClick={() => onItemClick(index, item.path)}
                    key={index}>
                    <div className="flex">
                        <img className="side-ico" src={item.icon} alt={item.name}></img>
                    </div>
                    <div className="tac">{t(`side.${item.name}`)}</div>
                </div>
            ))}
        </div>
    )
}

export default SideBar