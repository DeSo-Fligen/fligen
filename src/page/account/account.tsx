import { FC } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { hooks } from "../../utils/hooks";
import "./account.scss";

const Account: FC = () => {
    const accounts = hooks.useSelector(state => state.account.accounts);
    return (
        <div className="account p-4">
            <div className="account_list">
                <ListGroup className="w-auto">
                    {accounts.map(item => (
                        <ListGroup.Item className="address text-ellipsis" key={item}>{item}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

export default Account;