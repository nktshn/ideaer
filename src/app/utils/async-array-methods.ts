/**
 * async map function allows mapping async callbacks via await
 */
export async function mapAsync<T>(collection: T[], asyncCallback: (elem: T) => Promise<T> | any): Promise<T[]> {
    let result: T[] = new Array(collection.length);
    return new Promise(async (res, rej) => {
        const l = collection.length;
        let i = 0;
        for (i; i < l; i++) {
            const element = collection[i];
            result.push(await asyncCallback(element));
        }
        res(result);
    })
}
