import './App.scss';
import StatusBar from './component/statusBar/statusBar';
import SideBar from './component/sideBar/sideBar';
import {HashRouter, Route} from "react-router-dom";
import { routerList } from './utils/router';

function App() {
  return (
    <div className="main-container">
      <div className="header-container">
        <StatusBar></StatusBar>
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
