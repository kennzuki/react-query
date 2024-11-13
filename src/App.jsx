
import { useQuery } from '@tanstack/react-query';

function App() {
  const {data} = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  return <div className="p-12 border text-black ">
    {data.map((todo) => (
      <div key={todo.id} className="">
        <h1 className="">{todo.id}</h1>
        <h1 className="">{todo.title}</h1>
        <h1 className="">{todo.completed}</h1>
      </div>
    ))}
  </div>;
}

export default App;
