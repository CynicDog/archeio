import React from 'react';
import ChevronRight from "../../public/ChevronRight.jsx";

const Breadcrumbs = ({parentDir, childDir}) => {
    return (
        <div className="bg-light-subtle border border-1 rounded-3 p-2">
            <span className="text-body-secondary fs-3 fw-lighter">
                {parentDir === '' ? (
                    <>All</>
                ) : (
                    <>
                        {parentDir} {' '}
                        {(parentDir !== '') && (childDir !== '') && (
                            <>
                                <ChevronRight/> {' '}
                            </>
                        )}
                        {childDir} {' '}
                    </>
                )}

            </span>
        </div>
    );
};

export default Breadcrumbs
