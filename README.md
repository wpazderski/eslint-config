# eslint-config

Common [Eslint](https://eslint.org/) flat configs with strict options enabled

### Strict and opinionated

These configs are strict and opinionated, for example:

- in most cases rules are set to `error`, not `warn`,
- using `console` is not allowed ([no-console](https://eslint.org/docs/latest/rules/no-console)),
- comments starting with `@todo` are not allowed,
- naming convention rules are enforced ([@typescript-eslint/naming-convention](https://typescript-eslint.io/rules/naming-convention/)),
- class/interface members are expected to appear in the correct order ([@typescript-eslint/member-ordering](https://typescript-eslint.io/rules/member-ordering)).

## Installation and usage

Start by installing this package and `eslint`, for example with `pnpm`:

```sh
pnpm i -D @wpazderski/eslint-config eslint
```

Then create `eslint.config.ts` file:

```ts
import { create<CONFIG_NAME>Config } from "@wpazderski/eslint-config/<CONFIG_NAME>.config.js";

export default create<CONFIG_NAME>Config();
```

Replace `<CONFIG_NAME>` with chosen config (see [Available configs](#available-configs) section), for example:

```ts
import { createBaseConfig } from "@wpazderski/eslint-config/base.config.js";

export default createBaseConfig();
```

Now you can run Eslint, for example:

```sh
pnpm exec eslint . --flag unstable_native_nodejs_ts_config
```

`unstable_native_nodejs_ts_config` flag is currently required for [native TypeScript support](https://eslint.org/docs/latest/use/configure/configuration-files#native-typescript-support).
See [Eslint docs](https://eslint.org/docs/latest/flags/#how-to-use-feature-flags) to find out other ways to enable flags (including VS Code).

## Available configs

- `base` - general config,
- `angular` - for Angular projects,
- `nextJs` - for Next.js projects,
- `react` - for React projects,
- `vue` - for Vue projects.

## Options

Imported `create*Config` function accepts one optional argument - an object with options:

```ts
interface CreateBaseConfigOptions {
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
```

### Example

```ts
import { createNextJsConfig } from "@wpazderski/eslint-config/nextJs.config.js";

export default createNextJsConfig({
    withTurbo: true,
    watch: true,
    configs: [
        {
            files: ["**/*.tsx"],
            rules: {
                "max-lines-per-function": "off",
            },
        },
    ],
});
```

The above config:

- is for a Next.js app,
- has Turborepo support,
- has `watch` mode enabled,
- disables `max-lines-per-function` rule for `*.tsx` files.

### Watch mode

Running Eslint automatically on save with default configs and `--fix` option can cause problems. For example `console.log` usages would be immediately removed.
Watch mode disables some rules to solve these problems.
The two most common ways of enabling watch mode are:

- creating a separate config file (e.g. `eslint-watch.config.ts`) with `watch: true`,
- using the same `eslint.config.ts` with `watch` option value based on an env var.

## Related projects

- [@wpazderski/prettier-config](https://github.com/wpazderski/prettier-config),
- [@wpazderski/typescript-config](https://github.com/wpazderski/typescript-config),
- [@wpazderski/playwright-config](https://github.com/wpazderski/playwright-config),
- [@wpazderski/playwright-utils](https://github.com/wpazderski/playwright-utils),
- [@wpazderski/configs-utils-example](https://github.com/wpazderski/configs-utils-example) - an example project that shows how to use all configs and utils.
