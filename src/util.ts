import * as t from "io-ts";

export const err = (value: unknown, context: t.Context, message: string) => ({
  value,
  context,
  message,
});
