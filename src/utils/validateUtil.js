import { customAlert } from './commonUtil';

/**
 * 리뷰를 위해 사용하는 url 검증
 * @param url
 * @param errorCallBackFn
 */
export const urlValidate = async (url, errorCallBackFn) => {
    let bool = true;

    if (url.toLowerCase().includes('https://smartstore.naver.com')) bool = false;
    if (url.toLowerCase().includes('https://brand.naver.com')) bool = false;

    if (bool) errorAlert('입력하신 URL 확인 부탁드립니다.', errorCallBackFn);
};

/**
 * 오류 처리 시 사용하는 alert
 * @param text
 * @param errorCallBackFn
 */
export const errorAlert = (text, errorCallBackFn) => {
    if (!errorCallBackFn) errorCallBackFn = () => {};
    customAlert({ text, isError: true }, errorCallBackFn);
    throw new Error(text);
};