import { PageName } from '../types';
import { getPageUrl } from './getPageUrl';

export const getLoginPage = (): PageName => getPageUrl('login');
