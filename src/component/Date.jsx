import {Fragment, useRef, useState} from "react";
import {Box, Button, Card, CardContent, CardMedia, Divider, Grid, Tab, TextField, Typography} from "@mui/material";
import axios from "axios";
import {customAlert} from "../utils/commonUtil";
import {useNavigate} from "react-router-dom";
import {TabContext, TabList, TabPanel} from "@mui/lab";


const ProductItem = ({productId, regDate, thumbnail, reviewAmount, saleAmount, delivery}) => {

    const {averageReviewScore, totalReviewCount} = reviewAmount;
    const {cumulationSaleCount, recentSaleCount} = saleAmount;

    const deliveryArr = delivery.split('\n');

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={productId}>
            <Card sx={{maxWidth: 300}}>
                <CardMedia id={`cardImage_${productId}`} component="img" image={thumbnail}/>
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                        등록일자 : {regDate}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        총 판매량 : {cumulationSaleCount}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        주 판매량 : {recentSaleCount}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        총 리뷰 개수 : {totalReviewCount}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        리뷰 점수 : {averageReviewScore}
                    </Typography>
                    <Divider>배송 기간</Divider>
                    <Typography gutterBottom variant="h7" component="div">
                        {deliveryArr[0]} : {deliveryArr[1]}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        {deliveryArr[2]} : {deliveryArr[3]}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        {deliveryArr[4]} : {deliveryArr[5]}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                        {deliveryArr[6]} : {deliveryArr[7]}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

const ProductList = ({productData}) => {

    if (!productData) return null;
    return (
        <Fragment>
            {productData.map(({productId, regDate, thumbnail, reviewAmount, saleAmount, delivery}) => (
                <ProductItem
                    key={productId}
                    productId={productId}
                    regDate={regDate}
                    thumbnail={thumbnail}
                    reviewAmount={reviewAmount}
                    saleAmount={saleAmount}
                    delivery={delivery}
                />
            ))}
        </Fragment>
    )
}

export default function Date() {

    const [url, setUrl] = useState('');
    const [productObj, setProductObj] = useState({});
    const urlInputRef = useRef(null);
    const navigate = useNavigate();
    /**
     * 확인버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        if (isUrlValidate()) {
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
            axios.post('/getProductDate', {url: url})
                .then(response => {
                    setProductObj(response.data);
                })
                .catch(() => {
                    customAlert({
                        icon : 'error',
                        title: 'Oops...',
                        text : '다시 시도 부탁드립니다.'
                    }).then(() => {
                        navigate('/date');
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

    /**
     * URL 검증 이벤트
     * @returns {boolean}
     */
    const isUrlValidate = () => {
        return !url.toLowerCase().includes('smartstore.naver.com');
    }

    const [value, setValue] = useState('3');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Fragment>
            <Typography variant="h5" component="div" style={{textAlign: 'center', marginTop: '20px'}}>
                등록일자
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
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="일간" value="1" disabled={true}/>
                        <Tab label="주간" value="2" disabled={true}/>
                        <Tab label="월간" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container spacing={3} mt={1}>
                        <ProductList productData={productObj.DAILY}/>
                    </Grid>
                </TabPanel>
                <TabPanel value="2">
                    <Grid container spacing={4} mt={5}>
                        <ProductList productData={productObj.WEEKLY}/>
                    </Grid>
                </TabPanel>
                <TabPanel value="3">
                    <Grid container spacing={4} mt={5}>
                        <ProductList productData={productObj.MONTHLY}/>
                    </Grid>
                </TabPanel>
            </TabContext>

        </Fragment>
    );
}