import { hooks } from '../../utils/hooks';
import Capsule from '../capsule/capsule';
import "./headerBar.scss";

function HeaderBar () {
    const { t } = hooks.useTranslationPrefix('header')
    const current = hooks.useSelector(state => state.account.accounts);
    
    // const content;
    return (
        <div className="status-bar flex1 h100">
            <Capsule title={t('address')} content={current[0] || t('have_not')}></Capsule>
        </div>
    )
}
export default HeaderBar;