import { Fragment, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import DateBoard from '../component/DateBoard';
import { urlValidate } from '../utils/validateUtil';
import { useAxios } from '../customHooks/useAxios';
import axios from '../apis/smartBenchmark';
import { useUrlDispatch, useUrlState } from '../contexts/urlContext';
import { useFetchDataDispatch } from '../contexts/fetchDataContext';

const Date = () => {
    const [fetchProductObj, axiosFetch] = useAxios();
    const urlInputRef = useRef(null);

    const urlState = useUrlState();
    const urlDispatch = useUrlDispatch();

    const { url } = urlState;
    const fetchDataDispatch = useFetchDataDispatch();

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
            url          : '/getProductDate',
            requestConfig: { url },
        });
    };

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        urlDispatch({ type: 'SET_URL', url: e.currentTarget.value });
    };

    useEffect(() => {
        if (fetchProductObj) fetchDataDispatch({ type: 'SET_DATE_DATA', date: fetchProductObj });
    }, [fetchDataDispatch, fetchProductObj]);


    return (
        <Fragment>
            <Typography variant='h5' component='div' style={{ textAlign: 'center', marginTop: '20px' }}>
                등록일자
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
            </Box>
            <DateBoard fetchProductObj={fetchProductObj} />
        </Fragment>
    );
};

export default Date;