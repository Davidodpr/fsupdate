# React Hooks Patterns Guide

## Handling useEffect Dependencies for One-Time Setup

When you need to set up event listeners or other side effects only once on mount, but ESLint's `exhaustive-deps` rule complains about missing dependencies, here are the best patterns to use:

### Pattern 1: Ref for Callbacks (Recommended)

Use this when you have callbacks from props that you need in an event handler but don't want to re-register the handler when they change.

```tsx
const Component = ({ onClose, onSave, data }) => {
  // Store callbacks in a ref
  const callbacksRef = useRef({
    onClose,
    onSave,
  })

  // Update the ref when props change (no dependencies needed)
  useEffect(() => {
    callbacksRef.current = {
      onClose,
      onSave,
    }
  })

  // Set up event listener onced
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callbacksRef.current.onClose?.()
      }
      if (e.key === 's' && e.ctrlKey) {
        callbacksRef.current.onSave?.(data)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, []) // Empty array is now valid - no missing dependencies!
}
```

### Pattern 2: Stable References with useCallback

Use when you control the parent component and can ensure stable references.

```tsx
// In parent component
const handleClose = useCallback(() => {
  // handle close logic
}, []) // Keep dependencies minimal

const handleSave = useCallback((data) => {
  // handle save logic
}, []) // Keep dependencies minimal

// Pass stable references to child
<ChildComponent onClose={handleClose} onSave={handleSave} />

// In child component - now safe to include in dependencies
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  document.addEventListener('keydown', handleKeyPress)
  return () => document.removeEventListener('keydown', handleKeyPress)
}, [onClose]) // Now stable, won't cause re-registration
```

### Pattern 3: Custom Hook for Event Listeners

Extract the logic into a reusable custom hook:

```tsx
function useEventListener(eventName: string, handler: (event: Event) => void, element: HTMLElement | Window = window) {
  // Store handler in a ref
  const savedHandler = useRef(handler)

  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler
  })

  useEffect(() => {
    // Create event listener that calls handler from ref
    const eventListener = (event: Event) => {
      savedHandler.current(event)
    }

    element.addEventListener(eventName, eventListener)
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element]) // Only re-run if event name or element changes
}

// Usage
const Component = ({ onClose }) => {
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  })
}
```

### Pattern 4: Disable Rule (Last Resort)

Only use when you're absolutely sure the behavior is correct and other patterns don't fit:

```tsx
useEffect(() => {
  // Some setup that genuinely only needs to run once
  // and you've carefully considered the implications
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

## When to Use Each Pattern

### Use Ref Pattern When:

- You have callback props that might change
- You need the latest version of callbacks without re-running effects
- Setting up global event listeners
- Working with third-party libraries

### Use useCallback Pattern When:

- You control the parent component
- The callbacks don't have many dependencies
- You want to optimize child component re-renders

### Use Custom Hook Pattern When:

- The logic is reusable across components
- You want to encapsulate complex setup/cleanup
- Working with common patterns (event listeners, intervals, etc.)

### Disable the Rule When:

- You've tried other patterns and they don't fit
- You're migrating legacy code temporarily
- The effect genuinely has no dependencies (rare)
- You've documented why it's safe to ignore

## Common Pitfalls to Avoid

### ❌ Don't: Add all dependencies blindly

```tsx
// This will re-register the listener on every render!
useEffect(() => {
  const handler = () => onClose(data)
  document.addEventListener('click', handler)
  return () => document.removeEventListener('click', handler)
}, [onClose, data]) // Re-runs whenever these change
```

### ❌ Don't: Use state directly in event handlers without dependencies

```tsx
// This will have stale state!
useEffect(() => {
  const handler = () => console.log(count) // Always logs initial value
  document.addEventListener('click', handler)
  return () => document.removeEventListener('click', handler)
}, []) // Missing 'count' dependency
```

### ✅ Do: Use refs for latest values

```tsx
const countRef = useRef(count)
useEffect(() => {
  countRef.current = count // Always up to date
})

useEffect(() => {
  const handler = () => console.log(countRef.current) // Always current
  document.addEventListener('click', handler)
  return () => document.removeEventListener('click', handler)
}, [])
```

## Real-World Example: Popup Component

See `/components/molecules/PopupNew/PopupNew.tsx` for a real implementation using the ref pattern to handle outside clicks with callback props.

## ESLint Configuration

If you need to adjust the exhaustive-deps rule project-wide:

```json
// .eslintrc.json
{
  "rules": {
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "(useMyCustomHook|useMyOtherHook)"
      }
    ]
  }
}
```

## Testing Considerations

When testing components with these patterns:

1. Mock refs properly in tests
2. Test cleanup functions are called
3. Verify event listeners are added/removed
4. Check that callbacks use latest prop values

```tsx
it('should use latest callback', () => {
  const { rerender } = render(<Component onSave={mockSave1} />)

  // Update the callback
  rerender(<Component onSave={mockSave2} />)

  // Trigger event
  fireEvent.keyDown(document, { key: 's', ctrlKey: true })

  // Should call the latest callback
  expect(mockSave2).toHaveBeenCalled()
  expect(mockSave1).not.toHaveBeenCalled()
})
```
