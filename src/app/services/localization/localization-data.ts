export const LOCALIZATION_DATA: LocalizationData = {
    title: {
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
    myCollection: {
        en: 'My collection',
        ru: 'Моя коллекция'
    },
    collectIdea: {
        en: 'Collect the idea',
        ru: 'Добавить идею в коллекцию'
    }
};

export type SupportedLocalization = 'en' | 'ru';
export interface LocalizationData {
    [messageName: string]: {
        [index in SupportedLocalization]: string
    };
}
