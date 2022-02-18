import { schema, string, validate, toType } from "..";

const UserSchema = schema({
  username: string().minLength(8),
  something: string(),
  optional: string().optional(),
});

type User = toType<typeof UserSchema>;
type ExtendedUser = User & { password: string };

const validateUser = validate(UserSchema);

function useUser(user: User): void {
  console.log(user);
}

function useExtendedUser(user: ExtendedUser): void {
  console.log(user);
}

const { errors, values } = validateUser({
  username: "me",
  something: undefined,
  optional: undefined,
});

if (errors) console.log(JSON.stringify(errors)); // ["Expecting string at something but instead got: undefined","Expecting string at username but instead got: \"me\" (minimum length 8)"]
if (values) useUser(values); // will print blank as values is undefined
useExtendedUser(values); // compiler warning
