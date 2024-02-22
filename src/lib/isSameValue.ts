export const isSameValue = (recordSet: Array<number>): boolean => {
    return recordSet.every((v) => v === recordSet[0]);
};
