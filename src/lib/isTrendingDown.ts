export const isTrendingDown = (recordSet: Array<number>): boolean => {
    return recordSet.every(
        (item, i) => item > recordSet[i + 1] || item === recordSet[recordSet.length - 1]
    );
};
