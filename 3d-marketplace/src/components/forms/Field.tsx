import type { InputHTMLAttributes, PropsWithChildren } from "react";
type FieldProps = PropsWithChildren<{ label: string; id: string; hint?: string }> & InputHTMLAttributes<HTMLInputElement>;
export function Field({ label, id, hint, children, ...inputProps }: FieldProps) {
  return <label className="form-field" htmlFor={id}><span>{label}</span>{children ?? <input id={id} {...inputProps} />}{hint && <small>{hint}</small>}</label>;
}
