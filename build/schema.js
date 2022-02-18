"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.schema = void 0;
const t = require("io-ts");
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/lib/function");
const io_ts_reporters_1 = require("io-ts-reporters");
const schema = (s) => t.exact(t.type(s));
exports.schema = schema;
const validate = (s) => (input) => (0, function_1.pipe)(s.decode(input), (0, Either_1.fold)((errors) => ({
    errors: (0, io_ts_reporters_1.reporter)((0, Either_1.left)(errors)),
    values: undefined,
}), (values) => ({
    values,
    errors: undefined,
})));
exports.validate = validate;
//# sourceMappingURL=schema.js.map