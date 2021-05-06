import React, {
    CSSProperties,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    RefObject,
    useRef,
    forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

import { PopupProps, usePopup } from '@shared/helpers/hooks/usePopup';
import { Content } from './styled';

//region Types
type Props<T> = {
    content: ReactNode;
    children: { (ref: RefObject<T>, props: PopupProps): ReactElement };
};
//endregion

const PopupContent = forwardRef<
    HTMLDivElement,
    { children: ReactNode; style: CSSProperties }
>(({ children, style }, ref) => {
    const bodyDOM = document.querySelector('body');

    if (!bodyDOM) {
        return null;
    }

    return createPortal(
        <Content ref={ref} style={style}>
            {children}
        </Content>,
        bodyDOM
    );
});

export const Popup = <T extends HTMLElement = HTMLElement>({
    children,
    content,
}: PropsWithChildren<Props<T>>) => {
    const triggerRef = useRef<T>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const popupProps = usePopup(triggerRef, contentRef, {
        position: 'bottom-start',
        offset: { x: '0px', y: '8px' },
        interactive: true,
        trigger: 'click',
        autoBind: false,
    });
    const { shown, enabled, style } = popupProps;

    const getChildren = () => {
        if (children) {
            return children(triggerRef, popupProps);
        }
        return null;
    };

    return (
        <>
            {getChildren()}
            {shown && enabled && (
                <PopupContent ref={contentRef} style={style}>
                    {content}
                </PopupContent>
            )}
        </>
    );
};
