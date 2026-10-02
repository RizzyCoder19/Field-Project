export interface FormSubmitResult {
  ok: boolean;
}

export interface FormHandle {
  submit(args: { values: Record<string, unknown> }): Promise<FormSubmitResult>;
}

let hasWarned = false;

const exportedFormHandle: FormHandle = {
  async submit() {
    if (!hasWarned) {
      hasWarned = true;
      console.warn("Form submissions are not available in exported projects");
    }
    return { ok: false };
  },
};

export function useFormPlugin(localName: string): FormHandle {
  void localName;
  return exportedFormHandle;
}
