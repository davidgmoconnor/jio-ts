"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const t = require("io-ts");
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/lib/function");
const util_1 = require("../util");
const string = () => {
    return new _String();
};
exports.string = string;
class _String extends t.Type {
    constructor() {
        super("string", (u) => typeof u === "string", (u, c) => (0, function_1.pipe)(this.is(u) ? t.success(u) : t.failure(u, c), this.runValidators(this.validators, c)), t.identity);
        this.runValidators = ([v, ...vs], c) => (value) => {
            if (v === undefined) {
                return value;
            }
            return (0, function_1.pipe)(value, (0, Either_1.chain)(v(c)), this.runValidators(vs, c));
        };
        this.validators = [];
    }
    minLength(n) {
        this.validators.push((c) => (input) => input.length >= n
            ? (0, Either_1.right)(input)
            : (0, Either_1.left)([(0, util_1.err)(input, c, `minimum length ${n}`)]));
        return this;
    }
    optional() {
        return new OptionalString();
    }
}
class OptionalString extends t.UnionType {
    constructor() {
        super("optional string", (u) => typeof u === "string" || u === void 0, (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity, [t.string, t.undefined]);
    }
}
//# sourceMappingURL=string.js.map