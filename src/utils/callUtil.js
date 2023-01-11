import axios from "axios";
import {customAlert} from "./commonUtil";

axios.defaults.baseURL = `http://${window.location.hostname}:3000/mada`;

export const tryCatchCall = (fn, errCallBack) => {
    try {
        fn();
    } catch (error) {
        customAlert({
            icon : 'error',
            title: 'Oops...',
            text : error,
        }).then(() => {
            if (errCallBack) errCallBack();
        }).catch(() => {
            alert('customAlert 연결 실패!\n서버 담당자에게 연결 부탁드립니다.');
        });
    }
}

/**
 * 서버를 정상적으로 호출하고 난 이후의 이벤트
 * @param response
 * @param callBack
 * @returns {*}
 */
const callThen = (response, callBack) => {
    const returnData = response.data;
    if (callBack) callBack(returnData);
    else return returnData;
}

/**
 * 서버를 정상적으로 호출하지 못하고 난 이후의 이벤트
 * @param error
 * @param errorCallBack
 */
const callCatch = (error, errorCallBack) => {
    let errorMsg = '';
    switch (error.code) {
        case 'ERR_NETWORK' :
            errorMsg = '서버 연결 실패!! \n서버 담당자 연결 부탁드립니다.'
            break;
        default :
            errorMsg = '서버 담당자 연결 부탁드립니다.'
            break;
    }
    customAlert({
        icon : 'error',
        title: 'Oops...',
        text : errorMsg,
    }).then(() => {
        if (errorCallBack) errorCallBack();
    }).catch(() => {
        alert('customAlert 연결 실패!!\n서버 담당자에게 연결 부탁드립니다.')
    });
}


/**
 * 서버 호출 정의
 * @type {{post: serviceCall.post, get: serviceCall.get}}
 */
export const serviceCall = {
    post: (url, param, callBack, errorCallBack) => {
        axios.post(url, param)
            .then(response => callThen(response, callBack))
            .catch(error => callCatch(error, errorCallBack));
    },

    get: (url, callBack, errorCallBack) => {
        axios.get(url)
            .then(response => callThen(response, callBack))
            .catch(error => callCatch(error, errorCallBack));
    }
}