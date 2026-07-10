# What's this

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

