/* eslint-disable import-x/no-extraneous-dependencies */

import { configs as angularConfigs, processInlineTemplates as angularProcessInlineTemplates } from "angular-eslint";
import { globalIgnores } from "eslint/config";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { type CreateBaseConfigOptions, createBaseConfig } from "./base.config.ts";
import { assertDefinedAndGet, jsAndTsLikeFiles } from "./internal/utils.ts";

export interface CreateAngularConfigOptions extends CreateBaseConfigOptions {}

export const createAngularConfig = (options?: CreateAngularConfigOptions): ConfigArray => {
    const { configs: userConfigs, ...baseConfigOptions } = options ?? {};

    return createBaseConfig({
        ...baseConfigOptions,

        // eslint-disable-next-line @typescript-eslint/no-deprecated
        configs: tseslint.config(
            globalIgnores(["**/.angular/**"]),

            {
                files: jsAndTsLikeFiles,
                extends: [...angularConfigs.tsRecommended],
                processor: assertDefinedAndGet(angularProcessInlineTemplates, "angular-eslint processInlineTemplates is not defined"),
            },
            {
                files: ["**/*.html"],
                extends: [...angularConfigs.templateRecommended, ...angularConfigs.templateAccessibility],
            },

            userConfigs ?? [],
        ),
    });
};
