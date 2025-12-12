
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useClickOutside } from './index';

// Helper component to use the hook
const TestComponent = ({ handler }: { handler: (event: Event) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, handler);
    return (
        <div data-testid="container">
            <div data-testid="inside" ref={ref}>
                Inside
            </div>
            <div data-testid="outside">Outside</div>
        </div>
    );
};

describe('useClickOutside', () => {
    let container: HTMLDivElement | null = null;

    afterEach(() => {
        if (container) {
            document.body.removeChild(container);
        }
        vi.restoreAllMocks();
    });

    it('should call handler when clicking outside', () => {
        const handler = vi.fn();

        // We can't easily use renderHook alone because valid refs require DOM elements.
        // So we might simulate it, or better, use a real DOM setup or @testing-library/react's render.
        // Let's use standard DOM simulation since we are in jsdom.

        const div = document.createElement('div');
        container = div;
        document.body.appendChild(div);

        const ref = { current: div };

        // We'll use renderHook for isolation if possible, but the event listeners are on document.
        renderHook(() => useClickOutside(ref, handler));

        // Simulate click on document (outside)
        document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should NOT call handler when clicking inside', () => {
        const handler = vi.fn();
        const div = document.createElement('div');
        container = div;
        document.body.appendChild(div);
        const ref = { current: div };

        renderHook(() => useClickOutside(ref, handler));

        // Simulate click on the element itself using standard DOM API
        // Note: useClickOutside checks event.target. In jsdom, dispatching on an element sets target to that element.
        div.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('should NOT call handler when clicking a child of the ref element', () => {
        const handler = vi.fn();
        const parent = document.createElement('div');
        container = parent;
        const child = document.createElement('span');
        parent.appendChild(child);
        document.body.appendChild(parent);

        const ref = { current: parent };

        renderHook(() => useClickOutside(ref, handler));

        child.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('should support touchstart events', () => {
        const handler = vi.fn();
        const div = document.createElement('div');
        container = div;
        document.body.appendChild(div);
        const ref = { current: div };

        renderHook(() => useClickOutside(ref, handler));

        document.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
