import { PageName } from '../types';
import { pages } from '../pages';
import { PageProps } from '../../components/page/types';

export const getPageUrl = (
    name: PageName,
    params?: Record<string, string>
): string => {
    const page = pages.find((item) => item.name === name) as PageProps;

    if (params) {
        let route = page.route;
        Object.keys(params).forEach((item) => {
            route = route.replace(`:${item}`, params[item]);
        });
        return route;
    }

    return page.route;
};
