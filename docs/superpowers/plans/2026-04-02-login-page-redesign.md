# 登录页重设计实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将登录页从蝴蝶动画欢迎页重构为"晨雾森林"风格的认证页面，包含账号密码表单。

**Architecture:** 页面采用分层结构：底部破茧图片 + CSS 光晕 + 渐变叠加层 + 居中米白卡片。组件模块化拆分：Background（背景）、Input（输入框）、GradientButton（按钮）、LoginCard（主卡片）。

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## 文件结构

| 操作 | 文件路径 | 职责 |
|------|----------|------|
| 创建 | `frontend/src/components/login/Background.tsx` | 全屏背景层（图片+光晕+渐变） |
| 创建 | `frontend/src/components/login/Input.tsx` | 输入框组件 |
| 创建 | `frontend/src/components/login/GradientButton.tsx` | 按钮组件（复用的暗绿按钮） |
| 创建 | `frontend/src/components/login/LoginCard.tsx` | 主卡片组件 |
| 修改 | `frontend/src/app/page.tsx` | 引用新组件 |
| 修改 | `frontend/src/app/globals.css` | 新增渐变背景样式 |
| 删除 | `frontend/src/components/login/WelcomeCard.tsx` | 旧组件 |
| 删除 | `frontend/src/components/login/ButterflyAnimation.tsx` | 旧组件 |
| 删除 | `frontend/src/components/login/PrimaryButton.tsx` | 旧组件（被 GradientButton 替代） |

---

## 配色常量（CSS Variables）

在 `globals.css` 中定义：

```css
:root {
  --color-moss-start: #1a3d2e;
  --color-moss-end: #0d1f17;
  --color-text-primary: #f5f0e8;
  --color-text-secondary: #a8c5b8;
  --color-border: #3d5c4a;
  --color-border-hover: #4a6d58;
  --color-button: #3d5c4a;
  --color-button-hover: #4a6d58;
  --color-glow: rgba(255, 200, 100, 0.3);
}
```

---

## 任务列表

### Task 1: 创建 Background 组件

**Files:**
- Create: `frontend/src/components/login/Background.tsx`

- [ ] **Step 1: 创建 Background.tsx**

```tsx
"use client";

export function Background() {
  return (
    <div className="fixed inset-0 z-0">
      {/* 破茧图片背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/cocoon-break-bg.png')",
          opacity: 0.3,
        }}
      />

      {/* 光晕效果 */}
      <div
        className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,200,100,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* 苔藓绿渐变叠加 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d2e] to-[#0d1f17] opacity-85" />
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/Background.tsx
git commit -m "feat(frontend): add Background component with layered forest effect"
```

---

### Task 2: 创建 Input 组件

**Files:**
- Create: `frontend/src/components/login/Input.tsx`

- [ ] **Step 1: 创建 Input.tsx**

```tsx
"use client";

import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[#a8c5b8] mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full h-12 px-4 bg-transparent",
          "border-b border-[#3d5c4a]",
          "text-[#f5f0e8] placeholder:text-[#a8c5b8]/60",
          "transition-colors duration-200",
          "focus:outline-none focus:border-[#f5f0e8]",
          className
        )}
        {...props}
      />
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/Input.tsx
git commit -m "feat(frontend): add Input component with forest style"
```

---

### Task 3: 创建 GradientButton 组件

**Files:**
- Create: `frontend/src/components/login/GradientButton.tsx`

- [ ] **Step 1: 创建 GradientButton.tsx**

```tsx
"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GradientButton({
  children,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-12 w-full cursor-pointer rounded-lg",
        "bg-[#3d5c4a] text-[#f5f0e8] font-semibold",
        "transition-all duration-200 ease-out",
        "hover:bg-[#4a6d58]",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f0e8]/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/GradientButton.tsx
git commit -m "feat(frontend): add GradientButton component"
```

---

### Task 4: 创建 LoginCard 组件

**Files:**
- Create: `frontend/src/components/login/LoginCard.tsx`

- [ ] **Step 1: 创建 LoginCard.tsx**

