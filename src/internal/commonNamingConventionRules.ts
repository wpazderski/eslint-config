import type { Selector } from "./namingConventionRuleTypes.ts";

export const commonNamingConventionRules: Selector[] = [
    // Use strictCamelCase by default
    {
        selector: "default",
        format: ["strictCamelCase"],
    },

    // Use both strictCamelCase and StrictPascalCase for identifiers that end with "Class" or "Constructor" (e.g. "const SomeClass = ...")
    {
        selector: "default",
        format: ["strictCamelCase", "StrictPascalCase"],
        filter: {
            regex: "(Class|Constructor)$",
            match: true,
        },
    },

    // Use StrictPascalCase for mixin functions (e.g. "function SomeMixin() { ... }"
    {
        selector: "function",
        format: ["StrictPascalCase"],
        filter: {
            regex: "Mixin$",
            match: true,
        },
    },

    // Use strictCamelCase with a single leading underscore for unused parameters
    {
        selector: "parameter",
        modifiers: ["unused"],
        format: ["strictCamelCase"],
        leadingUnderscore: "require",
    },

    // Use StrictPascalCase for type-like identifiers
    {
        selector: "typeLike",
        format: ["StrictPascalCase"],
        leadingUnderscore: "allow",
    },

    // Special case for mixin type-like identifiers - require "_superOf_" prefix
    {
        selector: "typeLike",
        format: null,
        custom: {
            regex: "^_superOf_[a-zA-Z0-9_]+(_0)?$",
            match: true,
        },
        filter: {
            regex: "^_superOf_[a-zA-Z0-9_]+(_0)?$",
            match: true,
        },
    },

    // Use strictCamelCase for static-readonly class properties (except for "instance" property - used by singleton classes)
    {
        selector: "classProperty",
        modifiers: ["static", "readonly"],
        format: ["strictCamelCase"],
        filter: {
            regex: "^instance$",
            match: false,
        },
    },

    // Use StrictPascalCase with "T" prefix for type parameters
    {
        selector: "typeParameter",
        format: ["StrictPascalCase"],
        prefix: ["T"],
    },

    // Require a boolean-like prefix for boolean vars
    {
        selector: "variable",
        types: ["boolean"],
        format: ["StrictPascalCase"],
        prefix: ["are", "can", "did", "does", "do", "has", "have", "is", "should", "was", "were", "will"],
    },

    // Use both strictCamelCase and StrictPascalCase for const variables; allow optional single or double leading underscore
    {
        selector: "variable",
        modifiers: ["const"],
        format: ["strictCamelCase", "StrictPascalCase"],
        leadingUnderscore: "allowSingleOrDouble",
    },

    // Special case for mixin const variables - require "_superOf_" prefix
    {
        selector: "variable",
        modifiers: ["const"],
        format: null,
        custom: {
            regex: "^_superOf_[a-zA-Z0-9_]+(_[1-9][0-9]*)?$",
            match: true,
        },
        filter: {
            regex: "^_superOf_[a-zA-Z0-9_]+(_[1-9][0-9]*)?$",
            match: true,
        },
    },

    // Use strictCamelCase with a single leading underscore for private properties
    {
        selector: "property",
        format: ["strictCamelCase"],
        leadingUnderscore: "allow",
        modifiers: ["private"],
    },

    // Use strictCamelCase with a single leading underscore for protected properties
    {
        selector: "property",
        format: ["strictCamelCase"],
        leadingUnderscore: "allow",
        modifiers: ["protected"],
    },

    // Use StrictPascalCase for enum members
    {
        selector: "enumMember",
        format: ["StrictPascalCase"],
    },

    // Use both strictCamelCase and StrictPascalCase for default and namespace import names
    {
        selector: "import",
        format: ["strictCamelCase", "StrictPascalCase"],
    },
];
