import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { APP_BASE_HREF } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageMock } from 'src/app/mocks/local-storage-mock';
import { ObjectUtils } from 'src/app/utils/object-utils';

describe('LocalStorageService', () => {
    let service: LocalStorageService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: localStorage, useClass: LocalStorageMock },
            ],

        });
        localStorage.clear();
        service = TestBed.get(LocalStorageService);
    });

    it('useCollection() should return Collection', () => {
        const collection = service.useCollection<string[]>('test');
        expect(collection).toBeTruthy();
    });

    it('useCollection().getData() should return []', () => {
        const collection = service.useCollection<string[]>('test');
        const result = collection.getData();
        const expectation = [];
        expect(result).toEqual(expectation);
    });

    it('useCollection().add() should add values properly', () => {
        const collection = service.useCollection<string>('add');
        const input = ['1', '2', '3'];
        collection.add(...input);
        const result = collection.getData();
        const expectation = ObjectUtils.cloneDeep(input);
        expect(result).toEqual(expectation);
    });

    it('useCollection().update() should update values properly', () => {
        const collection = service.useCollection<{ a: number }>('update');
        localStorage.setItem('update', JSON.stringify([{ a: 0 }, { a: 2 }]));
        const input = { a: 3 };
        collection.update(0, input);
        const result = collection.getData();
        const expectation = [{ a: 3 }, { a: 2 }];
        expect(result).toEqual(expectation);
    });


    it('useCollection().update() should update values properly with normalization', () => {
        const collection = service.useCollection<{ a: number }>('update');
        localStorage.setItem('update', JSON.stringify([{ a: 0 }, { a: 1 }]));
        const input = { a: 2 };
        collection.update(5, input);
        const result = collection.getData();
        const expectation = [{ a: 0 }, { a: 1 }, { a: 2 }];
        expect(result).toEqual(expectation);
        expect(result.length).toEqual(expectation.length);
    });

    it('useCollection().remove() should remove values properly with normalization', () => {
        const collection = service.useCollection<number>('update');
        localStorage.setItem('update', JSON.stringify([1, 2, 3, , 5]));
        collection.remove(2);
        const result = collection.getData();
        const expectation = [1, 2, 5];
        expect(result).toEqual(expectation);
        expect(result.length).toEqual(expectation.length);
    });

});
