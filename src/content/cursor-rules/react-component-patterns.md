---
title: "React Component Patterns"
description: "Cursor rule for consistent React component structure, hooks usage, and state management patterns."
author: "Luca"
tags: ["react", "components", "frontend"]
difficulty: "beginner"
createdAt: 2026-03-30
updatedAt: 2026-03-30
featured: false
installType: "cursor-rule"
installTarget: ["cursor"]
---

## What it does

Guides Cursor AI to generate React components following iO's preferred patterns and conventions.

## Setup

Copy into `.cursor/rules/react.mdc` in your project.

## Rule Content

````markdown
# React Component Patterns

## File Naming and Organization
- One component per file. Name the file the same as the component: `UserProfile.tsx`
- Colocate related files in a folder when a component grows beyond a single file:
  ```
  components/
    UserProfile/
      UserProfile.tsx        # Main component
      UserProfile.test.tsx   # Tests
      UserProfile.hooks.ts   # Custom hooks specific to this component
      UserProfile.utils.ts   # Helper functions
      UserProfile.types.ts   # Types used only by this component
      index.ts               # Re-export: export { UserProfile } from './UserProfile'
  ```
- Shared types go in a top-level `types/` directory, not scattered across components
- Barrel exports (`index.ts`) should only re-export the public API, never internal helpers

## Component Structure
- Use functional components with arrow functions
- Follow a consistent internal ordering:
  ```tsx
  // 1. Type definitions
  interface UserProfileProps {
    userId: string;
    showAvatar?: boolean;
    onEdit?: (user: User) => void;
  }

  // 2. Component definition
  const UserProfile = ({ userId, showAvatar = true, onEdit }: UserProfileProps) => {
    // 3. Hooks (useState, useEffect, custom hooks, etc.)
    const { data: user, isLoading } = useUser(userId);
    const [isEditing, setIsEditing] = useState(false);

    // 4. Derived state (computed from hooks/props, no useState needed)
    const fullName = user ? `${user.firstName} ${user.lastName}` : '';
    const canEdit = user?.role === 'admin' && onEdit !== undefined;

    // 5. Event handlers and callbacks
    const handleEditClick = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleSave = useCallback((updatedUser: User) => {
      setIsEditing(false);
      onEdit?.(updatedUser);
    }, [onEdit]);

    // 6. Early returns (loading, error, empty states)
    if (isLoading) return <UserProfileSkeleton />;
    if (!user) return <EmptyState message="User not found" />;

    // 7. Render
    return (
      <div className="flex items-center gap-4">
        {showAvatar && <Avatar src={user.avatarUrl} alt={fullName} />}
        <div>
          <h2 className="text-lg font-semibold">{fullName}</h2>
          {canEdit && <Button onClick={handleEditClick}>Edit</Button>}
        </div>
      </div>
    );
  };
  ```

## Props Patterns
- Always define a named interface for props (not inline):
  ```tsx
  // Good
  interface ButtonProps {
    variant: 'primary' | 'secondary';
    children: React.ReactNode;
  }

  // Avoid
  const Button = (props: { variant: string; children: React.ReactNode }) => { ... }
  ```
- Use `React.ComponentPropsWithoutRef<'button'>` when extending native HTML elements:
  ```tsx
  interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    variant: 'primary' | 'secondary';
    isLoading?: boolean;
  }

  const Button = ({ variant, isLoading, children, ...rest }: ButtonProps) => (
    <button {...rest} disabled={isLoading || rest.disabled}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
  ```
- Use `children: React.ReactNode` for components that accept children. Avoid `React.FC`
- Provide sensible defaults for optional props using destructuring defaults
- Use discriminated unions when props depend on each other:
  ```tsx
  type ModalProps =
    | { variant: 'confirm'; onConfirm: () => void; onCancel: () => void }
    | { variant: 'info'; onClose: () => void };
  ```

## Compound Components
- Use compound components for related UI that shares implicit state:
  ```tsx
  // Usage
  <Select value={selected} onChange={setSelected}>
    <Select.Trigger>Choose an option</Select.Trigger>
    <Select.Options>
      <Select.Option value="a">Option A</Select.Option>
      <Select.Option value="b">Option B</Select.Option>
    </Select.Options>
  </Select>
  ```
- Implement with React Context to share state between parent and children:
  ```tsx
  const SelectContext = createContext<SelectContextValue | null>(null);

  const useSelectContext = () => {
    const context = useContext(SelectContext);
    if (!context) throw new Error('Select compound components must be used within <Select>');
    return context;
  };

  const Select = ({ value, onChange, children }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
        <div className="relative">{children}</div>
      </SelectContext.Provider>
    );
  };

  Select.Trigger = ({ children }: { children: React.ReactNode }) => {
    const { setIsOpen } = useSelectContext();
    return <button onClick={() => setIsOpen((o) => !o)}>{children}</button>;
  };
  ```

