import React, { useEffect } from 'react';
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useQuery } from 'react-query';
import { fetchProductDeliveryMethods } from '../../../api/StoreApi';
import { IDeliveryMethod } from '../../../api/store-api';

interface IProductDeliverySelector {
    onChangeDeliveryMethods: (deliveryMethods: IDeliveryMethod[]) => void;
    checkedDeliveryMethods?: IDeliveryMethod[];
}

export default function ProductDeliverySelector({
    onChangeDeliveryMethods,
    checkedDeliveryMethods,
}: IProductDeliverySelector) {
    const productDeliveryMethods = useQuery({
        queryKey: ['productDeliveryMethods'],
        queryFn: fetchProductDeliveryMethods,
    });

    const [deliveryMethods, setDeliveryMethods] = React.useState<string[]>(
        productDeliveryMethods.data
            ?.filter((pdm) =>
                checkedDeliveryMethods?.some(
                    (dm) => dm.deliveryTypeId === pdm.deliveryTypeId
                )
            )
            .map((i) => i.deliveryName) ?? []

        //checkedDeliveryMethods?.map((i) => i.deliveryName) ?? []
    );

    useEffect(() => {
        onChangeDeliveryMethods(
            productDeliveryMethods.data?.filter((pdm) =>
                deliveryMethods.some((dm) => dm === pdm.deliveryName)
            ) ?? []
        );
    }, [deliveryMethods]);

    useEffect(() => {
        setDeliveryMethods(
            productDeliveryMethods.data
                ?.filter((pdm) =>
                    checkedDeliveryMethods?.some(
                        (dm) => dm.deliveryTypeId === pdm.deliveryTypeId
                    )
                )
                .map((i) => i.deliveryName) ?? []
        );
    }, [productDeliveryMethods.data]);

    const handleChange = ({
        target,
    }: SelectChangeEvent<typeof deliveryMethods>) => {
        const { value } = target;
        setDeliveryMethods(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="delivery-multiple-checkbox-label">
                Delivery methods
            </InputLabel>
            <Select
                labelId="delivery-multiple-checkbox-label"
                id="delivery-multiple-checkbox"
                multiple
                value={deliveryMethods}
                onChange={handleChange}
                input={<OutlinedInput label="Delivery methods" />}
                renderValue={(selected) => selected.join(', ')}
            >
                {productDeliveryMethods?.data?.map((del) => (
                    <MenuItem key={del.deliveryTypeId} value={del.deliveryName}>
                        <Checkbox
                            checked={
                                deliveryMethods.indexOf(del.deliveryName) > -1
                            }
                        />
                        <ListItemText primary={del.deliveryName} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
