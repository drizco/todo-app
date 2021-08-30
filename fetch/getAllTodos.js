const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default async function getAllTodos() {
  const response = await fetch(`${apiUrl}/todos`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('error fetching todos');
  }
}
