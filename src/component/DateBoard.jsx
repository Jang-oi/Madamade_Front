// MUI
import {
    Card, CardContent,
    CardMedia, Divider,
    Typography
} from "@mui/material";
import {isEmptyObj} from "../utils/commonUtil";
import {Fragment} from "react";

const DateBoard = ({productObj}) => {

    if (isEmptyObj(productObj)) return;
    const {productId, regDate, thumbnail, delivery} = productObj;
    const {averageReviewScore, totalReviewCount} = productObj.reviewAmount;
    const {cumulationSaleCount, recentSaleCount} = productObj.saleAmount;

    return (
        <Card sx={{maxWidth: 600, margin: 'auto', textAlign: 'center'}}>
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
                <Fragment>
                    {delivery.map(({leadTimeCount, leadTimePercent, rangeNumberText, rangeText}) => (
                        <Typography gutterBottom variant="h7" component="div">
                            {`${rangeNumberText}${rangeText} ${leadTimeCount}건 (${leadTimePercent}%)`}
                        </Typography>
                    ))}
                </Fragment>
            </CardContent>
        </Card>
    )
}

export default DateBoard;