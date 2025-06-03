import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import vue from "eslint-plugin-vue";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { type CreateBaseConfigOptions, createBaseConfig } from "./base.config.ts";

export interface CreateVueConfigOptions extends CreateBaseConfigOptions {}

export const createVueConfig = (options?: CreateVueConfigOptions): ConfigArray => {
    const { configs: userConfigs, tsEslintConfig: userTsEslintConfig, ...baseConfigOptions } = options ?? {};

    return defineConfigWithVueTs(
        createBaseConfig({
            ...baseConfigOptions,
            tsEslintConfig: userTsEslintConfig ?? vueTsConfigs.strictTypeChecked,

            configs: tseslint.config(
                vue.configs["flat/recommended"],

                {
                    rules: {
                        // plugin: vue
                        "vue/attribute-hyphenation": "error",
                        "vue/component-definition-name-casing": "error",
                        "vue/first-attribute-linebreak": "error",
                        "vue/html-closing-bracket-newline": "error",
                        "vue/html-closing-bracket-spacing": "error",
                        "vue/html-end-tags": "error",
                        "vue/html-indent": "error",
                        "vue/html-quotes": "error",
                        "vue/html-self-closing": "error",
                        "vue/max-attributes-per-line": "error",
                        "vue/multiline-html-element-content-newline": "error",
                        "vue/mustache-interpolation-spacing": "error",
                        "vue/no-multi-spaces": "error",
                        "vue/no-spaces-around-equal-signs-in-attribute": "error",
                        "vue/no-template-shadow": "error",
                        "vue/one-component-per-file": "error",
                        "vue/prop-name-casing": "error",
                        "vue/require-default-prop": "error",
                        "vue/require-explicit-emits": "error",
                        "vue/require-prop-types": "error",
                        "vue/singleline-html-element-content-newline": "error",
                        "vue/v-bind-style": "error",
                        "vue/v-on-event-hyphenation": [
                            "error",
                            "always",
                            {
                                autofix: true,
                            },
                        ],
                        "vue/v-on-style": "error",
                        "vue/v-slot-style": "error",
                        "vue/attributes-order": "error",
                        "vue/block-order": "error",
                        "vue/no-lone-template": "error",
                        "vue/no-multiple-slot-args": "error",
                        "vue/no-required-prop-with-default": "error",
                        "vue/no-v-html": "error",
                        "vue/order-in-components": "error",
                        "vue/this-in-template": "error",
                    },
                },

                {
                    files: ["**/*.vue"],
                    rules: {
                        // eslint core / "Possible Problems"
                        "no-useless-assignment": "off",
                    },
                },

                {
                    files: ["vite.config.ts"],
                    rules: {
                        // plugin: import
                        "import/no-default-export": "off",
                        "import/no-extraneous-dependencies": "off",
                    },
                },

                userConfigs ?? [],
            ),
        }),
    );
};
