import React, {
    useState,
    useMemo,
} from 'react';

import debounce from 'lodash/debounce';

import {
    debounceTimeout,
    defaultReddit,
} from '../constants';

import './styles.scss';

const DebouncedInput = ({
    onChangeHandler,
}) => {
    const [ subReddit, setSubReddit ] = useState(defaultReddit);

    const debouncedHandler = useMemo( () => debounce(
        (passedReddit) => {
            // console.log('debounced!');
            onChangeHandler(passedReddit);
        },
        debounceTimeout,
        {
            'leading': false,
            'trailing': true,
        }), [onChangeHandler]);

    const onInputChangeHandler = ($event) => {
        setSubReddit($event.target.value);
        debouncedHandler($event.target.value);
    };

    return (
        <label
            className="debounced-input_label"
            htmlFor="subreddit">
                Please enter a subreddit
                <input
                    data-testid="debouncedInput"
                    className="debounced-input_input"
                    onChange={onInputChangeHandler}
                    id="subreddit"
                    value={subReddit}
                />
        </label>
    );
};

export default DebouncedInput;
