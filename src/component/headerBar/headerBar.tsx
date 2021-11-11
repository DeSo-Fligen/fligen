import { useTranslation } from 'react-i18next';
import { hooks } from '../../utils/hooks';
import Capsule from '../capsule/capsule';
import "./headerBar.scss";

function HeaderBar () {
    const { t } = hooks.useTranslationPrefix('header')
    const current = hooks.useSelector(state => state.account.current);
    let a = '1Li7WqR5ZdRbsuhvfbib83w3R7tX9dkMxY';
    
    // const content;
    return (
        <div className="status-bar flex1 h100">
            <Capsule title={t('address')} content={current || t('have_not')}></Capsule>
        </div>
    )
}
export default HeaderBar;