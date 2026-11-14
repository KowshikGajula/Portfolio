/**
 * Minimal class-name joiner. Keeps `cn(...)` calls terse across the component tree.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
