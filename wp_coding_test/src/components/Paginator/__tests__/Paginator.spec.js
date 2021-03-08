import {
    render,
} from '@testing-library/react';

import Paginator from '..';

describe('Test suite for <Paginator>', () => {

    it('should render', () => {
        const { container } = render(
            <Paginator
                setPage={Function.prototype}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it("previous should be disabled on first page and next shouldn't if more than 1 page", () => {
        const { getByText } = render(
            <Paginator
                page={0}
                maxPage={1}
                setPage={Function.prototype}
            />
        );

        const previousButton = getByText(/previous/i);
        const nextButton = getByText(/next/i);

        expect(previousButton).toHaveClass('disabled');
        expect(nextButton).not.toHaveClass('disabled');
    });


    it("previous shouldn't be disabled on second page and next should if last page", () => {
        const { getByText } = render(
            <Paginator
                page={1}
                maxPage={1}
                setPage={Function.prototype}
            />
        );

        const previousButton = getByText(/previous/i);
        const nextButton = getByText(/next/i);

        expect(previousButton).not.toHaveClass('disabled');
        expect(nextButton).toHaveClass('disabled');
    });
});