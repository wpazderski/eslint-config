/* eslint-disable import/no-extraneous-dependencies */

import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import playwright from "eslint-plugin-playwright";
import turbo from "eslint-plugin-turbo";
import globals from "globals";
import tseslint, { type ConfigArray, type InfiniteDepthConfigWithExtends, configs as tsEslintConfigs } from "typescript-eslint";
import { commonNamingConventionRules } from "./internal/commonNamingConventionRules.ts";
import { jsAndTsLikeFiles, makeOnlyForJsAndTsLikeFiles, testAndTestUtilsFiles } from "./internal/utils.ts";
import type { RequiredNonNullable } from "./types.ts";

export interface CreateBaseConfigOptions {
    /**
     * Optional custom configurations that will appear close the end of the configuration, but before rules related to watch mode and Prettier.
     */
    configs?: InfiniteDepthConfigWithExtends | undefined;

    /**
     * Optional global ignores that will be applied to the configuration. See https://eslint.org/docs/latest/use/configure/ignore for more details.
     * Regardless of the value, the following directories will always be ignored: coverage, build, dist, dist-ssr, out, out-tsc, playwright-report, test-results, tmp.
     */
    globalIgnores?: string[] | undefined;

    /**
     * Optional custom configurations that will appear at the end of the configuration.
     */
    lastConfigs?: InfiniteDepthConfigWithExtends | undefined;

    /**
     * Optional custom configuration that will override the default TypeScript ESLint configuration (strictTypeChecked).
     */
    tsEslintConfig?: InfiniteDepthConfigWithExtends | undefined;

    /**
     * Whether to create a configuration for watch mode.
     *
     * @default false
     */
    watch?: boolean | undefined;

    /**
     * Whether to include Playwright in the configuration.
     *
     * @default false
     */
    withPlaywright?: boolean | undefined;

    /**
     * Whether to include Prettier in the configuration.
     *
     * @default true
     */
    withPrettier?: boolean | undefined;

    /**
     * Whether to include Turbo in the configuration.
     *
     * @default false
     */
    withTurbo?: boolean | undefined;
}

const defaultOptons: RequiredNonNullable<CreateBaseConfigOptions> = {
    configs: [],
    globalIgnores: [],
    lastConfigs: [],
    tsEslintConfig: makeOnlyForJsAndTsLikeFiles(tsEslintConfigs.strictTypeChecked),
    watch: false,
    withPlaywright: false,
    withPrettier: true,
    withTurbo: false,
};

