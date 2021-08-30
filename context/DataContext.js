import { createContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import getAllTodos from '@/fetch/getAllTodos';

const INITIAL_STATE = {
  todos: null,
  items: null,
  error: null,
  loading: false,
};

const DataContext = createContext(INITIAL_STATE);

export default DataContext;

export const DataProvider = ({ children }) => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'SET_LOADING':
        return { ...state, loading: payload };
      case 'SET_ERROR':
        return { ...state, loading: false, error: payload };
      case 'SET_TODOS':
        return { ...state, loading: false, todos: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { pathname, query } = useRouter();

  const setLoading = (bool) => dispatch({ type: 'SET_LOADING', payload: bool });
  const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error });
  const setTodos = (todos) => dispatch({ type: 'SET_TODOS', payload: todos });

  useEffect(() => {
    if (pathname === '/' && !state.todos) {
      const fetchTodos = async () => {
        setLoading(true);
        try {
          const todos = await getAllTodos();
          setTodos(todos);
        } catch (error) {
          setError(error);
        }
      };
      fetchTodos();
    }
  }, [pathname, state.todos]);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
