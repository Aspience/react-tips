import { PageTitleTemplates } from './../types';

const titleTemplatesRegExx = /(^|\s)%(\w+)/g;

export const titleHasTemplates = (title: string) =>
    !!title.match(titleTemplatesRegExx);

export const processTitle = (
    title: string,
    templates?: PageTitleTemplates | null
) => {
    // delete percent char and trim spaces
    const regExp = title
        .match(titleTemplatesRegExx)
        ?.map((item) => item.trim().slice(1));

    if (regExp && templates) {
        let newTitle = title;
        regExp.forEach((template) => {
            newTitle = newTitle.replace(`%${template}`, templates[template]);
        });
        return newTitle;
    }
    return title;
};
