/**
 * async forEach function allows foreaching async callbacks via await
 */
export async function forEachAsync<T>(collection: T[], callback: (elem: T) => Promise<T> | any): Promise<T> {
    let counter = 0;
    return new Promise(async (res, rej) => {
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];
            await callback(element);
            counter++;
            if (counter >= collection.length) {
                res(element);
            }
        }
    })
}
