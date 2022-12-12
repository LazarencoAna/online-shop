import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGridPro,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridValidRowModel,
} from '@mui/x-data-grid-pro';
import Avatar from '@mui/material/Avatar';

type ImageModelRowModel = GridValidRowModel & {
    id: number;
    url: string;
};

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
    setLastNewId: (newLastId: (lastId: number) => number) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel, setLastNewId } = props;
    const handleClick = () => {
        let id = 0;
        setLastNewId((lastId) => {
            id = lastId;
            lastId -= 1;
            return lastId;
        });
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                url: '',
                isNew: true,
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

interface ImagesTableProps {
    initImages?: string[];
    onChangeImages: (images: string[]) => void;
}

export default function ProductImages({
    initImages,
    onChangeImages,
}: ImagesTableProps) {
    const [rows, setRows] = React.useState<GridRowsProp<ImageModelRowModel>>(
        initImages?.map((image, index) => {
            const initialRows = {
                id: index,
                url: image,
            } as ImageModelRowModel;
            return initialRows;
        }) ?? []
    );
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const [lastNewId, setLastNewId] = React.useState<number>(initImages?.length ?? 0);

    useEffect(() => {
        const images = rows.map((row) => {
            return row.url;
        });
        onChangeImages(images);
    }, [rows]);

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: ImageModelRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const columns: GridColumns = [
        {
            field: 'image',
            headerName: 'Image',
            //type: 'img',
            editable: false,
            flex: 0.1,
            renderCell: (params) => {
                console.log(params);
                return (
                    <strong>
                        {/* <img src={params.row.url} /> */}
                        <Avatar src={params.row.url} />
                    </strong>
                );
            },
        },
        {
            field: 'url',
            headerName: 'URL',
            type: 'string',
            editable: true,
            flex: 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            flex: 0.2,

            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGridPro
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                components={{
                    Toolbar: EditToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel,
                        setLastNewId,
                    },
                }}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}
