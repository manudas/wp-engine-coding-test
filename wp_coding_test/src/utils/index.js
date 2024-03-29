/**
 * Helper to check if a string is a valid URL
 * @param {string} urlString the string to be tested
 *
 * @return {boolean} true if the string is a valid URL,
 * false otherwise
 */
export const isUrl = (urlString) => {
    var pattern = new RegExp('^((https?:\\/\\/)' + // protocol
        '|(\\/\\/))?' + // or relative protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(urlString);
};
