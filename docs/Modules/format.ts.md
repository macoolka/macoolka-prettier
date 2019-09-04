---
title: format.ts
nav_order: 1
parent: Modules
---

# Overview

code formatter

---

<h2 class="text-delta">Table of contents</h2>

- [PrettierInput (interface)](#prettierinput-interface)
- [monadFormat (constant)](#monadformat-constant)
- [format (function)](#format-function)

---

# PrettierInput (interface)

**Signature**

```ts
interface PrettierInput extends Options {
  content: string | object
  extname?: string
}
```

# monadFormat (constant)

Format a code Monad

**Signature**

```ts

export const monadFormat: MonadFunction<PrettierInput, string> = ...

```

Added in v0.2.0

# format (function)

Format a code

**Signature**

```ts

export const format = (a: PrettierInput): string => ...

```

Added in v0.2.0
