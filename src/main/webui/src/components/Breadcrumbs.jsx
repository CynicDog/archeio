import React from 'react';
import ChevronRight from "../../public/ChevronRight.jsx";

const Breadcrumbs = ({parentDir, childDir}) => {
    return (
        <div className="breadcrumbs">
            <span className="text-body-secondary fs-3 fw-lighter">
                {childDir !== '' && (
                  <>
                      {parentDir} {' '}
                      {parentDir !== '' && (
                          <>
                              <ChevronRight/> {' '}
                          </>
                      )}
                      {childDir} {' '}
                  </>
                )}
                {childDir === '' && (
                    <>
                        All
                    </>
                )}
            </span>
        </div>
    );
};

export default Breadcrumbs
