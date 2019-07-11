export namespace ObjectUtils {
    /**
     * compares arrays for equality. be careful with objects values inside of arrays
     * @returns true if all arrays are equal
     * @param arrays arrays to compare
     */
    export function areArraysEqual<T>(...arrays: Array<T>[]): boolean {
        const areAllArraysExists = arrays.every(array => !!array);
        if (!areAllArraysExists) { return false; }
        const sortedArrays = arrays.map(array => array.sort());
        const stringifiedArrays: string[] = sortedArrays.map(array => JSON.stringify(array));
        return stringifiedArrays.every(stringifiedArray => stringifiedArray === stringifiedArrays[0]);
    }

    export function cloneDeep<T>(object: T, type?: new(value) => T): T {
        return type
            ? object && new type(JSON.parse(JSON.stringify(object)))
            : object && JSON.parse(JSON.stringify(object));
    }

    export function cloneDeepArray<T>(list: T[], type?: new(value) => T): T[] {
        return list.map(item => {
            return cloneDeep<T>(item, type);
        });
    }

}
