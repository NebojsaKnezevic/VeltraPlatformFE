import { useUsers } from "../query/hooks/use-users";

interface IWorkday{
  count: number
}
export default function Workday(props: IWorkday) {
  const {count} = props;
  const { data, isLoading, isError, refetch  } = useUsers(count);
  console.log("EXEC")
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Došlo je do greške.</p>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => refetch()}> GET USERS </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
    </div>
  );
}