# Contributing to animal-island-ui-tailwind

感谢你对 `animal-island-ui-tailwind` 的关注！欢迎提交 Issue 和 Pull Request。

## 提交 Issue

- 使用 [GitHub Issues](https://github.com/lifeodyssey/animal-island-ui/issues) 提交 Bug 报告或功能建议
- Bug 报告请附上：复现步骤、预期行为、实际行为、浏览器/系统环境
- 功能建议请说明使用场景和期望的 API 设计

## 提交 Pull Request

1. Fork 本仓库并基于 `main` 创建分支 (`git checkout -b feature/my-feature`)
2. 编写代码并确保 `npm run build` 和相关测试通过
3. 提交修改，遵循 [Conventional Commits](https://www.conventionalcommits.org/) 格式：
    - `feat: add xxx` — 新功能
    - `fix: resolve xxx` — Bug 修复
    - `docs: update xxx` — 文档更新
    - `refactor: simplify xxx` — 重构
4. 推送到你的分支 (`git push origin feature/my-feature`)
5. 创建 Pull Request，描述改动内容和动机

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/lifeodyssey/animal-island-ui.git
cd animal-island-ui

# 安装依赖
npm install

# 启动 Demo 开发服务器
npm run dev

# 启动 Storybook 验收服务器（固定使用 6106，避免占用默认 6006）
npm run storybook:test

# 构建组件库
npm run build

# 构建 Demo 站点
npm run build:demo

# 运行迁移、Storybook、Playwright 和视觉回归测试
npm test

# 检查 npm 发布包内容
npm pack --dry-run
```

## 项目结构

```
src/
  components/
    Button/
      Button.tsx            # 组件实现
      index.ts              # 导出入口
    ...
  styles/
    tokens.css              # Tailwind v4 layers + --animal-* 设计令牌 + 组件样式
  utils/
    cn.ts                   # classnames + tailwind-merge 合并工具
  index.ts                  # 库导出入口
demo/                       # Demo 站点源码
stories/                    # Storybook parity/matrix stories
tests/                      # Playwright 交互测试与 pix-to-pix 视觉回归
```

## 新增组件规范

1. 在 `src/components/` 下创建同名目录，包含 `组件.tsx` 和 `index.ts`
2. 组件类名使用稳定的 `animal-*` 命名，并通过 `src/utils/cn.ts` 合并内部类名与用户 `className`
3. 样式写入 `src/styles/tokens.css` 的 `@layer components`，优先复用 `--animal-*` CSS custom properties
4. 在 `src/index.ts` 中导出组件及类型
5. 交互组件优先使用 Radix UI primitives 承载键盘、ARIA、focus 与 portal 行为
6. 在 `demo/` 中添加组件演示，并在 `stories/` 中添加 Storybook parity/matrix story
7. 为新增组件补 Playwright 交互测试；涉及视觉状态时补 `toHaveScreenshot()` 局部截图基线

## 设计令牌

组件库通过 CSS 自定义属性（`--animal-*`）支持运行时主题定制。

| 类别 | 变量前缀                   | 示例                                                    |
| ---- | -------------------------- | ------------------------------------------------------- |
| 颜色 | `--animal-*-color`         | `--animal-primary-color`、`--animal-error-color`        |
| 字体 | `--animal-font-*`          | `--animal-font-size-base`、`--animal-font-family`       |
| 间距 | `--animal-spacing-*`       | `--animal-spacing-sm`(8px)、`--animal-spacing-lg`(16px) |
| 圆角 | `--animal-radius-*` / `--animal-border-radius-*` | `--animal-radius-base`(18px)         |
| 阴影 | `--animal-shadow-*`        | `--animal-shadow-base`                                  |
| 动画 | `--animal-motion-*`        | `--animal-motion-duration-base`(0.25s)                  |
| 尺寸 | `--animal-height-*`        | `--animal-height-base`(40px)                            |

覆盖示例：

```css
:root {
    --animal-primary-color: #19c8b9;
    --animal-text-color: #827157;
    --animal-bg-color: #f8f8f0;
}
```

## 发布检查

本项目以 `animal-island-ui-tailwind` 发布，同时沿用原库单包分发方式。发布前必须确认：

1. `npm run build` 生成 `dist/es/index.js`、`dist/cjs/index.cjs`、`dist/types/index.d.ts` 和 `dist/index.css`
2. `npm pack --dry-run` 只包含 `dist`、`README.md`、`AI_USAGE.md`、`DESIGN_PROMPT.md`、`skill` 与 `package.json`
3. `dist/files` 包含字体和组件资源，且不包含 `.woff` fallback
4. `npm test`、`npm run build:demo`、`npm run build:storybook`、`npx tsc --noEmit` 均通过

自动发布使用 `.github/workflows/release.yml`。仓库需要配置 `NPM_TOKEN` secret，具体步骤见 [`PUBLISHING.md`](./PUBLISHING.md)。

## License

MIT
