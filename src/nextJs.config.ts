/* eslint-disable import/no-extraneous-dependencies */

import next from "@next/eslint-plugin-next";
import { globalIgnores } from "eslint/config";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { type CreateReactConfigOptions, createReactConfig } from "./react.config.ts";

export interface CreateNextJsConfigOptions extends CreateReactConfigOptions {}

export const createNextJsConfig = (options?: CreateNextJsConfigOptions): ConfigArray => {
    const { configs: userConfigs, ...baseConfigOptions } = options ?? {};

    return createReactConfig({
        ...baseConfigOptions,

        configs: tseslint.config(
            globalIgnores(["**/.next/**"]),

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ...next.flatConfig.coreWebVitals,
                files: ["**/*.ts", "**/*.tsx"],
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                rules: {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    ...next.flatConfig.coreWebVitals.rules,

                    // plugin: @next
                    "@next/next/google-font-display": "error",
                    "@next/next/google-font-preconnect": "error",
                    "@next/next/inline-script-id": "error",
                    "@next/next/next-script-for-ga": "error",
                    "@next/next/no-assign-module-variable": "error",
                    "@next/next/no-async-client-component": "error",
                    "@next/next/no-before-interactive-script-outside-document": "error",
                    "@next/next/no-css-tags": "error",
                    "@next/next/no-document-import-in-page": "error",
                    "@next/next/no-duplicate-head": "error",
                    "@next/next/no-head-element": "error",
                    "@next/next/no-head-import-in-document": "error",
                    "@next/next/no-html-link-for-pages": "error",
                    "@next/next/no-img-element": "error",
                    "@next/next/no-page-custom-font": "error",
                    "@next/next/no-script-component-in-head": "error",
                    "@next/next/no-styled-jsx-in-document": "error",
                    "@next/next/no-sync-scripts": "error",
                    "@next/next/no-title-in-document-head": "error",
                    "@next/next/no-typos": "error",
                    "@next/next/no-unwanted-polyfillio": "error",
                },
            },

            {
                files: ["**/*/app/**/@(default|error|global-error|layout|loading|not-found|page|route|template).tsx"],
                rules: {
                    // plugin: import
                    "import/no-default-export": "off",
                },
            },

            {
                files: ["next.config.ts"],
                rules: {
                    // plugin: import
                    "import/no-default-export": "off",
                },
            },

            {
                rules: {
                    // plugin: react-refresh
                    "react-refresh/only-export-components": "off",
                },
            },

            userConfigs ?? [],
        ),
    });
};
