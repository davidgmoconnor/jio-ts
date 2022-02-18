"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const UserSchema = (0, __1.schema)({
    username: (0, __1.string)().minLength(8),
    something: (0, __1.string)(),
    optional: (0, __1.string)().optional(),
});
const validateUser = (0, __1.validate)(UserSchema);
const { errors, values } = validateUser({
    username: "me",
    something: undefined,
    optional: undefined,
});
function useUser(user) {
    console.log(user);
}
if (errors)
    console.log("got errors", JSON.stringify(errors));
if (values)
    useUser(values);
//# sourceMappingURL=string.js.map