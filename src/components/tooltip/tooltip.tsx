import React, {
    ReactElement,
    RefObject,
    PropsWithChildren,
    CSSProperties,
    DetailedReactHTMLElement,
    useRef,
    useEffect,
    cloneElement,
    forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

import {
    PopupOffset,
    PopupPosition,
    usePopup,
} from '@src/helpers/hooks/usePopup';

import { Content } from './styled';

//region Types
type Preset = 'button-icon' | 'dropdown';

type Props<T> = {
    label: string;
    disabled?: boolean;
    className?: string;
    position?: PopupPosition;
    offset?: PopupOffset;
    preset?: Preset;
    children: ReactElement | { (ref: RefObject<T>): ReactElement };
};
//endregion

const TooltipContent = forwardRef<
    HTMLDivElement,
    {
        label: string;
        style: CSSProperties;
        className?: string;
    }
>(({ className, style, label }, ref) => {
    const bodyDOM = document.querySelector('body');

    if (!bodyDOM) {
        return null;
    }

    return createPortal(
        <Content ref={ref} className={className} style={style}>
            <span>{label}</span>
        </Content>,
        bodyDOM
    );
});

/**
 * Can be only one child. Make for sure that child component is forwarded by forwardRef or it's just JSX / Styled-components markup.
 * Ref object can be obtained using render props from Children Prop
 * T - Ref object
 */
export const Tooltip = <T extends HTMLElement = HTMLElement>({
    label,
    position = 'right-start',
    offset,
    className,
    children,
    disabled,
    preset,
}: PropsWithChildren<Props<T>>): ReactElement => {
    const presetsConfig: Record<
        Preset,
        {
            position: PopupPosition;
            offset: PopupOffset;
        }
    > = {
        'button-icon': {
            position: 'center-right--bottom',
            offset: {
                x: '0px',
                y: '10px',
            },
        },
        dropdown: {
            position: 'center-right--bottom',
            offset: {
                x: '0px',
                y: '4px',
            },
        },
    };

    const triggerRef = useRef<T>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { style, shown, enable, disable, enabled } = usePopup(
        triggerRef,
        contentRef,
        {
            offset: preset ? presetsConfig[preset].offset : offset,
            position: preset ? presetsConfig[preset].position : position,
            trigger: 'hover',
        }
    );

    useEffect(() => {
        if (disabled) {
            disable();
        } else {
            enable();
        }
    }, [disabled]);

    const getChildren = () => {
        if (typeof children === 'function') {
            return children(triggerRef);
        }
        if (children) {
            return cloneElement(
                children as DetailedReactHTMLElement<any, any>, // TODO: what does he want from me? ._.
                {
                    ref: triggerRef,
                }
            );
        }

        return null;
    };

    return (
        <>
            {getChildren()}
            {shown && enabled && (
                <TooltipContent
                    ref={contentRef}
                    className={className}
                    style={style}
                    label={label}
                />
            )}
        </>
    );
};
