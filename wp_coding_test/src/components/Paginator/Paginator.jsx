import React from 'react';

import PropTypes from 'prop-types';

import {
    buttonClass,
} from '../constants';

import './styles.scss';

const Paginator = ({
    page,
    setPage,
    maxPage,
}) => {

    return (
        <nav>
            <button
                className={`${buttonClass} ${page === 0 ? 'disabled' : ''}`}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>
            <span
                className="paginator__page"
            >
                Page {page + 1} out of {maxPage + 1}
            </span>
            <button
                className={`${buttonClass} ${page === maxPage ? 'disabled' : ''}`}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
        </nav>
    );
};

Paginator.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func.isRequired,
    maxPage: PropTypes.number,
}

Paginator.defaultProps = {
    page: 0,
    maxPage: 0,
}

export default Paginator;
