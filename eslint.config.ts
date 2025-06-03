import type { ConfigArray } from "typescript-eslint";
import { createBaseConfig } from "./src/base.config.ts";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default createBaseConfig({
    configs: [
        {
            rules: {
                // eslint core / "Suggestions"
                "max-lines-per-function": "off",

                // plugin: @typescript-eslint
                "@typescript-eslint/naming-convention": "off",
            },
        },
    ],
}) as ConfigArray;
