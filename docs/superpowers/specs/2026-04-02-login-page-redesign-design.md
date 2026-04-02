# Cocoon Break 登录页重新设计

## 1. 概念与愿景

Cocoon Break 是一个 AI SuperAgent 平台，"茧"象征用户当前的困境/局限，"破茧"代表 AI 帮助用户突破、释放生产力。登录页作为用户的第一印象，需要传达温暖、希望、新生的感觉，让用户感受到"进入后将被赋能"。

**设计主题**：晨曦破晓 — 温暖的橙黄渐变天空下，蝴蝶从茧中破壳而出，飞向新生。

## 2. 设计语言

### 美学方向
自然生命风 + 晨曦暖色调。参考破茧成蝶的生命周期，传达希望与蜕变。

### 色彩系统
| 角色 | 色值 | 用途 |
|------|------|------|
| 背景深橙 | #FF8C42 | 背景底部 |
| 背景金黄 | #FFD700 | 背景中层 |
| 背景淡粉 | #FFB6C1 | 背景顶部 |
| 光晕中心 | #FFF8DC | 径向光晕核心 |
| 文字主色 | #FFFFFF | 标题、输入框文字 |
| 文字次色 | rgba(255,255,255,0.7) | placeholder、次要文字 |
| 卡片背景 | rgba(255,255,255,0.15) | 毛玻璃登录卡片 (glassmorphism) |
| 卡片边框 | rgba(255,255,255,0.2) | 卡片边框 |
| 按钮主色 | #FF8C42 | 登录按钮背景 |
| 按钮悬停 | #FFA060 | 按钮 hover |

**设计系统参考**（ui-ux-pro-max）：
- **风格**: Nature Distilled + Glassmorphism — 自然暖色调 + 毛玻璃效果
- **动效**: ease-out 入场, ease-in 退场; 150-300ms 微交互; 尊重 prefers-reduced-motion

### 字体
- **主标题**: Lora (Google Fonts)，字重 700，渐变填充
- **副标题/正文**: Raleway (Google Fonts)，字重 400-500
- **字重层级**: 标题 Bold (700)，正文 Regular (400)，标签 Medium (500)
- **Google Fonts**: `@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700|Raleway:wght@300;400;500;600;700')`

### 空间系统
- 登录卡片最大宽度：420px
- 卡片内边距：40px（桌面）/ 24px（移动）
- 元素间距：16px / 24px 节奏
- 圆角：24px（大卡片）/ 12px（输入框/按钮）

### 动效哲学
- **破茧动画**：缓慢、庄严、有张力，暗示蜕变的重量
- **飞舞动画**：轻盈、自由、循环，象征解脱后的自由
- **UI 交互**：微妙的 hover/press 反馈，温暖不突兀

## 3. 布局与结构

### 页面结构
```
┌─────────────────────────────────────┐
│           全屏渐变背景                │
│  ┌─────────────────────────────┐   │
│  │     径向光晕（中心偏上）        │   │
│  └─────────────────────────────┘   │
│                                     │
│        ┌──────────────────┐         │
│        │   毛玻璃欢迎卡片   │         │
│        │   ┌──────────┐   │         │
│        │   │  Logo    │   │         │
│        │   │ 标题文案  │   │         │
│        │   │进入按钮  │   │         │
│        │   └──────────┘   │         │
│        └──────────────────┘         │
│                                     │
│   🦋 蝴蝶飞舞动画叠加在背景上         │
└─────────────────────────────────────┘
```

### 响应式策略
- **桌面端 (>768px)**：登录卡片居中，宽度 400-420px
- **移动端 (≤768px)**：登录卡片撑满宽度（左右 24px 边距），内边距缩小

## 4. 功能与交互

### 欢迎卡片交互
- **标题文案**："破茧而出，释放你的生产力"
- **进入按钮**：文字 "开始探索"，点击后跳转到 `/workspace`
- **点击反馈**：按钮 scale 缩小 + 跳转前短暂渐黑过渡

