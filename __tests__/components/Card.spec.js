import Card from '@/components/Card';
import { render } from '@testing-library/react';

describe('Card', () => {
  it('renders a list item', () => {
    const { getByRole } = render(<Card />);

    const li = getByRole('listitem');

    expect(li).toBeInTheDocument();
  });
});
