import './App.css';
import {useState} from "react";
import axios from "axios";
// MUI
import {Container} from "@mui/material";
// 컴포넌트
import Loading from "./component/Loding";
import Review from "./component/Review";
import Menubar from "./component/Menubar";
import {Route, Routes} from "react-router-dom";
import Main from "./component/Main";
import Keyword from "./component/Keyword";
import Date from "./component/Date";


function App() {

    const [loading, setLoading] = useState(false);
    axios.defaults.baseURL = `http://${window.location.hostname}:3000`;
    /**
     * axios then 이나 catch 처리되기 전의 요청 응답의 공통 기능 처리
     */
    axios.interceptors.request.use(
        config => {
            setLoading(true);
            return config;
        },
        error => {
            setLoading(true);
            return Promise.reject(error);
        }
    )
    axios.interceptors.response.use(
        config => {
            setLoading(false);
            return config;
        },
        error => {
            setLoading(false);
            return Promise.reject(error);
        }
    )

    return (
        <Container>
            <Menubar/>
            {loading && <Loading/>}
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/keyword" element={<Keyword/>}/>
                <Route path="/review" element={<Review/>}/>
                <Route path="/date" element={<Date/>}/>
            </Routes>
        </Container>
    );
}

export default App;
