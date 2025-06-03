/* eslint-disable @typescript-eslint/member-ordering */
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/rules/naming-convention-utils/types.ts
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/rules/naming-convention-utils/enums.ts

export interface Selector {
    // format options
    format: PredefinedFormatsString[] | null;
    custom?: MatchRegex;
    leadingUnderscore?: UnderscoreOptionsString;
    trailingUnderscore?: UnderscoreOptionsString;
    prefix?: string[];
    suffix?: string[];

    // selector options
    selector: IndividualAndMetaSelectorsString | IndividualAndMetaSelectorsString[];
    modifiers?: ModifiersString[];
    types?: TypeModifiersString[];
    filter?: MatchRegex | string;
}

interface MatchRegex {
    regex: string;
    match: boolean;
}

type PredefinedFormatsString = "camelCase" | "strictCamelCase" | "PascalCase" | "StrictPascalCase" | "snake_case" | "UPPER_CASE";

type UnderscoreOptionsString = "forbid" | "allow" | "require" | "requireDouble" | "allowDouble" | "allowSingleOrDouble";

type SelectorsString =
    | "variable"
    | "function"
    | "parameter"
    | "parameterProperty"
    | "classicAccessor"
    | "enumMember"
    | "classMethod"
    | "objectLiteralMethod"
    | "typeMethod"
    | "classProperty"
    | "objectLiteralProperty"
    | "typeProperty"
    | "autoAccessor"
    | "class"
    | "interface"
    | "typeAlias"
    | "enum"
    | "typeParameter"
    | "import";

type MetaSelectorsString = "default" | "variableLike" | "memberLike" | "typeLike" | "method" | "property" | "accessor";
type IndividualAndMetaSelectorsString = MetaSelectorsString | SelectorsString;

type ModifiersString =
    | "const"
    | "readonly"
    | "static"
    | "public"
    | "protected"
    | "private"
    | "#private"
    | "abstract"
    | "destructured"
    | "global"
    | "exported"
    | "unused"
    | "requiresQuotes"
    | "override"
    | "async"
    | "default"
    | "namespace";

type TypeModifiersString = "boolean" | "string" | "number" | "function" | "array";
