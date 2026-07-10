# 研究报告合集 · Research Reports

数据驱动的研究报告合集 GitHub Pages 站点。每份报告是一个独立目录，根目录的 [`index.html`](./index.html) 为统一入口（深色画廊风格，零依赖、纯原生实现）。各报告保留其原始视觉风格与交互，本页仅作统一入口。

## 包含的报告

| 报告 | 目录 | 来源 | 日期 |
|---|---|---|---|
| AI 重塑工作：2026 核心洞察与完整数据 | [`ai-reshaping-work-2026/`](./ai-reshaping-work-2026/) | Cognizant Research | 2026.01 |
| 中信集团子公司营收与利润洞察报告 | [`citic-subsidiaries-analysis/`](./citic-subsidiaries-analysis/) | CITIC Group | 2026.07 |
| 2026 工作趋势指数 | [`work-trend-report-2026/`](./work-trend-report-2026/) | Microsoft | 2026 |

## 如何新增报告

每份报告是一个独立目录，新增只需两步：

**1. 新建目录并放入报告 HTML**（内部用相对路径 `./assets/...`、`./_shared/...`）：

```
github.pages/my-new-report/
└── index.html
```

**2. 在 [`index.html`](./index.html) 顶部的 `REPORTS` 数组追加一项**：

```js
{
  dir:    'my-new-report',
  file:   'index.html',
  title:  '报告标题',
  source: '来源机构',
  date:   '2026.08',
  tag:    '分类 · 主题',
  summary:'一句话摘要……',          // 建议 ≤ 80 字，超出自动截断 4 行
  accent: '#00d4aa',                // 顶部色条：纯色或 CSS linear-gradient(...)
  glow:   '#00d4aa'                 // 悬浮发光色（纯色，用于阴影与高亮）
}
```

数组顺序即展示顺序。

## 关于

本站点为静态 GitHub Pages，零依赖、纯原生 HTML/CSS/JS 实现。各报告保留其原始视觉风格与交互，`index.html` 仅作统一入口与卡片导航。

## 仓库

- GitHub：<https://github.com/kylinsoong/coding.ai>
- 站点源码位于仓库的 `github.pages/` 目录下。
