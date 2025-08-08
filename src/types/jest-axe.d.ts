declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  export function axe(container: Element | Document): Promise<AxeResults>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function toHaveNoViolations(): any;
}
