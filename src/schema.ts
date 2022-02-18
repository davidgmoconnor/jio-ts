import * as t from "io-ts";
import { left, fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { reporter } from "io-ts-reporters";

export const schema = <A>(s: { [K in keyof A]: t.Type<A[K]> }) =>
  t.exact(t.type(s));

export const validate =
  <P extends t.Props>(s: t.ExactC<t.TypeC<P>>) =>
  (input: unknown) =>
    pipe(
      s.decode(input),
      fold(
        (errors) => ({
          errors: reporter(left(errors)),
          values: undefined,
        }),
        (values: { [K in keyof P]: t.TypeOf<P[K]> }) => ({
          values,
          errors: undefined,
        })
      )
    );
