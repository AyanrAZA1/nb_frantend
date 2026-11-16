import { spotlightHandlers } from "../hooks/usePointer";

/** Glass card with cursor spotlight + glowing border. */
export default function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag
      className={`spotlight rounded-2xl border border-border bg-surface/80 shadow-soft backdrop-blur-sm ${className}`}
      {...spotlightHandlers()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
