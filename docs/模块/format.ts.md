---
title: format.ts
nav_order: 1
parent: 模块
---

# 概述

格式化代码

---

<h2 class="text-delta">目录</h2>

- [PrettierInput (接口)](#prettierinput-%E6%8E%A5%E5%8F%A3)
- [monadFormat (常量)](#monadformat-%E5%B8%B8%E9%87%8F)
- [format (函数)](#format-%E5%87%BD%E6%95%B0)

---

# PrettierInput (接口)

**签名**

```ts
interface PrettierInput extends Options {
  content: string | object
  extname?: string
}
```

# monadFormat (常量)

格式化代码(Monad)

**签名**

```ts

export const monadFormat: MonadFunction<PrettierInput, string> = ...

```

v0.2.0 中添加

# format (函数)

格式化代码

**签名**

```ts

export const format = (a: PrettierInput): string => ...

```

v0.2.0 中添加
