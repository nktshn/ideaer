export interface Idea {
    title: string;
    description: string;
}

export class Idea implements Idea {
    constructor(idea: Partial<Idea>) {
        for (const key in idea) {
            if (idea.hasOwnProperty(key)) {
                this[key] = idea[key]
            }
        }
    }
    title: string;
    description: string;
}

export interface IdeaInjection {
    idea: Partial<Idea>;
    type: IdeaInjectionType
}

export type IdeaInjectionType = 'create' | 'edit' | 'collect';