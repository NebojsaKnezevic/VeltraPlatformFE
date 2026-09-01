import type { UseQueryResult } from "@tanstack/react-query";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

type AsyncProps<TData, TError = Error> = {
    query: UseQueryResult<TData, TError>;
    children: (data: TData) => React.ReactNode;
};

export default function Async<TData, TError = Error>({
    query,
    children,
}: AsyncProps<TData, TError>) {
    if (query.isPending) {
        return <CircularProgress />;
    }

    if (query.isLoadingError) {
        return <>ERROR: {String(query.error)}</>;
    }

    if (query.isRefetchError) {
        return (
            <Box sx={{ position: 'relative' }}>
                ⚠️ Refresh failed - showing old data
                {children(query.data)}
            </Box>
        );
    }

    return (
        <Box sx={{ position: 'relative' }}>
            {query.isFetching && (
                <CircularProgress size={16} sx={{ position: 'absolute', top: 0, right: 0 }} />
            )}
            {children(query.data)}
        </Box>
    );
}



// <Async query={usersQuery}>
//   {(users) => <UserList users={users} />}
// </Async>