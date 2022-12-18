import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import UserActions from './user-actions';
import { useAllUsersQuery } from '../../../api/use-store-api';
export default function UserListResults() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const allUsersQuery = useAllUsersQuery();

    const handleLimitChange = (event: any) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>User email</TableCell>
                                <TableCell>User account id</TableCell>
                                <TableCell>Display name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsersQuery.data
                                ?.slice(page * limit, page * limit + limit)
                                .map((user, index) => (
                                    <TableRow hover key={user.userAccountId}>
                                        <TableCell>{index}</TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {user.userAccountId}
                                        </TableCell>
                                        <TableCell>
                                            {user.displayName}
                                        </TableCell>
                                        <TableCell>
                                            <UserActions
                                                userId={user.userAccountId}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={allUsersQuery.data?.length ?? 0}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
