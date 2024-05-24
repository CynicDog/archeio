import React from 'react';
import ChevronRight from "../../public/ChevronRight.jsx";

const Breadcrumbs = ({parentDir, childDir}) => {
    return (
        <div className="breadcrumbs">
            <span className="text-body-secondary fs-3 fw-lighter">
                {parentDir} {' '}
                <ChevronRight/> {' '}
                {childDir} {' '}
            </span>
        </div>
    );
};

export default Breadcrumbs
