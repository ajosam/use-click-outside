# use-click-outside-simple

A lightweight React hook to detect clicks outside of an element.

## Installation

```bash
npm install use-click-outside-simple
# or
yarn add use-click-outside-simple
```

## Usage

```tsx
import { useRef, useState } from 'react';
import { useClickOutside } from 'use-click-outside-simple';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <div ref={modalRef} style={{ border: '1px solid black', padding: '20px', marginTop: '20px' }}>
          <h1>Modal Content</h1>
          <p>Click outside this box to close it.</p>
        </div>
      )}
    </div>
  )
};

export default App;
```

## API

### `useClickOutside(ref, handler)`

- **ref**: `React.RefObject<HTMLElement>` - The ref of the element to detect clicks outside of.
- **handler**: `(event: MouseEvent | TouchEvent) => void` - The function to call when a click outside occurs.