```tsx
"use client";

import { GradientButton } from "./GradientButton";
import { Input } from "./Input";

export function LoginCard() {
  return (
    <div
      className="
        relative z-10
        w-full max-w-[380px]
        rounded-2xl
        border border-white/10
        bg-white/8
        p-10
        backdrop-blur-md
        flex
        flex-col
        items-center
        gap-6
      "
      style={{
        backgroundColor: "rgba(255, 252, 245, 0.08)",
        backdropFilter: "blur(15px)",
      }}
    >
      {/* Logo 和标题 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#f5f0e8] md:text-4xl">
          Cocoon Break
        </h1>
        <p className="italic text-lg text-[#a8c5b8] md:text-xl">
          Find Your Clarity
        </p>
      </div>

      {/* 分隔线 */}
      <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* 表单 */}
      <form className="w-full flex flex-col gap-4">
        <Input
          type="text"
          placeholder="账号"
          className="w-full"
        />
        <Input
          type="password"
          placeholder="密码"
          className="w-full"
        />

        {/* 登录按钮 */}
        <div className="mt-2">
          <GradientButton type="submit">
            进入探索
          </GradientButton>
        </div>
      </form>

      {/* 底部链接 */}
      <div className="mt-2">
        <a
          href="#"
          className="
            text-sm text-[#a8c5b8]
            hover:text-[#f5f0e8]
            hover:underline
            transition-colors duration-200
          "
        >
          探索更多 →
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/LoginCard.tsx
git commit -m "feat(frontend): add LoginCard component with form"
```

---

### Task 5: 更新 page.tsx

**Files:**
- Modify: `frontend/src/app/page.tsx:1-15`

- [ ] **Step 1: 更新 page.tsx**

将 `frontend/src/app/page.tsx` 替换为：

```tsx
import { Background } from "@/components/login/Background";
import { LoginCard } from "@/components/login/LoginCard";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* 背景层 */}
      <Background />

      {/* 居中卡片 */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <LoginCard />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/app/page.tsx
git commit -m "feat(frontend): update page.tsx to use new login components"
```

---

### Task 6: 更新 index.ts 导出

**Files:**
- Modify: `frontend/src/components/login/index.ts`

- [ ] **Step 1: 更新 index.ts**

```ts
export { Background } from "./Background";
export { Input } from "./Input";
export { GradientButton } from "./GradientButton";
export { LoginCard } from "./LoginCard";
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/index.ts
git commit -m "feat(frontend): update login exports"
```

---

### Task 7: 删除旧组件

**Files:**
- Delete: `frontend/src/components/login/WelcomeCard.tsx`
- Delete: `frontend/src/components/login/ButterflyAnimation.tsx`
- Delete: `frontend/src/components/login/PrimaryButton.tsx`

- [ ] **Step 1: 删除旧组件文件**

```bash
rm frontend/src/components/login/WelcomeCard.tsx
rm frontend/src/components/login/ButterflyAnimation.tsx
rm frontend/src/components/login/PrimaryButton.tsx
```

- [ ] **Step 2: 提交**

```bash
git add frontend/src/components/login/
git commit -m "feat(frontend): remove old login components (WelcomeCard, ButterflyAnimation, PrimaryButton)"
```

---

### Task 8: 更新全局样式

**Files:**
- Modify: `frontend/src/app/globals.css`

- [ ] **Step 1: 添加背景样式到 globals.css**

确保 globals.css 中有：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 背景渐变基础 */
body {
  @apply bg-[#0d1f17];
}
```

（主要渐变已在 Background 组件的 inline styles 中处理）

- [ ] **Step 2: 提交**

```bash
git add frontend/src/app/globals.css
git commit -m "style(frontend): ensure dark forest background base"
```

---

## 验证步骤

完成所有任务后，运行以下验证：

```bash
cd frontend && pnpm dev
```

访问 `http://localhost:3000`，验证：
1. 深绿色森林渐变背景
2. 隐约可见的破茧图片
3. 中心米白半透明卡片
4. 账号/密码输入框可用
5. "进入探索"按钮 hover 效果正常
6. 无蝴蝶动画或其他旧元素

---

## 完成后操作

实现计划完成且验证通过后：
1. 提交所有更改
2. 推送到 origin
3. 清理旧的 `docs/superpowers/plans/` 中的相关计划文件（如果有）
