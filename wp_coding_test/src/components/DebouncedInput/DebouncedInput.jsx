import React, {
    useState,
    useCallback,
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

    const debouncedHandler = useCallback(debounce(
        (passedReddit) => {
            // console.log('debounced!');
            onChangeHandler(passedReddit);
        },
        debounceTimeout,
        {
            'leading': false,
            'trailing': true,
        }), []);

    const onInputChangeHandler = ($event) => {
        setSubReddit($event.target.value);
        debouncedHandler($event.target.value); 
    };

    return (
        <label
            className="debounced-input_label"
            htmlFor="subReddit">
                Please enter a subreddit
                <input
                    className="debounced-input_input"
                    onChange={onInputChangeHandler}
                    id="subreddit"
                    value={subReddit}
                />
        </label>
    );
};

export default DebouncedInput;
