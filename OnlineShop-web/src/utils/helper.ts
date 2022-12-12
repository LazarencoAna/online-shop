// Helper
export const StringIsNumber = (value: string) => isNaN(Number(value)) === false;

// Turn enum into array
export function ToArray(enumme: any) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map((key) => enumme[key]);
}

export function IsInFavoriteList(favoriteList: any, element: any) {
    return favoriteList.some((item: any) => item.customId === element.customId);
    return true;
}
