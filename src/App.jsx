
import { useQuery } from '@tanstack/react-query';

function App() {
  const {data,error,isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json()
      ),
  });

  if (error) <div className="text-red-500">There was an error loading</div>
  if (isLoading) <div className="text-yellow-500">Data is loading...</div>

  return <div className="p-12 border ">
   
   {data.map((todo) => (
      <div key={todo.id} className="flex flex-col gap-4 border p-4">
        <h1 className="">{todo.id}</h1>
        <h1 className="">{todo.title}</h1>
        <h1 className="">{todo.completed}</h1>
      </div>
    ))}
   
  </div>;
}

export default App;
