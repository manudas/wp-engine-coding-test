export const isUrl = (urlString) => {
    try {
        const url = new URL(urlString);

        /*
         * url is always truthy at this point,
         * otherwise an exception is thrown. We
         * use double negation to skip eslinter
         * complains of having a variable
         * declared which is not in use
         */
        return !!url;
    } catch (e) {
        // TypeError
        return false;
    }
};