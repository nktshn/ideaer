export const LOCALIZATION_DATA: LocalizationData = {
    appTitle: {
        en: 'Ideaer - Your ideas collection',
        ru: 'Ideaer - Твоя коллекция идей'
    },
    generatorTitle: {
        en: 'A new idea',
        ru: 'Новая идея'
    },
    somethingWentWrong: {
        en: 'Something went wrong',
        ru: 'Что-то пошло не так'
    },
    getAnotherOne: {
        en: 'Get another one',
        ru: 'Получить еще'
    },
    collect: {
        en: 'Collect',
        ru: 'Добавить'
    },
    save: {
        en: 'Save',
        ru: 'Сохранить'
    },
    myCollection: {
        en: 'My collection',
        ru: 'Моя коллекция'
    },
    collectIdea: {
        en: 'Collect the idea',
        ru: 'Добавить идею в коллекцию'
    },
    editIdea: {
        en: 'Edit the idea',
        ru: 'Редактировать идею'
    },
    createIdea: {
        en: 'Create an idea',
        ru: 'Создать идею'
    },
    title: {
        en: 'Title',
        ru: 'Заголовок'
    },
    description: {
        en: 'Description',
        ru: 'Описание'
    },
    requiredField: {
        en: 'This field is required',
        ru: 'Это обязательное поле'
    },
    notOnlySpacesField: {
        en: 'This field requires at least one character is not whitespace',
        ru: 'Поле не может содержать только пробелы'
    },
    emptyCollection: {
        en: 'There\'re no ideas in your collection',
        ru: 'В вашей коллекции нет идей'
    }
};

export type SupportedLocalization = 'en' | 'ru';
export interface LocalizationData {
    [messageName: string]: {
        [index in SupportedLocalization]: string
    };
}
