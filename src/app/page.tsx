import Link from "next/link";
import { PageProps } from "../../.next/types/app/page";

type Todo = {
  id: string;
  title: string;
}

async function fetchTodos(length = 5) {
  const todos = await((await fetch('https://jsonplaceholder.typicode.com/todos')).json()) as Todo[];

  return todos.slice(0, length);
}

export default async function Home({searchParams}: PageProps) {
  const limit = +searchParams.limit || 5;
  const todos = await fetchTodos(limit);

  return (
    <main>
      {todos.map(todo => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
        </div>
      ))}
      <Link href={`/?limit=${limit + 1}`}>Load More</Link>
    </main>
  )
}
