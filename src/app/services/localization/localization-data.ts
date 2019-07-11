export const LOCALIZATION_DATA: LocalizationData = {
    error: {
        en: 'Something went wrong',
        ru: 'Что-то пошло не так'
    },
    upload: {
        en: 'upload',
        ru: 'загрузить'
    }
};

export type SupportedLocalization = 'en' | 'ru';
export interface LocalizationData {
    [messageName: string]: {
        [index in SupportedLocalization]: string
    };
}
