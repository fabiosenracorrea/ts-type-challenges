<!--info-header-start--><h1>Theme Colors <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23mapped--types-999" alt="#mapped-types"/> <img src="https://img.shields.io/badge/-%23conditional--types-999" alt="#conditional-types"/> <img src="https://img.shields.io/badge/-%23template--literal--types-999" alt="#template-literal-types"/></h1><!--info-header-end-->

Officially submitted! [Check out the suggestion progress in the official repository](https://github.com/type-challenges/type-challenges/issues/37933)


Given a Tailwind-style color configuration object, extract all possible color names that can be used in your application. The type should handle both simple string values and nested objects with `DEFAULT` and variant keys.

For nested objects:
- `DEFAULT` key should use just the parent key name
- Other keys should be combined with the parent key using a dash separator

For example:

```ts
const COLORS = {
  border: 'hsl(var(--some-color))',

  primary: {
    DEFAULT: 'hsl(var(--some-color))',
    dark: 'hsl(var(--some-color))',
    light: 'hsl(var(--some-color))',
    foreground: 'hsl(var(--some-color))',
  },

  muted: {
    DEFAULT: 'hsl(var(--some-color))',
    foreground: 'hsl(var(--some-color))',
  },
}

type AppColor = ExtractColors<typeof COLORS>
// Result: "border" | "primary" | "primary-dark" | "primary-light" |
//         "primary-foreground" | "muted" | "muted-foreground"
```


### Solution

```ts
type AppTheme = typeof COLORS

type Modifiers<T, __NO_DEFAULT__ = Exclude<keyof T, 'DEFAULT'>> = Extract<
  __NO_DEFAULT__,
  string
>

type ModifierColors = {
  [K in keyof AppTheme as AppTheme[K] extends string
    ? never
    : K]: `${Extract<K, string>}-${Modifiers<AppTheme[K]>}`;
}

type AppColor = keyof AppTheme | ModifierColors[keyof ModifierColors]
```
