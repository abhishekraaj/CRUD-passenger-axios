// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './STORE/store';
import Uipage from './PASENGERUI/Uipage';

function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <div className="App">
          <h1>PASSENGERS</h1>
          <Uipage />
        </div>
      </Provider>

    </div>
  );
}

export default App;
