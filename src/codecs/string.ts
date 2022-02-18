import * as t from "io-ts";
import { left, right, chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { err } from "../util";

export const string = () => {
  return new _String();
};

type Validator = (c?: t.Context) => (i: string) => t.Validation<string>;

class _String extends t.Type<string> {
  private validators: Validator[];
  constructor() {
    super(
      "string",
      (u): u is string => typeof u === "string",
      (u, c) =>
        pipe(
          this.is(u) ? t.success(u) : t.failure(u, c),
          this.runValidators(this.validators, c)
        ),
      t.identity
    );
    this.validators = [];
  }

  minLength(n: number) {
    this.validators.push(
      (c: t.Context) =>
        (input: string): t.Validation<string> =>
          input.length >= n
            ? right(input)
            : left([err(input, c, `minimum length ${n}` as any)])
    );
    return this;
  }

  optional() {
    return new OptionalString();
  }

  private runValidators =
    ([v, ...vs]: Validator[], c?: t.Context) =>
    (value: t.Validation<string>): t.Validation<string> => {
      if (v === undefined) {
        return value;
      }
      return pipe(value, chain(v(c)), this.runValidators(vs, c));
    };
}

class OptionalString extends t.UnionType<
  [t.StringType, t.UndefinedType],
  string | undefined
> {
  constructor() {
    super(
      "optional string",
      (u): u is string | undefined => typeof u === "string" || u === void 0,
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity,
      [t.string, t.undefined]
    );
  }
}
