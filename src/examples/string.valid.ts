import { schema, string, validate, toType } from "..";

const UserSchema = schema({
  username: string().minLength(8),
  email: string().optional(),
});

type User = toType<typeof UserSchema>;

const validateUser = validate(UserSchema);

function useUser(user: User): void {
  console.log(user);
}

const { errors, values } = validateUser({
  username: "me and my big name",
  undefinedField: "something",
  email: undefined,
});

if (errors) {
  throw errors;
} // does nothing
if (values) useUser(values); // prints '{username: "me and my big name", email: undefind }
