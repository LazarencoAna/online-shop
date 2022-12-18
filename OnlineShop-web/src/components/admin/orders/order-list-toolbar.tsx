import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
} from '@mui/material';
import { Search as SearchIcon } from '../../../asset/inline/icons/search';
import { Upload as UploadIcon } from '../../../asset/inline/icons/upload';
import { Download as DownloadIcon } from '../../../asset/inline/icons/download';
import { useNavigate } from 'react-router-dom';

export default function OrderListToolbar(props: any) {
    const navigate = useNavigate();

    return (
        <Box {...props}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant="h4">
                    Orders
                </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                color="action"
                                                fontSize="small"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search orders"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
