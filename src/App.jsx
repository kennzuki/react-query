import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';

function App() {
const queryClient=useQueryClient()

  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
    // garbage collection time delete cache
    gcTime:6000,
    //refetching time
    refetchInterval:4000
  });

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newPost),
      }).then((res) => res.json),
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'],(oldPosts)=>[...oldPosts,newPost])//caching new data with old data
    }
  });

  if (error || isError)
    <div className='text-red-500'>There was an error loading</div>;
  if (isLoading) <div className='text-yellow-500'>Data is loading...</div>;

  return (
    <div className='p-12 border '>
      {isPending && <p className='text-green-500'>Data is pending</p>}
      <button
        className='py-2 px-3 text-white bg-blue-500 rounded-xl mb-4'
        onClick={() =>
          mutate({
            userId: 5004,
            id: 4650,
            title: 'new ken post',
            body: 'this is a new post',
          })
        }
      >
        Add post
      </button>
      {data.map((todo) => (
        <div key={todo.id} className='flex flex-col gap-4 border p-4'>
          <h1 className=''>ID:{todo.id}</h1>
          <h1 className=''>Title: {todo.title}</h1>
          <p className=''>Body:{todo.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
