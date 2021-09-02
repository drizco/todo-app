import Header from '@/components/Header';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('renders a header', () => {
    const { getByRole } = render(<Header />);

    const header = getByRole('banner');

    expect(header).toBeInTheDocument();
  });

  it('renders a heading', () => {
    const { getByRole } = render(<Header />);

    const h1 = getByRole('heading');

    expect(h1).toBeInTheDocument();
  });
});
