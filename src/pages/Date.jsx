import { Fragment } from 'react';

import DateBoard from '../component/DateBoard';
import Submit from '../component/Submit';

const Date = () => {

    const pageUrl = window.location.pathname.split('/')[1];
    const menuName = '등록일자';

    return (
        <Fragment>
            <Submit pageUrl={pageUrl} menuName={menuName} />
            <DateBoard />
        </Fragment>
    );
};

export default Date;