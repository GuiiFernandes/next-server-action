'use client';

import { PropsWithChildren } from "react";
import { useFormState } from "react-dom";

type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type FormProps = PropsWithChildren<
  Omit<HTMLFormProps, 'action'> & {
    action: (prevState: any, formData: FormData) => Promise<any>;
  }
>;

export default function Form(props : FormProps) {
  const [state, formAction] = useFormState(props.action, { error: null });
  return (
    <form {...props} action={formAction}>
      {props.children}
      {state.message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 w-full text-center" role="alert">
          {state.message}
        </div>
      )}
    </form>
  )
}
