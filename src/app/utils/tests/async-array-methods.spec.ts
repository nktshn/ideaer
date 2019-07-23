import { mapAsync } from "../async-array-methods";

describe('Async Array Methods', () => {

    const input = [1, 2, 3];

    beforeEach(() => {

    });

    it('mapAsync', async () => {
        const expectation = [2, 4, 6];
        const result = await mapAsync<number>(input, (num => {
            return new Promise((res, rej) => {
                setTimeout(_ => {
                    res(num * 2)
                }, 50)
            })
        }));
        expect(result).toEqual(expectation);
    });

});
