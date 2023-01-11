import {Fragment, useRef, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import KeywordBoard from "./KeywordBoard";
import {serviceCall, tryCatchCall} from "../utils/callUtil";
import {urlValidate} from "../utils/commonUtil";

const Keyword = () => {

    const [url, setUrl] = useState('');
    const urlInputRef = useRef(null);
    const [tableData, setTableData] = useState([]);

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        tryCatchCall(() => {
            urlValidate(url, urlInputRef);
            serviceCall.post('/getKeyWord', {url: url}, (returnData) => {
                setTableData(returnData);
            });
        })
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
                키워드
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
            </Box>
            <KeywordBoard tableData={tableData}/>
        </Fragment>
    )
}

export default Keyword;