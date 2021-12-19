import './App.scss';
import HeaderBar from './component/headerBar/headerBar';
import SideBar from './component/sideBar/sideBar';
import { HashRouter, Route}  from "react-router-dom";
import { routerList } from './utils/router';
import { useEffect } from 'react';
import store from './state/store';
import { accountActions } from './state/actions/accountAction';
import { getWeb3 } from './web3/web3';

function App() {
  useEffect(() => {
    (async() => {
      try {
        const web3 = await getWeb3();
        window.web3 = web3;
        const accounts = await web3.eth.getAccounts();
        store.dispatch(accountActions.addAccount(accounts));
        console.log(web3)
      } catch(e) {
        console.error(e);
      }
    })();
  }, [])

  return (
    <div className="main-container">
      <div className="header-container">
        <HeaderBar></HeaderBar>
      </div>
      <div className="mid-container flex1">
        <SideBar></SideBar>
        <HashRouter>
          <div className="content-container">
            {routerList.map(item => (
              <Route key={item.name} path={item.path} exact={item.exact} component={item.component}></Route>
            ))}
          </div>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
