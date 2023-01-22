import { Fragment, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ReviewBoard from '../component/ReviewBoard';
import { urlValidate } from '../utils/validateUtil';
import { useAxios } from '../customHooks/useAxios';
import axios from '../apis/smartBenchmark';

const Review = () => {
    const [url, setUrl] = useState('');
    const urlInputRef = useRef(null);
    const [tableData, axiosFetch] = useAxios();
    const errorCallBack = () => {
        setTimeout(() => {
            urlInputRef.current.focus();
        }, 300);
    };

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await urlValidate(url, errorCallBack);
        await axiosFetch({
            axiosInstance: axios,
            method       : 'POST',
            url          : '/getReview',
            requestConfig: { url },
        });
    };

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        setUrl(e.currentTarget.value);
    };

    return (
        <Fragment>
            <Typography variant='h5' component='div' style={{ textAlign: 'center', marginTop: '20px' }}>
                리뷰
            </Typography>
            <Box
                component='form'
                onSubmit={onSubmitHandler}
                sx={{
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <TextField variant='standard' autoFocus fullWidth label='URL을 입력해주세요.' value={url}
                           inputRef={urlInputRef}
                           onChange={onUrlHandler} />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={!url}>확인</Button>
                <ReviewBoard tableData={tableData} />
            </Box>
        </Fragment>
    );
};

export default Review;
