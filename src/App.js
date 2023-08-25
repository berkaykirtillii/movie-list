import { Header } from "antd/es/layout/layout";
import "./styles/main.css";
import { ConfigProvider, Layout } from "antd";
import MovieList from "./pages/MovieList";
import "./i18n";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";

function App() {
    //şuan sadece browser dil kontrolü yaparak dil seçeneği veriyor
    const defaultLang =
        localStorage.getItem("i18nextLng") === "tr" ? trTR : enUS;

    return (
        <ConfigProvider locale={defaultLang}>
            <Layout>
                <Header>
                    <img
                        src={require("./assets/logo-transparent.png")}
                        className="navbar-logo"
                        alt="Movier"
                    />
                </Header>
                <div className="page-content">
                    <MovieList />
                </div>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
