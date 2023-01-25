import { Box, Divider, IconButton, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Fragment } from 'react';
import { urlValidate } from '../utils/validateUtil';
import axios from '../apis/smartBenchmark';
import { useAxios } from '../customHooks/useAxios';
import { useUrlDispatch, useUrlState } from '../contexts/urlContext';
import { useFetchDataDispatch } from '../contexts/fetchDataContext';

const Submit = ({ pageUrl, menuName }) => {

    const { axiosFetch } = useAxios();

    const urlState = useUrlState();
    const urlDispatch = useUrlDispatch();

    const { url } = urlState;
    const fetchDataDispatch = useFetchDataDispatch();


    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await urlValidate(url);
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
            if (res) fetchDataDispatch({ type, [pageUrl]: res });
        });
    };

    /**
     * URL 입력 시 이벤트
     * @param e
     */
    const onUrlHandler = (e) => {
        urlDispatch({ type: 'SET_URL', url: e.currentTarget.value });
    };

    /**
     * URL 초기화
     */
    const onUrlRemoveHandler = () => {
        urlDispatch({ type: 'SET_URL', url: '' });
    };

    return (
        <Fragment>
            <Typography variant='h5' component='div' style={{ textAlign: 'center', marginTop: '20px' }}>
                {menuName}
            </Typography>
            <Box
                onSubmit={onSubmitHandler}
                sx={{
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <Paper
                    component='form'
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%', marginBottom: '15px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='URL을 입력해주세요.'
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={url}
                        onChange={onUrlHandler}
                        autoFocus
                    />
                    <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={onSubmitHandler}>
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
                    <IconButton color='primary' sx={{ p: '10px' }} aria-label='directions' onClick={onUrlRemoveHandler}>
                        <ClearIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Fragment>
    );
};

export default Submit;