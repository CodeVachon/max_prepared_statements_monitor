export const reverseRecords = <T = unknown>(data: Array<T>): Array<T> => {
    return [...data].reverse();
};