export const createBaseConfig = (createBaseConfigOptions?: CreateBaseConfigOptions): ConfigArray => {
    const options: RequiredNonNullable<CreateBaseConfigOptions> = {
        configs: createBaseConfigOptions?.configs ?? defaultOptons.configs,
        globalIgnores: createBaseConfigOptions?.globalIgnores ?? defaultOptons.globalIgnores,
        lastConfigs: createBaseConfigOptions?.lastConfigs ?? defaultOptons.lastConfigs,
        tsEslintConfig: createBaseConfigOptions?.tsEslintConfig ?? defaultOptons.tsEslintConfig,
        watch: createBaseConfigOptions?.watch ?? defaultOptons.watch,
        withPlaywright: createBaseConfigOptions?.withPlaywright ?? defaultOptons.withPlaywright,
        withPrettier: createBaseConfigOptions?.withPrettier ?? defaultOptons.withPrettier,
        withTurbo: createBaseConfigOptions?.withTurbo ?? defaultOptons.withTurbo,
    };

    return tseslint.config(
        globalIgnores(["coverage/", "build/", "dist/", "dist-ssr/", "out/", "out-tsc/", "playwright-report/", "test-results/", "tmp/", ...options.globalIgnores]),

        eslint.configs.recommended,
        options.tsEslintConfig,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        makeOnlyForJsAndTsLikeFiles(importPlugin.flatConfigs.recommended),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        makeOnlyForJsAndTsLikeFiles(importPlugin.flatConfigs.typescript),
        options.withTurbo ? turbo.configs["flat/recommended"] : {},

        {
            files: jsAndTsLikeFiles,
            languageOptions: {
                parserOptions: {
                    projectService: true,
                },
            },
            linterOptions: {
                reportUnusedDisableDirectives: true,
            },
            settings: {
                "import/resolver": {
                    typescript: {},
                },
            },
        },

        {
            files: jsAndTsLikeFiles,
            rules: {
                // eslint core / "Possible Problems"
                "no-async-promise-executor": "error",
                "no-compare-neg-zero": "error",
                "no-cond-assign": "error",
                "no-constant-binary-expression": "error",
                "no-constant-condition": "error",
                "no-control-regex": "error",
                "no-debugger": "error",
                "no-dupe-else-if": "error",
                "no-empty-character-class": "error",
                "no-empty-pattern": "error",
                "no-ex-assign": "error",
                "no-fallthrough": "error",
                "no-inner-declarations": "error",
                "no-invalid-regexp": "error",
                "no-irregular-whitespace": "error",
                "no-misleading-character-class": "error",
                "no-promise-executor-return": "error",
                "no-prototype-builtins": "error",
                "no-self-assign": "error",
                "no-self-compare": "error",
                "no-sparse-arrays": "error",
                "no-template-curly-in-string": "error",
                "no-unexpected-multiline": "error",
                "no-unmodified-loop-condition": "error",
                "no-unreachable": "error",
                "no-unreachable-loop": "error",
                "no-unsafe-finally": "error",
                "no-unsafe-negation": "error",
                "no-unsafe-optional-chaining": "error",
                "no-unused-private-class-members": "error",
                "no-useless-assignment": "error",
                "no-useless-backreference": "error",
                "require-atomic-updates": "error",
                "use-isnan": "error",

                // eslint core / "Suggestions"
                "curly": ["error", "all"],
                "default-case": "error",
                "default-case-last": "error",
                "eqeqeq": "error",
                "grouped-accessor-pairs": "error",
                "max-classes-per-file": [
                    "error",
                    {
                        ignoreExpressions: true,
                        max: 1,
                    },
                ],
                "max-depth": ["error", 5],
                "max-lines": [
                    "error",
                    {
                        max: 1000,
                        skipBlankLines: true,
                        skipComments: true,
                    },
                ],
                "max-lines-per-function": [
                    "error",
                    {
                        max: 80,
                        skipBlankLines: true,
                        skipComments: true,
                        IIFEs: true,
                    },
                ],
                "max-nested-callbacks": ["error", 3],
                "no-alert": "error",
                "no-bitwise": "error",
                "no-caller": "error",
                "no-case-declarations": "error",
                "no-console": "error",
                "no-delete-var": "error",
                "no-div-regex": "error",
                "no-eval": "error",
                "no-extend-native": "error",
                "no-extra-bind": "error",
                "no-extra-label": "error",
                "no-global-assign": "error",
                "no-implicit-coercion": "error",
                "no-iterator": "error",
                "no-label-var": "error",
                "no-labels": "error",
                "no-lone-blocks": "error",
                "no-multi-assign": "error",
                "no-negated-condition": "error",
                "no-new": "error",
                "no-new-func": "error",
                "no-new-wrappers": "error",
                "no-nonoctal-decimal-escape": "error",
                "no-object-constructor": "error",
                "no-octal": "error",
                "no-octal-escape": "error",
                "no-param-reassign": ["error", { props: true }],
                "no-proto": "error",
                "no-regex-spaces": "error",
                "no-return-assign": "error",
                "no-script-url": "error",
                "no-sequences": "error",
                "no-shadow-restricted-names": "error",
                "no-unneeded-ternary": "error",
                "no-unused-labels": "error",
                "no-useless-call": "error",
                "no-useless-catch": "error",
                "no-useless-computed-key": "error",
                "no-useless-concat": "error",
                "no-useless-escape": "error",
                "no-useless-rename": "error",
                "no-var": "error",
                "no-void": ["error", { allowAsStatement: true }],
                "no-warning-comments": [
                    "error",
                    {
                        terms: ["todo", "fixme"],
                        location: "start",
                        decoration: ["*", "/", "@"],
                    },
                ],
                "no-with": "error",
                "one-var": ["error", "never"],
                "prefer-arrow-callback": "error",
                "prefer-const": "error",
                "prefer-exponentiation-operator": "error",
                "prefer-named-capture-group": "error",
                "prefer-numeric-literals": "error",
                "prefer-object-has-own": "error",
                "prefer-object-spread": "error",
                "prefer-regex-literals": "error",
                "prefer-rest-params": "error",
                "prefer-spread": "error",
                "prefer-template": "error",
                "radix": "error",
                "require-unicode-regexp": "error",
                "require-yield": "error",
                "sort-imports": ["error", { ignoreDeclarationSort: true }],
                "symbol-description": "error",
                "yoda": "error",

                // plugin: @typescript-eslint
                "@typescript-eslint/adjacent-overload-signatures": "error",
                "@typescript-eslint/array-type": [
                    "error",
                    {
                        default: "array-simple",
                        readonly: "array-simple",
                    },
                ],
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/ban-ts-comment": [
                    "error",
                    {
                        "ts-expect-error": "allow-with-description",
                        "ts-ignore": "allow-with-description",
                        "ts-nocheck": "allow-with-description",
                        "ts-check": false,
                        "minimumDescriptionLength": 3,
                    },
                ],
                "@typescript-eslint/class-literal-property-style": "error",
                "@typescript-eslint/consistent-generic-constructors": "error",
                "@typescript-eslint/consistent-indexed-object-style": "error",
                "@typescript-eslint/consistent-type-assertions": [
                    "error",
                    {
                        assertionStyle: "as",
                        objectLiteralTypeAssertions: "never",
                    },
                ],
                "@typescript-eslint/consistent-type-definitions": "error",
                "@typescript-eslint/consistent-type-exports": "error",
                "@typescript-eslint/consistent-type-imports": "error",
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",
                "dot-notation": "off",
                "@typescript-eslint/dot-notation": "error",
                "@typescript-eslint/explicit-function-return-type": [
                    "error",
                    {
                        allowExpressions: true,
                    },
                ],
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "no-public",
                        overrides: {
                            parameterProperties: "off",
                        },
                    },
                ],
                "@typescript-eslint/explicit-module-boundary-types": "error",
                "max-params": "off",
                "@typescript-eslint/max-params": ["error", { max: 3 }],
                "@typescript-eslint/member-ordering": [
                    "error",
                    {
                        default: {
                            optionalityOrder: "required-first",
                            memberTypes: [
                                // Index signature
                                "signature",
                                "call-signature",

                                // Static fields
                                "public-static-field",
                                "protected-static-field",
                                "private-static-field",
                                "#private-static-field",

                                // Static getters/setters
                                [
                                    "public-static-get",
                                    "public-static-set",
                                    "protected-static-get",
                                    "protected-static-set",
                                    "private-static-get",
                                    "private-static-set",
                                    "#private-static-get",
                                    "#private-static-set",
                                ],

                                // Static methods
                                "public-static-method",
                                "protected-static-method",
                                "private-static-method",
                                "#private-static-method",

                                // Static initialization
                                "static-initialization",

                                // Instance decorated fields
                                "public-decorated-field",
                                "protected-decorated-field",
                                "private-decorated-field",

                                // Instance abstract fields
                                "public-abstract-field",
                                "protected-abstract-field",

                                // Instance fields
                                "public-instance-field",
                                "protected-instance-field",
                                "private-instance-field",
                                "#private-instance-field",

                                // Instance getters/setters
                                [
                                    "public-instance-get",
                                    "public-instance-set",
                                    "protected-instance-get",
                                    "protected-instance-set",
                                    "private-instance-get",
                                    "private-instance-set",
                                    "#private-instance-get",
                                    "#private-instance-set",
                                ],

                                // Constructors
                                "public-constructor",
                                "protected-constructor",
                                "private-constructor",

                                // Instance abstract methods
                                "public-abstract-method",
                                "protected-abstract-method",

                                // Instance decorated methods
                                "public-decorated-method",
                                "protected-decorated-method",
                                "private-decorated-method",

                                // Instance methods
                                "public-instance-method",
                                "protected-instance-method",
                                "private-instance-method",
                                "#private-instance-method",
                            ],
                        },
                    },
                ],
                "@typescript-eslint/method-signature-style": "error",
                "@typescript-eslint/naming-convention": ["error", ...commonNamingConventionRules],
                "no-array-constructor": "off",
                "@typescript-eslint/no-array-constructor": "error",
                "@typescript-eslint/no-array-delete": "error",
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/no-confusing-void-expression": "error",
                "@typescript-eslint/no-deprecated": "error",
                "@typescript-eslint/no-duplicate-enum-values": "error",
                "@typescript-eslint/no-duplicate-type-constituents": "error",
                "@typescript-eslint/no-dynamic-delete": "error",
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/no-empty-object-type": [
                    "error",
                    {
                        allowInterfaces: "always",
                    },
                ],
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-extra-non-null-assertion": "error",
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-for-in-array": "error",
                "no-implied-eval": "off",
                "@typescript-eslint/no-implied-eval": "error",
                "@typescript-eslint/no-import-type-side-effects": "error",
                "@typescript-eslint/no-inferrable-types": "error",
                "@typescript-eslint/no-invalid-void-type": "error",
                "no-loop-func": "off",
                "@typescript-eslint/no-loop-func": "error",
                "no-loss-of-precision": "off",
                "@typescript-eslint/no-loss-of-precision": "error",
                "@typescript-eslint/no-meaningless-void-operator": "error",
                "@typescript-eslint/no-misused-new": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/no-mixed-enums": "error",
                "@typescript-eslint/no-namespace": [
                    "error",
                    {
                        allowDeclarations: true,
                        allowDefinitionFiles: true,
                    },
                ],
                "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
                "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-redundant-type-constituents": "error",
                "@typescript-eslint/no-require-imports": "error",
                "no-shadow": "off",
                "@typescript-eslint/no-shadow": "error",
                "@typescript-eslint/no-this-alias": "error",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/no-unnecessary-condition": "error",
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/no-unnecessary-template-expression": "error",
                "@typescript-eslint/no-unnecessary-type-arguments": "off",
                "@typescript-eslint/no-unnecessary-type-assertion": "error",
                "@typescript-eslint/no-unnecessary-type-constraint": "error",
                "@typescript-eslint/no-unsafe-argument": "error",
                "@typescript-eslint/no-unsafe-assignment": "error",
                "@typescript-eslint/no-unsafe-call": "error",
                "@typescript-eslint/no-unsafe-declaration-merging": "error",
                "@typescript-eslint/no-unsafe-enum-comparison": "error",
                "@typescript-eslint/no-unsafe-member-access": "error",
                "@typescript-eslint/no-unsafe-return": "error",
                "@typescript-eslint/no-unsafe-unary-minus": "error",
                "no-unused-expressions": "off",
                "@typescript-eslint/no-unused-expressions": "error",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    {
                        argsIgnorePattern: "^_",
                        varsIgnorePattern: "^_",
                        caughtErrorsIgnorePattern: "^_",
                    },
                ],
                "no-use-before-define": "off",
                "@typescript-eslint/no-use-before-define": "off",
                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": "off",
                "@typescript-eslint/no-useless-empty-export": "error",
                "@typescript-eslint/no-var-requires": "error",
                "@typescript-eslint/non-nullable-type-assertion-style": "error",
                "no-throw-literal": "off",
                "@typescript-eslint/only-throw-error": "error",
                "@typescript-eslint/prefer-as-const": "error",
                "@typescript-eslint/prefer-enum-initializers": "error",
                "@typescript-eslint/prefer-find": "error",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-function-type": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-literal-enum-member": "error",
                "@typescript-eslint/prefer-namespace-keyword": "error",
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-optional-chain": "error",
                "prefer-promise-reject-errors": "off",
                "@typescript-eslint/prefer-promise-reject-errors": "error",
                "@typescript-eslint/prefer-readonly": "error",
                "@typescript-eslint/prefer-reduce-type-parameter": "error",
                "@typescript-eslint/prefer-regexp-exec": "error",
                "@typescript-eslint/prefer-return-this-type": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/prefer-ts-expect-error": "error",
                "@typescript-eslint/promise-function-async": "error",
                "@typescript-eslint/require-array-sort-compare": "error",
                "require-await": "off",
                "@typescript-eslint/require-await": "error",
                "@typescript-eslint/restrict-plus-operands": "error",
                "@typescript-eslint/restrict-template-expressions": "error",
                "no-return-await": "off",
                "@typescript-eslint/return-await": ["error", "always"],
                "@typescript-eslint/strict-boolean-expressions": "error",
                "@typescript-eslint/switch-exhaustiveness-check": "error",
                "@typescript-eslint/triple-slash-reference": "error",
                "@typescript-eslint/unbound-method": "error",
                "@typescript-eslint/unified-signatures": "error",
                "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",

                // plugin: import
                "import/first": "error",
                "import/no-amd": "error",
                "import/no-anonymous-default-export": "error",
                "import/no-commonjs": "error",
                "import/no-cycle": "error",
                "import/no-default-export": "error",
                "import/no-deprecated": "error",
                "import/no-dynamic-require": "error",
                "import/no-empty-named-blocks": "error",
                "import/no-extraneous-dependencies": [
                    "error",
                    {
                        devDependencies: testAndTestUtilsFiles,
                        optionalDependencies: false,
                        peerDependencies: false,
                    },
                ],
                "import/no-mutable-exports": "error",
                "import/no-named-as-default": "error",
                "import/no-named-as-default-member": "error",
                "import/no-named-default": "error",
                "import/no-self-import": "error",
                "import/no-useless-path-segments": "error",
                "import/no-webpack-loader-syntax": "error",
                "import/order": [
                    "error",
                    {
                        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
                        "newlines-between": "never",
                        "alphabetize": {
                            order: "asc",
                            caseInsensitive: true,
                        },
                        "warnOnUnassignedImports": true,
                        "pathGroupsExcludedImportTypes": [],
                        "pathGroups": [
                            {
                                pattern: "@/**",
                                group: "parent",
                                position: "before",
                            },
                            {
                                pattern: "./**/*.json",
                                group: "sibling",
                                position: "after",
                            },
                            {
                                pattern: "{./**/*.scss,./**/*.css}",
                                group: "object",
                                position: "after",
                            },
                        ],
                    },
                ],

                // plugin: turbo
                ...(options.withTurbo
                    ? {
                          "turbo/no-undeclared-env-vars": [
                              "error",
                              {
                                  allowList: [],
                              },
                          ],
                      }
                    : {}),
            },
        },

        options.withPlaywright
            ? {
                  ...playwright.configs["flat/recommended"],
                  files: testAndTestUtilsFiles,
                  rules: {
                      ...playwright.configs["flat/recommended"].rules,

                      // eslint core / "Suggestions"
                      "max-classes-per-file": "off",
                      "max-depth": "off",
                      "max-lines": "off",
                      "max-lines-per-function": "off",
                      "max-nested-callbacks": "off",

                      // plugin: @typescript-eslint
                      "@typescript-eslint/naming-convention": "off",
                      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",

                      // plugin: playwright
                      "playwright/expect-expect": "error",
                      "playwright/max-expects": [
                          "error",
                          {
                              max: 20,
                          },
                      ],
                      "playwright/max-nested-describe": [
                          "error",
                          {
                              max: 5,
                          },
                      ],
                      "playwright/missing-playwright-await": "error",
                      "playwright/no-commented-out-tests": "error",
                      "playwright/no-conditional-expect": "error",
                      "playwright/no-conditional-in-test": "error",
                      "playwright/no-duplicate-hooks": "error",
                      "playwright/no-element-handle": "error",
                      "playwright/no-eval": "error",
                      "playwright/no-focused-test": "error",
                      "playwright/no-force-option": "error",
                      "playwright/no-get-by-title": "error",
                      "playwright/no-hooks": "off",
                      "playwright/no-nested-step": "error",
                      "playwright/no-networkidle": "error",
                      "playwright/no-nth-methods": "error",
                      "playwright/no-page-pause": "error",
                      "playwright/no-raw-locators": "off",
                      "playwright/no-restricted-matchers": ["error", {}],
                      "playwright/no-skipped-test": "error",
                      "playwright/no-standalone-expect": "error",
                      "playwright/no-unsafe-references": "error",
                      "playwright/no-useless-await": "error",
                      "playwright/no-useless-not": "error",
                      "playwright/no-wait-for-selector": "error",
                      "playwright/no-wait-for-timeout": "error",
                      "playwright/prefer-comparison-matcher": "error",
                      "playwright/prefer-equality-matcher": "error",
                      "playwright/prefer-hooks-in-order": "error",
                      "playwright/prefer-hooks-on-top": "error",
                      "playwright/prefer-lowercase-title": "off",
                      "playwright/prefer-strict-equal": "error",
                      "playwright/prefer-to-be": "error",
                      "playwright/prefer-to-contain": "error",
                      "playwright/prefer-to-have-count": "error",
                      "playwright/prefer-to-have-length": "error",
                      "playwright/prefer-web-first-assertions": "error",
                      "playwright/require-hook": "error",
                      "playwright/require-soft-assertions": "off",
                      "playwright/require-to-throw-message": "error",
                      "playwright/require-top-level-describe": "error",
                      "playwright/valid-describe-callback": "error",
                      "playwright/valid-expect": "error",
                      "playwright/valid-expect-in-promise": "error",
                      "playwright/valid-title": "error",
                  },
              }
            : {},

        {
            files: ["eslint.config.js", "eslint-watch.config.js", "eslint.config.ts", "eslint-watch.config.ts", "playwright.config.ts"],

            languageOptions: {
                globals: {
                    ...globals.node,
                },
            },

            rules: {
                // plugin: @typescript-eslint
                "@typescript-eslint/naming-convention": "off",
                "@typescript-eslint/no-require-imports": "off",
                "@typescript-eslint/no-var-requires": "off",

                // plugin: import
                "import/no-commonjs": "off",
                "import/no-default-export": "off",
                "import/no-extraneous-dependencies": "off",
            },
        },

        {
            files: [
                ".prettierrc.js",
                ".prettierrc.cjs",
                ".prettierrc.ts",
                ".prettierrc.mjs",
                "prettier.config.js",
                "prettier.config.ts",
                "typedoc.config.js",
                "typedoc.config.cjs",
                "typedoc.config.mjs",
            ],

            rules: {
                // plugin: import
                "import/no-default-export": "off",
                "import/no-extraneous-dependencies": "off",
            },
        },

        options.configs,

        options.watch
            ? {
                  linterOptions: {
                      reportUnusedDisableDirectives: false,
                  },
                  rules: {
                      // eslint core / "Possible Problems"
                      "no-debugger": "off",

                      // eslint core / "Suggestions"
                      "no-console": "off",
                      "no-warning-comments": "off",

                      // plugin: @typescript-eslint
                      "@typescript-eslint/no-explicit-any": "off",
                      "@typescript-eslint/no-unsafe-argument": "off",
                      "@typescript-eslint/no-unsafe-assignment": "off",
                      "@typescript-eslint/no-unsafe-call": "off",
                      "@typescript-eslint/no-unsafe-member-access": "off",
                      "@typescript-eslint/no-unsafe-return": "off",
                      "@typescript-eslint/no-unused-vars": "off",
                  },
              }
            : {},

        options.withPrettier ? eslintConfigPrettier : {},

        options.lastConfigs,
    );
};
