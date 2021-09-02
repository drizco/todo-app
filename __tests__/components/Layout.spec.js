import Layout from '@/components/Layout';
import { render } from '@testing-library/react';

jest.mock('@/hooks/useError', () => () => ({}));

describe('Layout', () => {
  it('renders the main element', () => {
    const { getByRole } = render(<Layout />);

    const main = getByRole('main');

    expect(main).toBeInTheDocument();
  });
});
