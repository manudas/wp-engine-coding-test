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
    const [ inputValue, setInputValue ] = useState(defaultReddit);

    /*
     * We are going to use useMemo
     * here in order to not redeclare
     * this handler everytime the
     * component is rendered. Otherwise
     * the debounce effect would be lost
     */
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

    /*
     * Internal onChange handler.
     * Will invoke the external
     * passed down in a given time,
     * as is supposed to be time
     * debounced
     */
    const onInputChangeHandler = ($event) => {
        setInputValue($event.target.value);
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
                    value={inputValue}
                />
        </label>
    );
};

export default DebouncedInput;
