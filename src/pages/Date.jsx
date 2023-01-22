import { Fragment, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import DateBoard from '../component/DateBoard';
import { urlValidate } from '../utils/validateUtil';
import { useAxios } from '../customHooks/useAxios';

const Date = () => {

    const [url, setUrl] = useState('');
    const [fetchProductObj, axiosFetch] = useAxios();
    const urlInputRef = useRef(null);

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
        setUrl(e.currentTarget.value);
    };

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