import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useProductCategoriesQuery } from '../../../api/use-store-api';
import { ICategory } from '../../../api/store-api.d';

interface ProductCategorySelectorProps {
    onChangeCategoryId: (categoryId: number) => void;
    prSelectedCategoryId?: number;
}

interface CategoryDropdownDetails {
    index: number;
    selectedCategoryId: string;
    selectOptions: ICategory[];
}

export default function ProductCategorySelector({
    onChangeCategoryId,
    prSelectedCategoryId,
}: ProductCategorySelectorProps) {
    const [categoriesDropDetail, setCategoriesDropDetail] = useState<
        CategoryDropdownDetails[]
    >([]);
    const productCategories = useProductCategoriesQuery();
    const getRoute = (categoryId: number) => {
        let route = [categoryId];
        let cat = productCategories?.data?.find(
            (i) => i.categoryId == categoryId
        );
        while (cat?.parentCategoryId != null || cat) {
            cat = productCategories?.data?.find(
                (i) => i.categoryId == cat?.parentCategoryId
            );
            cat && route.push(cat?.categoryId);
        }
        return route.reverse();
    };

    useEffect(() => {
        const parentCategories =
            productCategories.data?.filter(
                (category) => category.parentCategoryId == null
            ) ?? [];
        setCategoriesDropDetail([
            {
                index: 0,
                selectedCategoryId: '',
                selectOptions: parentCategories,
            },
        ]);
        console.log(productCategories.data);
        if (prSelectedCategoryId) {
            let route = getRoute(prSelectedCategoryId);
            route?.forEach((element, index) => {
                changeCategoryId(index, element.toString());
            });
        }
    }, [productCategories.data]);

    useEffect(() => {
        let lastElement = categoriesDropDetail
            .slice()
            .reverse()
            .find((c) => c.selectedCategoryId !== '');

        if (!!lastElement) {
            onChangeCategoryId(parseInt(lastElement.selectedCategoryId));
        }
    }, [categoriesDropDetail]);

    const changeCategoryId = (index: number, categoryId: string) => {
        setCategoriesDropDetail((catDetail) => {
            catDetail[index].selectedCategoryId = categoryId;
            if (catDetail.length > index + 1) {
                catDetail.splice(index + 1, catDetail.length);
            }

            const childCategories =
                productCategories.data?.filter(
                    (category) =>
                        `${category.parentCategoryId}` ===
                        `${catDetail[index].selectedCategoryId}`
                ) ?? [];
            if (childCategories.some((c) => !!c))
                catDetail.push({
                    index: index + 1,
                    selectedCategoryId: '',
                    selectOptions: childCategories,
                });
            return [...catDetail];
        });
    };

    const renderCategoryDropDown = (
        categoryDropDetails: CategoryDropdownDetails
    ) => {
        return (
            <FormControl
                key={categoryDropDetails.index}
                sx={{ m: 1, minWidth: 200 }}
            >
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={categoryDropDetails.selectedCategoryId}
                    name="category"
                    label="Category"
                    onChange={(event: SelectChangeEvent) => {
                        changeCategoryId(
                            categoryDropDetails.index,
                            event.target.value as string
                        );
                    }}
                >
                    {categoryDropDetails.selectOptions?.map((category) => (
                        <MenuItem
                            value={category.categoryId}
                            key={category.categoryId}
                        >
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    };

    return (
        <>
            {categoriesDropDetail.map((catDropDet) =>
                renderCategoryDropDown(catDropDet)
            )}
        </>
    );
}
