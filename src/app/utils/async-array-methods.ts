/**
 * async map function allows mapping async callbacks via await
 */
export async function mapAsync<T>(collection: T[], callback: (elem: T) => Promise<T> | any): Promise<T[]> {
    let counter = 0;
    let result: T[] = [];
    return new Promise(async (res, rej) => {
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];
            result.push(await callback(element));
            counter++;
            // if (counter >= collection.length) {

            // }
        }
        res(result);
    })
}
