/**
 * 응답받은 데이터 정의
 * @param response
 * @returns {{returnCode: *, returnData: *, returnMessage: *}}
 */
export const getReturnObj = (response) => {

    return {
        returnData   : response.data?.data,
        returnCode   : response.data?.returnCode,
        returnMessage: response.data?.returnMsg,
    };
};

/**
 * 서버를 정상적으로 호출하지 못했을때 메세지
 * @param error
 */
export const getErrorMessage = (error) => {
    let errorMsg;
    switch (error.code) {
        case 'ERR_NETWORK' :
            errorMsg = '서버 연결 실패!! \n서버 담당자 연결 부탁드립니다.';
            break;
        default :
            errorMsg = '서버 담당자 연결 부탁드립니다.';
            break;
    }
    return errorMsg;
};