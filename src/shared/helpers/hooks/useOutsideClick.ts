import {
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T> | RefObject<T>[],
    handler: (e: MouseEvent) => void
) => {
    useEffect(() => {
        savedHandler.current = handler;
    });

    useLayoutEffect(() => {
        const body = document.querySelector('body') as HTMLBodyElement;

        body.addEventListener('click', clickHandler);

        return () => {
            body.removeEventListener('click', clickHandler);
        };
    }, [ref, handler]);

    const savedHandler = useRef(handler);

    const clickHandler = useCallback((e: MouseEvent) => {
        const refs = Array.isArray(ref) ? ref : [ref];
        const contains = !!refs.find(
            (item) =>
                item.current !== null &&
                item.current.contains(e.target as HTMLElement)
        );

        if (!contains) {
            savedHandler.current(e);
        }
    }, []);
};
