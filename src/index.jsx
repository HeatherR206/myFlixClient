import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const MyFlixApplication = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainView />
            </BrowserRouter>
        </Provider>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApplication />);