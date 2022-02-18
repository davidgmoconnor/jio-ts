import * as t from "io-ts";

export type toType<A extends t.Any> = t.TypeOf<A>;
