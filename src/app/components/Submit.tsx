'use client';

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type SubmitProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Submit(props : SubmitProps) {
  const { disabled, ...otherProps } = props;
  const status = useFormStatus();
  return <button {...otherProps} disabled={status.pending || disabled} />;
}