import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Container } from '@mui/material';

import Loading from './component/Loding';
import Review from './pages/Review';
import Menubar from './component/Menubar';
import Main from './component/Main';
import Keyword from './pages/Keyword';
import Date from './pages/Date';


function App() {

    const [loading, setLoading] = useState(false);

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
        },
    );
    axios.interceptors.response.use(
        config => {
            setLoading(false);
            return config;
        },
        error => {
            setLoading(false);
            return Promise.reject(error);
        },
    );

    return (
        <Container>
            <Menubar />
            {loading && <Loading />}
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/keyword' element={<Keyword />} />
                <Route path='/date' element={<Date />} />
                <Route path='/review' element={<Review />} />
            </Routes>
        </Container>
    );
}

export default App;
