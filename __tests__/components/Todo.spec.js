import Todo from '@/components/Todo';
import { fireEvent, render } from '@testing-library/react';

describe('Todo', () => {
  it('renders a todo', () => {
    const { queryByTestId } = render(<Todo />);

    const todo = queryByTestId('todo');

    expect(todo).toBeInTheDocument();
  });

  it('contains a link', () => {
    const title = 'new todo';
    const { getByRole } = render(<Todo title={title} />);

    const todoLink = getByRole('link');

    expect(todoLink).toBeInTheDocument();
    expect(todoLink).toHaveTextContent(title);
  });

  it('has a delete button', () => {
    const { getByRole } = render(<Todo />);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('runs handleDelete when the button is clicked', () => {
    const handleDelete = jest.fn();
    const { getByRole } = render(<Todo handleDelete={handleDelete} />);

    const button = getByRole('button');

    fireEvent.click(button);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
