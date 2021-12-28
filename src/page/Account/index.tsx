import { FC } from "react";
import { hooks } from "../../utils/hooks";
// import "./account.scss";

const Account: FC = () => {
    const accounts = hooks.useSelector(state => state.account.accounts);
    return (
        <div className="account p-4">
            <div className="w-[370px]">
                {accounts.map(item => (
                    <div className="text-sm text-ellipsis" key={item}>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default Account;