### 蝴蝶动画序列
1. **Phase 1 — 破茧**（持续 3 秒，页面加载后播放一次）
   - 茧壳从底部中央出现
   - 茧壳缓慢裂开
   - 蝴蝶从中缓缓爬出，翅膀折叠
   - 翅膀逐渐展开至完全状态

2. **Phase 2 — 飞舞**（破茧完成后循环）
   - 蝴蝶向上飘动，伴随轻微左右摇摆
   - 翅膀以较低频率扇动
   - 到达画面中上部后，渐隐并重新从底部飘出
   - 飘动路径略带曲线，非直线

## 5. 组件清单

### WelcomeCard
- 毛玻璃背景：`backdrop-blur-xl bg-white/15` (glassmorphism 15-30% opacity)
- 边框：`border border-white/20`
- 圆角：`rounded-3xl` (16px+)
- 阴影：`shadow-2xl`
- **CSS**: `backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px)`
- 内容：Logo + 标题 + 副标题 + 进入按钮

### PrimaryButton
- 背景：`bg-gradient-to-r from-[#FF8C42] to-[#FFB6C1]`
- 高度：56px（满足 44px+ 触摸目标）
- 圆角：`rounded-xl` (16px)
- 文字：白色，字重 600
- **动效**: scale press 0.96→1.0, ease-out 150-300ms
- **States**:
  - Default：渐变背景
  - Hover：亮度增加 + scale(1.02)
  - Active：scale(0.98)
  - **必须添加**: `cursor-pointer` on hover

### ButterflyAnimation
- 实现方式：CSS Keyframes + SVG 蝴蝶路径
- 破茧阶段：3s ease-out
- 飞舞阶段：8s ease-in-out infinite
- 翅膀扇动：0.3s ease-in-out infinite（与飞舞叠加）
- **无障碍支持**：检测 `prefers-reduced-motion`，如果用户偏好减少动画则只显示静态蝴蝶或完全禁用动画

## 6. 技术方案

### 前端框架
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4

### 实现方式
- 背景：CSS 渐变 + 径向光晕
- 蝴蝶动画：CSS @keyframes + SVG 蝴蝶路径
- 毛玻璃效果：`backdrop-blur-xl`
- 动画性能：使用 `will-change` 优化

### 文件结构
```
frontend/src/
├── app/
│   ├── page.tsx              # 重构为欢迎页
│   └── workspace/
│       └── ...                # 现有工作区路由不变
├── components/
│   ├── login/
│   │   ├── WelcomeCard.tsx    # 欢迎卡片组件
│   │   ├── PrimaryButton.tsx  # 按钮组件
│   │   └── ButterflyAnimation.tsx  # 蝴蝶动画组件
│   └── landing/               # 现有 landing 组件（暂不使用）
```

### 后续扩展
- 认证功能（账号密码/OAuth）可后续独立实现
- 当前点击直接进入 workspace

## 7. 海报素材

已生成海报图片：`minimax-output/sunrise_butterfly.png`

作为背景的补充/备选方案。如采用纯代码实现背景，则此图片可作为 static background 引用。

## 8. 交付检查清单

**视觉质量**
- [ ] 无 emoji 作为图标（使用 Lucide SVG）
- [ ] 所有图标样式一致（stroke width, corner radius）
- [ ] 按钮 hover 状态有平滑过渡（150-300ms）

**交互**
- [ ] 所有可点击元素添加 `cursor-pointer`
- [ ] 触摸目标 ≥44×44px
- [ ] 按钮按压有 scale 反馈 (0.95-0.98)
- [ ] 禁用状态有视觉区分

**无障碍**
- [ ] 检测 `prefers-reduced-motion`，用户偏好减少动画时禁用蝴蝶动画
- [ ] 文字对比度 ≥4.5:1
- [ ] 所有图标/图片有 aria-label

**响应式**
- [ ] 375px / 768px / 1024px / 1440px 断点测试
- [ ] 移动端布局正确

