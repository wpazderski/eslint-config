import type { InfiniteDepthConfigWithExtends } from "typescript-eslint";

export function assertDefinedAndGet<T>(value: T | undefined, message?: string): T {
    if (value === undefined) {
        throw new Error(message ?? "Value is undefined");
    }
    return value;
}

export const jsAndTsLikeFiles: string[] = ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.vue"];
export const testAndTestUtilsFiles: string[] = [
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.specutils.ts",
    "**/*.specutils.tsx",
    "**/*.specUtils.ts",
    "**/*.specUtils.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.testutils.ts",
    "**/*.testutils.tsx",
    "**/*.testUtils.ts",
    "**/*.testUtils.tsx",
];

export function makeOnlyForJsAndTsLikeFiles(config: InfiniteDepthConfigWithExtends): InfiniteDepthConfigWithExtends {
    if (Array.isArray(config)) {
        return config.map((c) => makeOnlyForJsAndTsLikeFiles(c)) as InfiniteDepthConfigWithExtends;
    }
    return {
        ...config,
        files: jsAndTsLikeFiles,
    };
}
