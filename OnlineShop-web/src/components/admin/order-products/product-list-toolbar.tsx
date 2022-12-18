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

export default function ProductListToolbar(props: any) {
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
                    Products
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        startIcon={<UploadIcon fontSize="small" />}
                        sx={{ mr: 1 }}
                    >
                        Import
                    </Button>
                    <Button
                        startIcon={<DownloadIcon fontSize="small" />}
                        sx={{ mr: 1 }}
                    >
                        Export
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            navigate('/admin/products/add');
                        }}
                    >
                        Add Product
                    </Button>
                </Box>
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
                                placeholder="Search product"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
