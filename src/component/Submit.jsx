import { Box, Button, TextField, Typography } from '@mui/material';
import { Fragment, useRef } from 'react';
import { urlValidate } from '../utils/validateUtil';
import axios from '../apis/smartBenchmark';
import { useAxios } from '../customHooks/useAxios';
import { useUrlDispatch, useUrlState } from '../contexts/urlContext';
import { useFetchDataDispatch } from '../contexts/fetchDataContext';

const Submit = ({ pageUrl, menuName }) => {

    const urlInputRef = useRef(null);
    const [axiosFetch] = useAxios();

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
        const fetchObj = {};

        switch (pageUrl) {
            case 'keyword' :
                fetchObj.axiosUrl = '/getKeyword';
                fetchObj.type = 'SET_KEYWORD_DATA';
                break;
            case 'date' :
                fetchObj.axiosUrl = '/getProductDate';
                fetchObj.type = 'SET_DATE_DATA';
                break;
            case 'review' :
                fetchObj.axiosUrl = '/getReview';
                fetchObj.type = 'SET_REVIEW_DATA';
                break;
            default:
                break;
        }

        const { axiosUrl, type } = fetchObj;

        await axiosFetch({
            axiosInstance: axios,
            method       : 'POST',
            url          : axiosUrl,
            requestConfig: { url },
        }).then(res => {
            if (res.data) fetchDataDispatch({ type, [pageUrl]: res });
        });
    };

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        urlDispatch({ type: 'SET_URL', url: e.currentTarget.value });
    };

    return (
        <Fragment>
            <Typography variant='h5' component='div' style={{ textAlign: 'center', marginTop: '20px' }}>
                {menuName}
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
                <TextField
                    variant='standard'
                    autoFocus
                    fullWidth
                    label='URL을 입력해주세요.'
                    value={url}
                    inputRef={urlInputRef}
                    onChange={onUrlHandler}
                />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={!url}>
                    확인
                </Button>
            </Box>
        </Fragment>
    );
};

export default Submit;