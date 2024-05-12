import { ReactNode } from 'react';
import { UseFormReturn, SubmitHandler, FormProvider as Form, FieldValues } from 'react-hook-form';

interface FormProviderProps<TFormData extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<TFormData>;
  onSubmit: SubmitHandler<TFormData>;
}

export default function FormProvider<TFormData extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<TFormData>) {
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
