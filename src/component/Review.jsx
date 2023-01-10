import {Fragment, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import ReviewBoard from "./ReviewBoard";
import {serviceCall} from "../utils/callUtil";
import {urlValidate} from "../utils/commonUtil";

const Review = () => {

    const [url, setUrl] = useState('');
    const [tableData, setTableData] = useState([]);
    const urlInputRef = useRef(null);
    const navigate = useNavigate();

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await urlValidate(url, urlInputRef);
            serviceCall.post('/getReview', {url: url}, (returnData) => {
                setTableData(returnData);
            }, () => {
                navigate('/review');
            });
        } catch (e) {
            alert(e);
        }
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
