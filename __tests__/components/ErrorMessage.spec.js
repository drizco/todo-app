import ErrorMessage from '@/components/ErrorMessage';
import useError from '@/hooks/useError';
import { render } from '@testing-library/react';

jest.mock('@/hooks/useError');

describe('ErrorMessage', () => {
  it('does not show if there is no error', () => {
    useError.mockReturnValue({ error: null });
    const { queryByTestId } = render(<ErrorMessage />);

    const errorMessge = queryByTestId('error');

    expect(errorMessge).not.toBeInTheDocument();
  });

  it('does show if there is an error', () => {
    const text = 'oopsie...';
    useError.mockReturnValue({ error: text });
    const { queryByTestId, getByText } = render(<ErrorMessage />);

    const errorMessge = queryByTestId('error');
    const renderedText = getByText(text);

    expect(errorMessge).toBeInTheDocument();
    expect(renderedText).toBeInTheDocument();
  });
});
