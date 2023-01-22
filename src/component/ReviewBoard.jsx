// MUI
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { setLocaleString } from '../utils/commonUtil';

const ReviewBoard = ({ tableData }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>순위</TableCell>
                        <TableCell>옵션명</TableCell>
                        <TableCell>리뷰 개수</TableCell>
                        <TableCell>리뷰 점수</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData && tableData.map((data, index) => {
                        data.calReviewScore = data.reviewScore / data.cnt;
                        setLocaleString(data);
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.productOptionContent}</TableCell>
                                <TableCell>{data.cnt}</TableCell>
                                <TableCell>{data.calReviewScore}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReviewBoard;