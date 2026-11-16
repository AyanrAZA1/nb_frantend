import { useId } from "react";
import { ChevronDown } from "lucide-react";

const base =
  "field-input peer block w-full rounded-xl border bg-surface-2/80 px-4 pb-2 pt-6 text-[0.95rem] text-text outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-transparent focus:border-accent focus:shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]";

/** Floating-label input / select / textarea with inline error. */
export default function Field({ label, error, as = "input", options = [], className = "", required, ...props }) {
  const id = useId();
  const errId = `${id}-err`;
  const border = error ? "border-red-500/80" : "border-border";
  const common = {
    id,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? errId : undefined,
    "aria-required": required ? "true" : undefined,
  };

  return (
    <div className={`relative ${className}`}>
      {as === "select" ? (
        <>
          <select {...common} {...props} className={`${base} ${border} appearance-none pr-10`}>
            <option value="" disabled>
              {props.disabled ? "Select country first" : "Select…"}
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        </>
      ) : as === "textarea" ? (
        <textarea {...common} {...props} placeholder=" " rows={3} className={`${base} ${border} resize-none`} />
      ) : (
        <input {...common} {...props} placeholder=" " className={`${base} ${border}`} />
      )}
      <label
        htmlFor={id}
        data-floated={as === "select" ? "true" : undefined}
        className="field-label pointer-events-none absolute left-4 top-4 origin-left text-[0.95rem] text-muted transition-transform duration-200"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {error && (
        <p id={errId} role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
