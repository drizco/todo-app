import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import FindOrCreateInput from '@/components/FindOrCreateInput';

describe('FindOrCreateInput', () => {
  it('renders a text input', () => {
    const { getByRole } = render(<FindOrCreateInput />);

    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
  it('renders a submit input', () => {
    const { getByRole } = render(<FindOrCreateInput />);

    const input = getByRole('button');

    expect(input).toBeInTheDocument();
  });
  it('calls its onSubmit prop on click', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
      <FindOrCreateInput onSubmit={onSubmit} value="new todo" onChange={() => {}} />
    );

    const input = getByRole('button');
    fireEvent.click(input);

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('is disabled if no value is entered', async () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    const { getByRole } = render(
      <FindOrCreateInput onSubmit={onSubmit} value="" onChange={() => {}} />
    );

    const input = getByRole('button');
    fireEvent.click(input);

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
  });
});
