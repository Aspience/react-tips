import { PageName } from '../types';
import { getPageUrl } from './getPageUrl';

export const getMainPage = (): PageName => getPageUrl('root');
