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
    GridColDef,
    GridRenderCellParams,
    useGridApiContext,
} from '@mui/x-data-grid-pro';
import { StockModel } from '../../../models/product.d';
import { Select, SelectChangeEvent } from '@mui/material';
import { ToArray } from '../../../utils/helper';

type StockModelRowModel = GridValidRowModel & {
    id: number;
    sizeText: string;
    quantity: number;
    color: string;
};

const SizeList = Array.from(
    {
        length: 20,
    },
    (v, k) => k + 1
);

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
                sizeText: 20,
                quantity: 1,
                color: 'purple',
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

function SelectEditInputCell(props: GridRenderCellParams) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event: SelectChangeEvent) => {
        await apiRef.current.setEditCellValue({
            id,
            field,
            value: event.target.value,
        });
        apiRef.current.stopCellEditMode({ id, field });
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1 }}
            native
            autoFocus
        >
            {SizeList.map((size) => (
                <option>{size}</option>
            ))}
        </Select>
    );
}

const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
    return <SelectEditInputCell {...params} />;
};

interface StockTableProps {
    initStock?: StockModel[];
    onChangeStock: (stocks: StockModel[]) => void;
}

export default function StockTable({
    initStock,
    onChangeStock,
}: StockTableProps) {
    const [rows, setRows] = React.useState<GridRowsProp<StockModelRowModel>>(
        initStock?.map((stock) => {
            const initialRows = {
                id: stock.id,
                sizeText: `${stock.size}`,
                quantity: stock.quantity,
                color: stock.color,
            } as StockModelRowModel;
            return initialRows;
        }) ?? []
    );
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
        {}
    );

    const [lastNewId, setLastNewId] = React.useState<number>(0);

    useEffect(() => {
        const stocks = rows.map((row) => {
            var stock: StockModel = {
                color: row.color,
                id: row.id > 0 ? row.id : 0,
                quantity: row.quantity,
                size: parseInt(row.sizeText),
            };
            return stock;
        });
        onChangeStock(stocks);
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

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
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

    const processRowUpdate = (newRow: StockModelRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const columns: GridColumns = [
        {
            field: 'sizeText',
            headerName: 'Size',
            width: 180,
            renderEditCell: renderSelectEditInputCell,
            editable: true,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            editable: true,
        },
        {
            field: 'color',
            headerName: 'Color',
            type: 'string',
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,

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
