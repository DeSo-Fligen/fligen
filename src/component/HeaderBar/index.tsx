import { hooks } from '../../utils/hooks';
import Capsule from '../Capsule';

function HeaderBar () {
    const { t } = hooks.useTranslationPrefix('header')
    const current = hooks.useSelector(state => state.account.accounts);
    
    return (
        <div className="text-sm px-5 box-border">
            <Capsule title={t('address')} content={current[0] || t('have_not')}></Capsule>
        </div>
    )
}
export default HeaderBar;