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

if (errors) console.log("got errors", JSON.stringify(errors));
if (values) useUser(values);
