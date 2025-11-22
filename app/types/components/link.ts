export interface ILinkButtonProps {
  to?: string | object;
  iconBefore?: string | 'arrow-left';
  iconAfter?: string | 'arrow-right';
  external?: boolean;
  color?: 'primary' | 'secondary';
  noUnderline?: boolean;
}
