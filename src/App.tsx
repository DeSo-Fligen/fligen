import HeaderBar from './component/HeaderBar';
import SideBar from './component/SideBar';
import { HashRouter, Route}  from "react-router-dom";
import { routerList } from './utils/router';
import { useEffect } from 'react';
import store from './state/store';
import { accountActions } from './state/actions/accountAction';
import { getWeb3 } from './web3/web3';
import Web3 from 'web3';

function App() {
  // getWeb3()
  //     .then(web3 => {
  //       window.web3 = web3;
  //       // return web3.eth.getAccounts();
  //     })
  //     .then(accounts => {
  //       // store.dispatch(accountActions.addAccount(accounts));
  //     })
  //     .catch(console.error)
  // const web3 = new Web3((window as any).ethereum)
  // console.log(window.web3)

  return (
    <div className="w-screen h-screen">
      <div className="h-[44px] flex items-center">
        <HeaderBar></HeaderBar>
      </div>
      <div className="h-[calc(100vh-44px)] flex items-center">
        <SideBar></SideBar>
        <HashRouter>
          <div className="h-full flex-1 bg-slate-50 overflow-scroll scroll-hidden">
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
