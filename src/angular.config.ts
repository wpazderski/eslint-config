/* eslint-disable import/no-extraneous-dependencies */

import angular from "angular-eslint";
import { globalIgnores } from "eslint/config";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { type CreateBaseConfigOptions, createBaseConfig } from "./base.config.ts";
import { assertDefinedAndGet, jsAndTsLikeFiles } from "./internal/utils.ts";

export interface CreateAngularConfigOptions extends CreateBaseConfigOptions {}

export const createAngularConfig = (options?: CreateAngularConfigOptions): ConfigArray => {
    const { configs: userConfigs, ...baseConfigOptions } = options ?? {};

    return createBaseConfig({
        ...baseConfigOptions,

        configs: tseslint.config(
            globalIgnores(["**/.angular/**"]),

            {
                files: jsAndTsLikeFiles,
                extends: [...angular.configs.tsRecommended],
                processor: assertDefinedAndGet(angular.processInlineTemplates, "angular.processInlineTemplates is not defined"),
            },
            {
                files: ["**/*.html"],
                extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
            },

            userConfigs ?? [],
        ),
    });
};
