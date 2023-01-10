import {Fragment, useRef, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import KeywordBoard from "./KeywordBoard";
import {serviceCall} from "../utils/callUtil";

const Keyword = () => {

    const [product, setProduct] = useState('');
    const prdInputRef = useRef(null);
    const [tableData, setTableData] = useState([]);

    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        serviceCall.get(`/keywordstool?searchkeyword=${product}`, (returnData) => {
            setTableData(returnData);
        });
    }

    /**
     * 상품명 입력 시 이벤트
     * @param e
     */
    const onPrdHandler = (e) => {
        setProduct(e.currentTarget.value);
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
                <TextField variant="standard" autoFocus fullWidth label="제품명을 입력해주세요." value={product}
                           inputRef={prdInputRef}
                           onChange={onPrdHandler}/>
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={!product}>확인</Button>
            </Box>
            <KeywordBoard tableData={tableData}/>
        </Fragment>
    )
}

export default Keyword;