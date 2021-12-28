// images
import draftImg from "../assets/img/icon/ico-draft.png";
import netImg from "../assets/img/icon/ico-net.png";
import mailboxImg from "../assets/img/icon/ico-mailbox.png";
import settingImg from "../assets/img/icon/ico-setting.png";
import accountImg from "../assets/img/icon/ico-key.png";

// components
import Draft from "../page/Draft";
import Activity from "../page/Activity";
import Mailbox from "../page/Mailbox";
import Setting from "../page/Setting";
import Account from "../page/Account";

export const routerList = [
    {
        name: 'account',
        icon: accountImg,
        path: `/`,
        exact: true,
        component: Account
    },
    {
        name: 'draft',
        icon: draftImg,
        path: `/draft`,
        exact: true,
        component: Draft
    },
    {
        name: 'activity',
        icon: netImg,
        path: `/activity`,
        exact: true,
        component: Activity
    },
    {
        name: 'mailbox',
        icon: mailboxImg,
        path: `/mailbox`,
        exact: true,
        component: Mailbox,
    },
    {
        name: 'setting',
        icon: settingImg,
        path: `/setting`,
        exact: true,
        component: Setting
    },
]