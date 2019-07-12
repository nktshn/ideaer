export const LOCALIZATION_DATA: LocalizationData = {
    title: {
        en: 'Ideaer - Your ideas collection',
        ru: 'Ideaer - Твоя коллекция идей'
    }
};

export type SupportedLocalization = 'en' | 'ru';
export interface LocalizationData {
    [messageName: string]: {
        [index in SupportedLocalization]: string
    };
}
