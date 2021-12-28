import { useState } from "react";
import { useTranslation } from "react-i18next";
import { routerList } from "../../utils/router";

function SideBar() {
    const { t } = useTranslation()
    const [selectIndex, setSelectIndex] = useState(0);

    const onItemClick = (index: number, hash: string) => {
        setSelectIndex(index)
        window.location.hash = hash
    }
    return (
        <div className="overflow-scroll scrollbar-hidden flex items-center flex-col h-full">
            {routerList.map((item, index) => (
                <div className={`w-[120px] min-w-[100px] h-[100px] min-h-[100px] cursor-pointer select-none flex items-center justify-center flex-col ${selectIndex === index ? 'bg-gray-200' : ''}`}
                    onClick={() => onItemClick(index, item.path)}
                    key={index}>
                    <div className="flex">
                        <img className="w-[40px] h-[40px]" src={item.icon} alt={item.name}></img>
                    </div>
                    <div className="text-center">{t(`side.${item.name}`)}</div>
                </div>
            ))}
        </div>
    )
}

export default SideBar