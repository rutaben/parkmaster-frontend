import { ToastContainer } from "react-toastify";
import Router from "./routing/Router";
import store from "./store/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  );
};

export default App;
