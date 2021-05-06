import {
    RefObject,
    CSSProperties,
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';

import { useOutsideClick } from './useOutsideClick';
import { useWindowInfo } from './useWindowInfo';

//region Types
export type PopupPosition =
    | 'center-right--bottom'
    | 'center-left--bottom'
    | 'center-right--top'
    | 'center-left--top'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'left-start'
    | 'top-start'
    | 'top-end';

export type PopupTrigger = 'hover' | 'click';

export type PopupOffset = { x?: string; y?: string };

export type PopupConfig = {
    position?: PopupPosition;
    offset?: PopupOffset;
    trigger?: PopupTrigger;
    interactive?: boolean;
    autoBind?: boolean;
};

export type PopupProps = {
    enabled: boolean;
    enable: () => void;
    disable: () => void;
    style: CSSProperties;
    show: () => void;
    hide: () => void;
    toggleShown: () => void;
    shown: boolean;
};
//endregion

//region Config
const positionsConfig: Record<
    PopupPosition,
    {
        overflowHorizontal?: PopupPosition;
        overflowVertical?: PopupPosition;
        defaultOffset: PopupOffset;
    }
> = {
    'bottom-end': {
        overflowVertical: 'top-end',
        overflowHorizontal: 'bottom-start',
        defaultOffset: {
            x: '0px',
            y: '5px',
        },
    },
    'bottom-start': {
        overflowVertical: 'top-start',
        overflowHorizontal: 'bottom-end',
        defaultOffset: {
            x: '0px',
            y: '5px',
        },
    },
    'top-start': {
        overflowVertical: 'bottom-start',
        overflowHorizontal: 'top-end',
        defaultOffset: {
            x: '0px',
            y: '-5px',
        },
    },
    'top-end': {
        overflowVertical: 'bottom-end',
        overflowHorizontal: 'top-start',
        defaultOffset: {
            x: '0px',
            y: '-5px',
        },
    },
    'left-start': {
        overflowHorizontal: 'right-start',
        defaultOffset: {
            x: '-5px',
            y: '0px',
        },
    },
    'right-start': {
        overflowHorizontal: 'left-start',
        defaultOffset: {
            x: '5px',
            y: '0px',
        },
    },
    'center-right--bottom': {
        overflowHorizontal: 'center-left--bottom',
        overflowVertical: 'center-right--top',
        defaultOffset: {
            x: '0px',
            y: '0px',
        },
    },
    'center-left--bottom': {
        overflowHorizontal: 'center-right--bottom',
        overflowVertical: 'center-left--top',
        defaultOffset: {
            x: '0px',
            y: '0px',
        },
    },
    'center-right--top': {
        overflowHorizontal: 'center-left--top',
        overflowVertical: 'center-right--bottom',
        defaultOffset: {
            x: '0px',
            y: '0px',
        },
    },
    'center-left--top': {
        overflowHorizontal: 'center-right--bottom',
        overflowVertical: 'center-left--bottom',
        defaultOffset: {
            x: '0px',
            y: '0px',
        },
    },
};
//endregion

/**
 * Hook for absolute positioning blocks
 * @param triggerRef Element which will be trigger events
 * @param contentRef Element with exiting content
 * @param config "autoBind" add event listeners for triggerRef. "interactive" - content can be react to user actions
 */
export const usePopup = (
    triggerRef: RefObject<HTMLElement>,
    contentRef: RefObject<HTMLElement>,
    config?: PopupConfig
): PopupProps => {
    const targetConfig: Required<PopupConfig> = {
        offset: { x: '0px', y: '0px' },
        position: 'bottom-start',
        trigger: 'hover',
        interactive: false,
        autoBind: true,
        ...config,
    };

    // Set Handlers
    useEffect(() => {
        if (triggerRef.current && targetConfig.autoBind) {
            switch (targetConfig.trigger) {
                case 'hover':
                    triggerRef.current.addEventListener('mouseenter', show);
                    triggerRef.current.addEventListener('mouseleave', hide);
                    break;
                case 'click':
                    triggerRef.current.addEventListener('click', toggleShown);
                    break;
            }
        }

        return () => {
            if (triggerRef.current && targetConfig.autoBind) {
                switch (targetConfig.trigger) {
                    case 'hover':
                        triggerRef.current.removeEventListener(
                            'mouseenter',
                            show
                        );
                        triggerRef.current.removeEventListener(
                            'mouseleave',
                            hide
                        );
                        break;
                    case 'click':
                        triggerRef.current.removeEventListener(
                            'click',
                            toggleShown
                        );
                        break;
                }
            }
        };
    }, []);

    // Positioning
    const [position, setPosition] = useState<PopupPosition>(
        targetConfig.position
    );

    const [shown, _setShown] = useState(false);
    // addEventListener doesn't updating on re-rendering
    const shownRef = useRef(shown);
    const setShown = (value: boolean) => {
        shownRef.current = value;
        _setShown(value);
    };
    const show = () => {
        setShown(true);
    };
    const hide = () => {
        setShown(false);
    };
    const toggleShown = () => {
        if (shownRef.current) {
            hide();
        } else {
            show();
        }
    };

    useOutsideClick([contentRef, triggerRef], hide);

    // Detecting when content is out of viewport
    const windowInfo = useWindowInfo();
    useLayoutEffect(() => {
        if (shown && contentRef.current) {
            const contentRects = contentRef.current.getBoundingClientRect();
            const isOutOfHorizontal =
                contentRects.right > windowInfo.width || contentRects.left < 0;
            const isOutOfVertical =
                contentRects.top + contentRects.height > windowInfo.height ||
                contentRects.top < 0;
            const overflowHorizontal =
                positionsConfig[position].overflowHorizontal;
            const overflowVertical = positionsConfig[position].overflowVertical;

            if (isOutOfHorizontal && overflowHorizontal) {
                setPosition(overflowHorizontal);
            } else if (isOutOfVertical && overflowVertical) {
                setPosition(overflowVertical);
            }
        }
    }, [shown]);

    const [enabled, setEnabled] = useState(true);
    const enable = () => {
        setEnabled(true);
    };
    const disable = () => {
        hide();
        setEnabled(false);
    };

    if (triggerRef.current === null) {
        return {
            style: {
                left: '0px',
                top: '0px',
            },
            shown,
            hide,
            show,
            enabled,
            enable,
            disable,
            toggleShown,
        };
    }

    const triggerRects = triggerRef.current.getBoundingClientRect();

    const getOffset = (): PopupOffset => {
        if (config && config.offset) {
            return {
                x: config.offset.x || positionsConfig[position].defaultOffset.x,
                y: config.offset.y || positionsConfig[position].defaultOffset.y,
            };
        }

        return positionsConfig[position].defaultOffset;
    };

    const getPositionStyles = (): CSSProperties => {
        const offset = getOffset();

        switch (position) {
            case 'bottom-start':
                return {
                    top: `calc(${(
                        triggerRects.top + triggerRects.height
                    ).toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                };
            case 'bottom-end':
                return {
                    top: `calc(${(
                        triggerRects.top + triggerRects.height
                    ).toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        triggerRects.width
                    }px + ${offset.x})`,
                    transform: 'translateX(-100%)',
                };
            case 'right-start':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        triggerRects.width
                    }px + ${offset.x})`,
                };
            case 'left-start':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: 'translateX(-100%)',
                };
            case 'top-start':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: 'translateY(-100%)',
                };
            case 'top-end':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        triggerRects.width
                    }px + ${offset.x})`,
                    transform: 'translateY(-100%) translateX(-100%)',
                };
            case 'center-right--bottom':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: `translateY(${
                        triggerRects.height / 2
                    }px) translateX(${triggerRects.width / 2}px)`,
                };
            case 'center-left--bottom':
                return {
                    top: `calc(${triggerRects.top.toString()}px + ${offset.y})`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: `translateY(${
                        triggerRects.height / 2
                    }px) translateX(calc(-100% + ${triggerRects.width / 2}px))`,
                };
            case 'center-right--top':
                return {
                    top: `calc(${triggerRects.bottom.toString()}px + ${
                        offset.y
                    })`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: `translateY(calc(-100% - ${
                        triggerRects.height / 2
                    }px + ${offset.y})) translateX(${
                        triggerRects.width / 2
                    }px)`,
                };
            case 'center-left--top':
                return {
                    top: `calc(${triggerRects.bottom.toString()}px + ${
                        offset.y
                    })`,
                    left: `calc(${triggerRects.left.toString()}px + ${
                        offset.x
                    })`,
                    transform: `translateY(calc(-100% - ${
                        triggerRects.height / 2
                    }px + ${offset.y})) translateX(calc(-100% + ${
                        triggerRects.width / 2
                    }px))`,
                };
        }
    };

    const getAdditionalStyles = (): CSSProperties => {
        const styles: CSSProperties = {
            position: 'absolute',
            zIndex: 1100,
        };

        if (!targetConfig.interactive) {
            styles.pointerEvents = 'none';
        }

        return styles;
    };

    return {
        style: { ...getPositionStyles(), ...getAdditionalStyles() },
        shown,
        hide,
        show,
        enabled,
        enable,
        disable,
        toggleShown,
    };
};
