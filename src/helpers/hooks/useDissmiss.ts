import { useState } from 'react';

/**
 * Manual dismissing (based on local storage)
 * @param key - unique key value
 * @param forCurrentUser - dismiss for current authorized user (from redux storage: user.data.info.id)
 * @return array with 2 items: the first item is a stateful boolean value, the second item is function for dismissing of current key
 */
export const useDismiss = (
    key: string,
    forCurrentUser = true
): [boolean, () => void] => {
    const dismissKey = 'dismissedItems';
    const itemKey: string = (() => {
        // if (forCurrentUser) {
        //     const user = useSelector(userInfoSelector);
        //     if (user?.id) {
        //         return `${key}-${user.id}`;
        //     } else {
        //         console.warn(
        //             "Cannot get ID of current authorized user. Seems like for now it's a guest user. Please make for sure you are doing good :)"
        //         );
        //     }
        // }
        return key;
    })();

    const getValue = () => {
        try {
            const dismissedHashString = localStorage.getItem(dismissKey);
            if (dismissedHashString === null) {
                throw new Error();
            }
            const dismissedItemsHash = JSON.parse(dismissedHashString);
            return dismissedItemsHash[itemKey];
        } catch {
            localStorage.setItem(
                dismissKey,
                JSON.stringify({ [itemKey]: false })
            );
            return false;
        }
    };
    const [isDismissed, setDismiss] = useState(getValue());
    const onDismissHandler = () => {
        try {
            const dismissedHashString = localStorage.getItem(dismissKey);
            if (dismissedHashString === null) {
                throw new Error();
            }
            const dismissedItemsHash = JSON.parse(dismissedHashString);
            dismissedItemsHash[itemKey] = true;
            localStorage.setItem(
                dismissKey,
                JSON.stringify(dismissedItemsHash)
            );
        } catch {
            localStorage.setItem(
                dismissKey,
                JSON.stringify({ [itemKey]: true })
            );
        }
        setDismiss(true);
    };

    return [isDismissed, onDismissHandler];
};
