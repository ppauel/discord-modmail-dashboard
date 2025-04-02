export function hasAccess(permissions: number) {
  return (permissions & (1 << 2)) == 1 << 2;
}
