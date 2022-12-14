import Swal from 'sweetalert2/src/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content';

/**
 * options 정의
 title : String
 text  : String
 footer : String
 icon : String
 didOpen : function
 didClose : function
 showCancelButton: true,
 confirmButtonColor: '#color',
 cancelButtonColor: '#color',
 confirmButtonText: String,
 cancelButtonText: String
 * Alert 창 정의
 * @param options
 * @returns {Promise<SweetAlertResult>}
 */
export const customAlert = (options) => {
    const MySwal = withReactContent(Swal);
    return MySwal.fire(options);
}

/**
 * 리뷰를 위해 사용하는 url 검증
 * @param url
 */
export const urlValidate = (url) => {
    let bool = true;

    if (url.toLowerCase().includes('https://smartstore.naver.com')) bool = false;
    if (url.toLowerCase().includes('https://brand.naver.com')) bool = false;

    if (bool) throw new Error('입력하신 URL 확인 부탁드립니다.');
}

/**
 * 오브젝트의 키 값이 존재하더라도 value 값이 0, null, '', undefined 일 경우
 * 비어 있다고 판단하는 함수
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObj = (obj) => {
    let bool = true;
    for (const key in obj) {
        if (obj[key]) {
            bool = false;
            break;
        }
    }
    return bool;
}

/**
 * 숫자 세자리 컴마와 소수점 두자리 반올림
 * @param obj
 */
export const setLocaleString = (obj) => {
    const option = {
        maximumFractionDigits: 2
    };

    for (const key in obj) {
        if (typeof obj[key] === 'number') {
            obj[key] = obj[key].toLocaleString('ko-KR', option)
        }
    }
}