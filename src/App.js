import './App.css';
import {useState, useRef} from "react";
import axios from "axios";
// MUI
import {Box, Button, Container, TextField} from "@mui/material";
import {customAlert} from "./utils/commonUtil";
// 컴포넌트
import Board from "./component/Board";
import Loading from "./component/Loding";
import {useNavigate} from "react-router-dom";

function App() {
    const [url, setUrl] = useState('');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const urlInputRef = useRef(null);
    let navigate = useNavigate();

    const serverUrl = 'http://localhost:3000';

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        if (!url.toLowerCase().includes('smartstore.naver.com')) {
            customAlert({
                icon : 'error',
                title: 'Oops...',
                text : '입력하신 URL 확인 부탁드립니다.'
            }).then(() => {
                setTimeout(() => {
                    urlInputRef.current.focus();
                }, 300);
            });
        } else {
            getHtml().then(response => {
                setTableData(response.data);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
                customAlert({
                    icon : 'error',
                    title: 'Oops...',
                    text : '다시 시도 부탁드립니다.'
                }).then(() => {
                    navigate('/');
                });
            });
        }
        e.preventDefault();
    }


    /**
     * 크롤링 이후 데이터 가져오는 api 호출
     * @returns {Promise<AxiosResponse<any>>}
     */
    const getHtml = async () => {
        setLoading(true);
        return await axios.post(`${serverUrl}/getReview`, {url: url}, {timeout: 10000});
    };

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        setUrl(e.currentTarget.value);
    }

    return (
        <Container>
            {loading && <Loading/>}
            <Box
                component="form"
                onSubmit={onSubmitHandler}
                sx={{
                    marginTop    : 8,
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <TextField variant="standard" autoFocus fullWidth label="URL을 입력해주세요." value={url} inputRef={urlInputRef}
                           onChange={onUrlHandler}/>
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={!url}>확인</Button>
                <Board tableData={tableData}/>
            </Box>
        </Container>
    );
}

export default App;