## Error Boundaries
- Wrap major sections of the UI in error boundaries so a failure in one section does not crash the entire page:
  ```tsx
  <ErrorBoundary fallback={<DashboardError />}>
    <Dashboard />
  </ErrorBoundary>
  ```
- Use `react-error-boundary` for a production-ready implementation with `useErrorBoundary` hook and reset capabilities:
  ```tsx
  import { ErrorBoundary } from 'react-error-boundary';

  const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-sm text-red-600">{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
  ```
- Place error boundaries at route level and around third-party components or complex interactive widgets
- Never use error boundaries for expected errors (form validation, 404s). Those should be handled in normal control flow

## Hooks Best Practices
- Custom hooks for shared logic, always prefixed with `use`:
  ```tsx
  const useDebounce = <T,>(value: T, delayMs: number): T => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delayMs);
      return () => clearTimeout(timer);
    }, [value, delayMs]);
    return debounced;
  };
  ```
- Keep effects minimal. Prefer derived state over syncing state with `useEffect`:
  ```tsx
  // Bad: syncing state
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // Good: derived state
  const fullName = `${firstName} ${lastName}`;
  ```
- Use `useCallback` only when passing callbacks to memoized children or including them in dependency arrays
- Use `useMemo` only for genuinely expensive computations, not for simple object creation

## Performance Optimization
- Use `React.memo` sparingly and only when you have evidence a component re-renders too often with unchanged props
- Prefer restructuring component trees (lifting state, pushing state down) over memoization
- Use `React.lazy` and `Suspense` for code splitting at the route level:
  ```tsx
  const Settings = React.lazy(() => import('./pages/Settings'));

  <Suspense fallback={<PageSkeleton />}>
    <Settings />
  </Suspense>
  ```
- Virtualize long lists with `@tanstack/react-virtual` or similar. Never render 1000+ items in the DOM
- Avoid creating new objects/arrays in render. Move constants outside the component:
  ```tsx
  // Outside component
  const EMPTY_ARRAY: readonly string[] = [];

  const MyComponent = ({ items = EMPTY_ARRAY }: Props) => { ... };
  ```

## State Management
- Colocate state as close to where it is used as possible
- Prefer server state tools (TanStack Query, SWR) over client state for remote data
- Use `useReducer` for complex state transitions with multiple related values:
  ```tsx
  type FormState = { status: 'idle' | 'submitting' | 'error'; errorMessage?: string };
  type FormAction = { type: 'submit' } | { type: 'success' } | { type: 'error'; message: string };

  const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case 'submit': return { status: 'submitting' };
      case 'success': return { status: 'idle' };
      case 'error': return { status: 'error', errorMessage: action.message };
    }
  };
  ```
- For global client state that many components need, prefer Zustand or Jotai over React Context (Context triggers re-renders for all consumers on any change)

## Form Handling
- Use a form library (React Hook Form, Formik) for anything beyond a single input
- Validate with zod schemas shared between client and server:
  ```tsx
  const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  ```
- Always show validation errors inline next to the relevant field
- Disable the submit button while the form is submitting to prevent double submission
- Use controlled components only when you need to react to every keystroke (e.g., live search). Prefer uncontrolled with React Hook Form otherwise

## Accessibility Patterns
- Every interactive element must be keyboard-accessible. If you use `onClick` on a `div`, you are probably doing it wrong. Use a `button` or `a` instead
- Always provide `aria-label` when the visual label is absent:
  ```tsx
  <button aria-label="Close dialog" onClick={onClose}>
    <XIcon />
  </button>
  ```
- Use semantic HTML: `nav`, `main`, `article`, `section`, `aside`, `header`, `footer`
- Manage focus on route changes and modal open/close. Use `useRef` and `element.focus()` or a focus-trap library
- Ensure color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Use `role="alert"` or `aria-live="polite"` for dynamic content updates (toast notifications, form errors)

## Styling
- Tailwind CSS utility classes preferred
- No inline styles except for truly dynamic values (e.g., `style={{ width: `${percentage}%` }}`)
- Use `clsx` or `cn` (from shadcn/ui) for conditional classes:
  ```tsx
  className={cn(
    'rounded-lg border p-4 transition-colors',
    isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
    className
  )}
  ```

## Testing Guidance
- Test behavior, not implementation. Query by role, label, or text, not by class name or test ID
- Use `@testing-library/react` and `userEvent` for simulating user interactions
- Name test files alongside their component: `UserProfile.test.tsx`
- Structure tests with arrange-act-assert and descriptive test names:
  ```tsx
  it('disables the submit button while the form is submitting', async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
  ```
````
