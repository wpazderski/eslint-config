export type { ConfigArray } from "typescript-eslint";

export type RequiredNonNullable<T> = Required<{
    [P in keyof T]: NonNullable<T[P]>;
}>;
