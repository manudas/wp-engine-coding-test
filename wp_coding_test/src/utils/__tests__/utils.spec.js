import {
    isUrl,
} from '..';

describe('Test suite for Utils', () => {
    const wrongUrl = 'this is not a URL';
    const correctUrl = '//wpengine.com'; //relative protocol url

    it('check if a string is a valid url', () => {
        expect(isUrl(wrongUrl)).toBeFalsy();
        expect(isUrl(correctUrl)).toBe(true);
    });
});
