import { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

type WindowInfo = {
    width: number;
    height: number;
};

export const useWindowInfo = (): WindowInfo => {
    const getWindowInfo = (): WindowInfo => ({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [windowInfo, setWindowInfo] = useState(getWindowInfo());

    useEffect(() => {
        window.addEventListener('resize', changeSizeHandler);

        return () => {
            window.removeEventListener('resize', changeSizeHandler);
        };
    }, []);

    const changeSizeHandler = useCallback(
        throttle(() => {
            setWindowInfo(getWindowInfo());
        }, 500),
        []
    );

    return windowInfo;
};
