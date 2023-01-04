import {Fragment, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {customAlert, isUrlValidate} from "../utils/commonUtil";
import {Box, Button, TextField, Typography} from "@mui/material";
import ReviewBoard from "./ReviewBoard";

const Review = () => {

    const [url, setUrl] = useState('');
    const [tableData, setTableData] = useState([]);
    const urlInputRef = useRef(null);
    const navigate = useNavigate();

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        if (isUrlValidate(url)) {
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
            axios.post('/getReview', {url: url})
                .then(response => {
                    setTableData(response.data);
                })
                .catch(() => {
                    customAlert({
                        icon : 'error',
                        title: 'Oops...',
                        text : '다시 시도 부탁드립니다.'
                    }).then(() => {
                        navigate('/review');
                    });
                });
        }
        e.preventDefault();
    }

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        setUrl(e.currentTarget.value);
    }

    return (
        <Fragment>
            <Typography variant="h5" component="div" style={{textAlign: 'center', marginTop: '20px'}}>
                리뷰
            </Typography>
            <Box
                component="form"
                onSubmit={onSubmitHandler}
                sx={{
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <TextField variant="standard" autoFocus fullWidth label="URL을 입력해주세요." value={url}
                           inputRef={urlInputRef}
                           onChange={onUrlHandler}/>
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={!url}>확인</Button>
                <ReviewBoard tableData={tableData}/>
            </Box>
        </Fragment>
    )
}

export default Review;
