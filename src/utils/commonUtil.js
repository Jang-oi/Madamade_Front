/**
 * 리뷰를 위해 사용하는 url 검증
 * @param url
 * @param urlInputRef
 */
export async function urlValidate(url, urlInputRef) {
    let bool = true;

    if (url.toLowerCase().includes('smartstore.naver.com')) bool = false;
    if (url.toLowerCase().includes('brand.naver.com')) bool = false;

    if (bool) {
        setTimeout(() => {urlInputRef.current.focus()}, 300);
        throw new Error('입력하신 URL 확인 부탁드립니다.');
    }
}

/**
 * 오브젝트의 키 값이 존재하더라도 value 값이 0, null, '', undefined 일 경우
 * 비어 있다고 판단하는 함수
 * @param Obj
 * @returns {boolean}
 */
export function isEmptyObj(Obj) {
    let bool = true;
    for (const key in Obj) {
        if (Obj[key]) {
            bool = false;
            break;
        }
    }
    return bool;
}
