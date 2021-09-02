import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CheckBox from '@/components/CheckBox';

describe('CheckBox', () => {
  it('renders a checkbox input', () => {
    const { getByRole } = render(<CheckBox />);

    const input = getByRole('checkbox');

    expect(input).toBeInTheDocument();
  });

  it('calls its onChange prop on click', async () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <CheckBox onChange={onChange} name="item 1" checked={false} />
    );

    const input = getByRole('checkbox');
    fireEvent.click(input);

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
