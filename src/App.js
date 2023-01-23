import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';

import Loading from './component/Loding';
import Review from './pages/Review';
import Menubar from './component/Menubar';
import Main from './component/Main';
import Keyword from './pages/Keyword';
import Date from './pages/Date';
import { useLoadingState } from './contexts/loadingContext';
import { UrlProvider } from './contexts/urlContext';
import { FetchDataProvider } from './contexts/fetchDataContext';

function App() {

    const loadingState = useLoadingState();
    const { loading } = loadingState;

    return (
        <UrlProvider>
            <FetchDataProvider>
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
            </FetchDataProvider>
        </UrlProvider>
    );
}

export default App;
