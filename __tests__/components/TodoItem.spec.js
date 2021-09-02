import TodoItem from '@/components/TodoItem';
import { fireEvent, render } from '@testing-library/react';

describe('TodoItem', () => {
  it('renders a todo item', () => {
    const { queryByTestId } = render(<TodoItem />);

    const todoItem = queryByTestId('todo-item');

    expect(todoItem).toBeInTheDocument();
  });

  it('has a delete button', () => {
    const { getByRole } = render(<TodoItem />);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('runs handleDelete when the button is clicked', () => {
    const handleDelete = jest.fn();
    const { getByRole } = render(<TodoItem handleDelete={handleDelete} />);

    const button = getByRole('button');

    fireEvent.click(button);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
