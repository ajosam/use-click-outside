import { RefObject } from 'react';

type Event = MouseEvent | TouchEvent;
declare const useClickOutside: <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void) => void;

export { useClickOutside };
