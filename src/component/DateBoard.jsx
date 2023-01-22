import { Fragment, useEffect, useState } from 'react';
import {
    Card, CardContent,
    CardMedia, Divider, ImageList, ImageListItem,
    Typography,
} from '@mui/material';

import { isEmptyObj, setLocaleString } from '../utils/commonUtil';

const DateBoard = ({ fetchProductObj }) => {

    const [thumbnailImage, setThumbnailImage] = useState('');
    const [productObj, setProductObj] = useState({});

    useEffect(() => {
        setProductObj(fetchProductObj);
        setThumbnailImage(fetchProductObj?.thumbnail);
    }, [fetchProductObj]);

    if (!fetchProductObj) return;
    if (isEmptyObj(productObj)) return;

    setLocaleString(productObj.reviewAmount);
    setLocaleString(productObj.saleAmount);

    const { productId, regDate, images, delivery } = productObj;
    const { averageReviewScore, totalReviewCount } = productObj.reviewAmount;
    const { cumulationSaleCount, recentSaleCount } = productObj.saleAmount;

    const onImageMouserOverHandler = (event) => {
        setThumbnailImage(event.currentTarget.src);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
            <CardMedia id={`card_main_Image_${productId}`} component='img' image={thumbnailImage} />
            <ImageList
                sx={{ width: 500, marginLeft: 5, marginRight: 5 }}
                variant='quilted'
                cols={6}
                rowHeight={100}
                key={1}
            >
                {images && images.map((item) => (
                    <ImageListItem key={item.url}>
                        <img src={item.url}
                             alt={item.title}
                             loading='lazy'
                             key={item.url}
                             onMouseOver={onImageMouserOverHandler}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <CardContent sx={{ marginTop: 5 }}>
                <Typography gutterBottom variant='h7' component='div'>
                    등록일자 : {regDate}
                </Typography>
                <Typography gutterBottom variant='h7' component='div'>
                    총 판매량 : {cumulationSaleCount}
                </Typography>
                <Typography gutterBottom variant='h7' component='div'>
                    주 판매량 : {recentSaleCount}
                </Typography>
                <Typography gutterBottom variant='h7' component='div'>
                    총 리뷰 개수 : {totalReviewCount}
                </Typography>
                <Typography gutterBottom variant='h7' component='div'>
                    리뷰 점수 : {averageReviewScore}
                </Typography>
                <Divider>배송 기간</Divider>
                <Fragment>
                    {delivery && delivery.map((data, index) => {
                        setLocaleString(data);
                        return (
                            <Typography gutterBottom variant='h7' component='div' key={index}>
                                {`${data.rangeNumberText}${data.rangeText} ${data.leadTimeCount}건 (${data.leadTimePercent}%)`}
                            </Typography>
                        );
                    })}
                </Fragment>
            </CardContent>
        </Card>
    );
};

export default DateBoard;