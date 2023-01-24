import { Fragment } from 'react';

import ReviewBoard from '../component/ReviewBoard';
import Submit from '../component/Submit';

const Review = () => {

    const pageUrl = window.location.pathname.split('/')[1];
    const menuName = '리뷰';

    return (
        <Fragment>
            <Submit pageUrl={pageUrl} menuName={menuName} />
            <ReviewBoard />
        </Fragment>
    );
};

export default Review;
