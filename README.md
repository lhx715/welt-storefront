# Web App（海外消费者端）

面向海外消费者的 Web 应用，需同时支持桌面端与移动端。
目标功能：商品列表、购物车、多语言切换；商品数据全部 mock，不含后端。

当前状态：**空项目骨架**，仅完成脚手架与依赖安装，尚未引入任何业务依赖。
路由、状态管理、i18n、UI 组件库、CSS 方案等选型待定。

## 技术栈（脚手架默认）

| 项 | 版本 |
| --- | --- |
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Lint | Oxlint |

## 常用命令

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 类型检查 + 生产构建，产物在 dist/
npm run preview  # 预览生产构建
npm run lint     # Oxlint 检查
```

## 目录结构

```
index.html          应用入口 HTML
public/favicon.svg  站点图标（仍是占位图标，待替换）
src/main.tsx        React 挂载入口
src/App.tsx         根组件（占位内容）
src/index.css       全局样式（仅 reset 与字体基线）
```

## 说明

本项目目录内可通过 `src/` 直接新增页面、组件、mock 数据等。
数据层建议先以 `src/mocks/` 形式落地商品数据，便于后续替换为真实接口。
