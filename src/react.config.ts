import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { type CreateBaseConfigOptions, createBaseConfig } from "./base.config.ts";
import { commonNamingConventionRules } from "./internal/commonNamingConventionRules.ts";
import { assertDefinedAndGet } from "./internal/utils.ts";

export interface CreateReactConfigOptions extends CreateBaseConfigOptions {
    /**
     * Whether to enable the React Compiler lint rules contributed by `eslint-plugin-react-hooks` v7 (the rules its recommended config adds beyond the two classic ones - e.g. `react-hooks/refs`, `react-hooks/immutability`, `react-hooks/purity`, `react-hooks/set-state-in-render`, `react-hooks/static-components`).
     * When disabled, only the classic Hooks rules (`react-hooks/rules-of-hooks` and `react-hooks/exhaustive-deps`) stay enabled; every other rule from the recommended config is turned off.
     * Enable this only for codebases that adopt the React Compiler, since these rules assume the compiler's model and otherwise flag many legitimate patterns.
     *
     * @default false
     */
    withReactCompiler?: boolean | undefined;
}

export const createReactConfig = (options?: CreateReactConfigOptions): ConfigArray => {
    const { configs: userConfigs, withReactCompiler, ...baseConfigOptions } = options ?? {};

    const reactHooksRecommended = reactHooks.configs.flat["recommended-latest"];

    // Every rule from the react-hooks recommended config except the two classic ones is a React Compiler rule.
    const reactCompilerRulesDisabled = {
        rules: Object.fromEntries(
            Object.keys(reactHooksRecommended.rules)
                .filter((ruleName) => ruleName !== "react-hooks/rules-of-hooks" && ruleName !== "react-hooks/exhaustive-deps")
                .map((ruleName) => [ruleName, "off"] as const),
        ),
    };

    return createBaseConfig({
        ...baseConfigOptions,

        // eslint-disable-next-line @typescript-eslint/no-deprecated
        configs: tseslint.config(
            assertDefinedAndGet(react.configs.flat["recommended"], 'react.configs.flat["recommended"] is not defined'),
            assertDefinedAndGet(react.configs.flat["jsx-runtime"], 'react.configs.flat["jsx-runtime"] is not defined'),
            reactHooksRecommended,
            withReactCompiler === true ? {} : reactCompilerRulesDisabled,
            reactRefreshPlugin.configs.recommended,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            jsxA11y.flatConfigs.recommended,

            {
                settings: {
                    react: {
                        // eslint-plugin-react's "detect" reads the React version via context.getFilename(), which ESLint 10 removed - so it crashes under ESLint 10.
                        // Pin a concrete version (the version-detection code path is skipped when this is not "detect"); override via settings if a consumer targets a different major.
                        version: "19.0",
                    },
                },
                rules: {
                    // plugin: react
                    "react/boolean-prop-naming": [
                        "error",
                        {
                            rule: "^(has|is|should|with)[A-Z]([A-Za-z0-9]?)+",
                        },
                    ],
                    "react/button-has-type": "error",
                    "react/destructuring-assignment": ["error", "never"],
                    "react/display-name": "error",
                    "react/function-component-definition": "error",
                    "react/hook-use-state": "error",
                    "react/iframe-missing-sandbox": "error",
                    "react/jsx-fragments": "error",
                    "react/jsx-handler-names": "error",
                    "react/jsx-key": [
                        "error",
                        {
                            checkFragmentShorthand: true,
                            warnOnDuplicates: true,
                        },
                    ],
                    "react/jsx-max-depth": [
                        "error",
                        {
                            max: 8,
                        },
                    ],
                    "react/jsx-no-bind": "error",
                    "react/jsx-no-comment-textnodes": "error",
                    "react/jsx-no-constructed-context-values": "error",
                    "react/jsx-no-duplicate-props": "error",
                    "react/jsx-no-leaked-render": "error",
                    "react/jsx-no-script-url": "error",
                    "react/jsx-no-target-blank": "error",
                    "react/jsx-props-no-spreading": "error",
                    "react/jsx-uses-react": "off",
                    "react/no-array-index-key": "error",
                    "react/no-children-prop": "error",
                    "react/no-danger": "error",
                    "react/no-danger-with-children": "error",
                    "react/no-deprecated": "error",
                    "react/no-object-type-as-default-prop": "error",
                    "react/no-render-return-value": "error",
                    "react/no-string-refs": "error",
                    "react/no-this-in-sfc": "error",
                    "react/no-unescaped-entities": "error",
                    "react/no-unstable-nested-components": "error",
                    "react/prefer-stateless-function": "error",
                    "react/react-in-jsx-scope": "off",
                    "react/require-render-return": "error",
                    "react/self-closing-comp": "error",

                    // plugin: react-hooks
                    "react-hooks/exhaustive-deps": "error",
                    "react-hooks/rules-of-hooks": "error",

                    // plugin: react-refresh
                    "react-refresh/only-export-components": ["error", { allowConstantExport: true }],

                    // plugin: jsx-a11y
                    "jsx-a11y/alt-text": [
                        "error",
                        {
                            elements: ["img"],
                            img: ["Image"],
                        },
                    ],
                    "jsx-a11y/anchor-has-content": "error",
                    "jsx-a11y/anchor-is-valid": "error",
                    "jsx-a11y/aria-activedescendant-has-tabindex": "error",
                    "jsx-a11y/aria-props": "error",
                    "jsx-a11y/aria-proptypes": "error",
                    "jsx-a11y/aria-role": "error",
                    "jsx-a11y/aria-unsupported-elements": "error",
                    "jsx-a11y/autocomplete-valid": "error",
                    "jsx-a11y/click-events-have-key-events": "error",
                    "jsx-a11y/control-has-associated-label": "error",
                    "jsx-a11y/heading-has-content": "error",
                    "jsx-a11y/html-has-lang": "error",
                    "jsx-a11y/iframe-has-title": "error",
                    "jsx-a11y/img-redundant-alt": "error",
                    "jsx-a11y/interactive-supports-focus": "error",
                    "jsx-a11y/label-has-associated-control": "error",
                    "jsx-a11y/lang": "error",
                    "jsx-a11y/media-has-caption": "error",
                    "jsx-a11y/mouse-events-have-key-events": "error",
                    "jsx-a11y/no-access-key": "error",
                    "jsx-a11y/no-aria-hidden-on-focusable": "error",
                    "jsx-a11y/no-autofocus": "error",
                    "jsx-a11y/no-distracting-elements": "error",
                    "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
                    "jsx-a11y/no-noninteractive-element-interactions": "error",
                    "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
                    "jsx-a11y/no-noninteractive-tabindex": "error",
                    "jsx-a11y/no-redundant-roles": "error",
                    "jsx-a11y/no-static-element-interactions": "error",
                    "jsx-a11y/prefer-tag-over-role": "error",
                    "jsx-a11y/role-has-required-aria-props": "error",
                    "jsx-a11y/role-supports-aria-props": "error",
                    "jsx-a11y/scope": "error",
                    "jsx-a11y/tabindex-no-positive": "error",
                },
            },

            {
                files: ["**/*.tsx"],
                rules: {
                    // eslint core / "Suggestions"
                    "max-lines-per-function": [
                        "error",
                        {
                            max: 300,
                            skipBlankLines: true,
                            skipComments: true,
                            IIFEs: true,
                        },
                    ],

                    // plugin: @typescript-eslint
                    "@typescript-eslint/explicit-function-return-type": "off",
                    "@typescript-eslint/explicit-module-boundary-types": "off",
                    "@typescript-eslint/naming-convention": [
                        "error",
                        ...commonNamingConventionRules,
                        {
                            selector: ["function", "variable"],
                            format: ["strictCamelCase", "StrictPascalCase"],
                        },
                    ],
                },
            },

            userConfigs ?? [],
        ),
    });
};
