import { z } from "zod";

export function parseContentCollection<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown[],
  label: string,
): z.infer<TSchema>[] {
  return data.map((item, index) => {
    const result = schema.safeParse(item);

    if (!result.success) {
      throw new Error(
        `${label}[${index}] failed validation: ${result.error.message}`,
      );
    }

    return result.data;
  });
}
