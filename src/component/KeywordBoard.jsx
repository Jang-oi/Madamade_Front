// MUI
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { setLocaleString } from '../utils/commonUtil';

const KeywordBoard = ({ tableData }) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' rowSpan={2}>연관 키워드</TableCell>
                        <TableCell align='center' colSpan={2}>월간 검색 수</TableCell>
                        <TableCell align='center' colSpan={2}>월평균 클릭 수</TableCell>
                        <TableCell align='center' colSpan={2}>월평균 클릭 률</TableCell>
                        <TableCell align='center' rowSpan={2}>경쟁 정도</TableCell>
                        <TableCell align='center' rowSpan={2}>총 상품수</TableCell>
                        <TableCell align='center' rowSpan={2}>월 평균노출 광고 수</TableCell>
                        <TableCell align='center' rowSpan={2}>모바일 웹 클릭 합계</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>PC</TableCell>
                        <TableCell align='center'>모바일</TableCell>
                        <TableCell align='center'>PC</TableCell>
                        <TableCell align='center'>모바일</TableCell>
                        <TableCell align='center'>PC</TableCell>
                        <TableCell align='center'>모바일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((data, index) => {
                        setLocaleString(data);
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{data.relKeyword}</TableCell>
                                <TableCell align='center'>{data.monthlyPcQcCnt}</TableCell>
                                <TableCell align='center'>{data.monthlyMobileQcCnt}</TableCell>
                                <TableCell align='center'>{data.monthlyAvePcClkCnt}</TableCell>
                                <TableCell align='center'>{data.monthlyAveMobileClkCnt}</TableCell>
                                <TableCell align='center'>{data.monthlyAvePcCtr}%</TableCell>
                                <TableCell align='center'>{data.monthlyAveMobileCtr}%</TableCell>
                                <TableCell align='center'>{data.compIdx}</TableCell>
                                <TableCell align='center'>{data.total}</TableCell>
                                <TableCell align='center'>{data.plAvgDepth}</TableCell>
                                <TableCell align='center'>{data.clkCntSum}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default KeywordBoard;