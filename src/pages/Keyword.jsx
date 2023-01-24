import { Fragment } from 'react';

import KeywordBoard from '../component/KeywordBoard';
import Submit from '../component/Submit';

const Keyword = () => {

    const pageUrl = window.location.pathname.split('/')[1];
    const menuName = '키워드';

    return (
        <Fragment>
            <Submit pageUrl={pageUrl} menuName={menuName}/>
            <KeywordBoard />
        </Fragment>
    );
};

export default Keyword;
