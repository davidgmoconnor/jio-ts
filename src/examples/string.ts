import { schema, string, validate, toType } from "../";

const UserSchema = schema({
  username: string().minLength(8),
  something: string(),
  optional: string().optional(),
});

type User = toType<typeof UserSchema>;

const validateUser = validate(UserSchema);

const { errors, values } = validateUser({
  username: "me",
  something: undefined,
  optional: undefined,
});

function useUser(user: User): void {
  console.log(user);
}

if (errors) console.log(JSON.stringify(errors)); // ["Expecting string at something but instead got: undefined","Expecting string at username but instead got: \"me\" (minimum length 8)"]
if (values) useUser(values);
