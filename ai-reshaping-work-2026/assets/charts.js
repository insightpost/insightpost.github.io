(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var warning = style.getPropertyValue('--warning').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var surface = style.getPropertyValue('--surface').trim();

  var commonGrid = {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '15%',
    containLabel: true
  };

  var commonTooltip = {
    trigger: 'axis',
    backgroundColor: surface,
    borderColor: rule,
    textStyle: { color: ink }
  };

  var commonLegend = {
    textStyle: { color: muted },
    top: 0
  };

  // --- Chart 1: Forecast vs Reality ---
  var chartForecast = echarts.init(document.getElementById('chart-forecast'), null, { renderer: 'svg' });
  chartForecast.setOption({
    animation: false,
    tooltip: commonTooltip,
    legend: Object.assign({ data: ['2032 原预测', '2026 实际'] }, commonLegend),
    grid: commonGrid,
    xAxis: {
      type: 'category',
      data: ['某种程度受影响\n(≥5%)', '显著受影响\n(≥25%)', '根本性改变\n(≥50%)'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, interval: 0 }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, formatter: '{value}%' }
    },
    series: [
      {
        name: '2032 原预测',
        type: 'bar',
        data: [90, 52, 15],
        itemStyle: { color: accent2 + 'aa', borderRadius: [4, 4, 0, 0] },
        barGap: '20%'
      },
      {
        name: '2026 实际',
        type: 'bar',
        data: [93, 69, 30],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, formatter: '{c}%' }
      }
    ]
  });
  window.addEventListener('resize', function() { chartForecast.resize(); });

  // --- Chart 2: Task automation distribution ---
  var chartTasks = echarts.init(document.getElementById('chart-tasks'), null, { renderer: 'svg' });
  chartTasks.setOption({
    animation: false,
    tooltip: commonTooltip,
    legend: Object.assign({ data: ['不可自动化', '最小 AI 辅助', '部分 AI 辅助', '大部分/完全 AI 辅助'] }, commonLegend),
    grid: commonGrid,
    xAxis: {
      type: 'category',
      data: ['2023 实际', '2032 原预测', '2026 实际'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, formatter: '{value}%' }
    },
    series: [
      {
        name: '不可自动化',
        type: 'bar',
        stack: 'total',
        data: [57, 43, 43],
        itemStyle: { color: muted + '55' }
      },
      {
        name: '最小 AI 辅助',
        type: 'bar',
        stack: 'total',
        data: [27, 23, 17],
        itemStyle: { color: accent2 + '77' }
      },
      {
        name: '部分 AI 辅助',
        type: 'bar',
        stack: 'total',
        data: [13, 17, 30],
        itemStyle: { color: warning + 'aa' }
      },
      {
        name: '大部分/完全 AI 辅助',
        type: 'bar',
        stack: 'total',
        data: [3, 17, 10],
        itemStyle: { color: accent },
        label: { show: true, position: 'inside', formatter: '{c}%', color: '#0b0f19', fontWeight: 'bold' }
      }
    ]
  });
  window.addEventListener('resize', function() { chartTasks.resize(); });

  // --- Chart 3: Job families exposure vs velocity scatter ---
  var jobFamilies = [
    { name: '商业与金融运营', exposure: 65, velocity: 13, size: 30 },
    { name: '管理', exposure: 64, velocity: 12, size: 35 },
    { name: '计算机与数学', exposure: 67, velocity: 9, size: 22 },
    { name: '建筑与工程', exposure: 45, velocity: 10, size: 15 },
    { name: '生命、物理与社会科学', exposure: 36, velocity: 8, size: 12 },
    { name: '社区与社会服务', exposure: 24, velocity: 6, size: 12 },
    { name: '法律', exposure: 63, velocity: 12, size: 10 },
    { name: '教育指导与图书馆', exposure: 49, velocity: 11, size: 32 },
    { name: '艺术、设计、娱乐、体育与媒体', exposure: 42, velocity: 9, size: 18 },
    { name: '医疗从业者与技术', exposure: 39, velocity: 8, size: 38 },
    { name: '医疗支持', exposure: 29, velocity: 7, size: 30 },
    { name: 'Protective service', exposure: 18, velocity: 6, size: 18 },
    { name: '食品制备与服务', exposure: 22, velocity: 4, size: 42 },
    { name: '建筑与场地清洁维护', exposure: 15, velocity: 4, size: 20 },
    { name: '个人护理与服务', exposure: 16, velocity: 5, size: 28 },
    { name: '销售与相关', exposure: 38, velocity: 8, size: 45 },
    { name: '办公室与行政支持', exposure: 62, velocity: 11, size: 48 },
    { name: '农业、渔业与林业', exposure: 10, velocity: 2, size: 10 },
    { name: '建筑与开采', exposure: 12, velocity: 3, size: 40 },
    { name: '安装、维护与修理', exposure: 20, velocity: 5, size: 22 },
    { name: '生产', exposure: 35, velocity: 7, size: 40 },
    { name: '运输与物料搬运', exposure: 25, velocity: 6, size: 45 }
  ];

  var seriesData = jobFamilies.map(function(j) {
    return {
      name: j.name,
      value: [j.velocity, j.exposure, j.size],
      itemStyle: {
        color: j.exposure >= 39 && j.velocity >= 7 ? accent3 :
               j.exposure >= 39 ? warning :
               j.velocity >= 7 ? accent2 : accent,
        opacity: 0.85
      }
    };
  });

  var chartJobs = echarts.init(document.getElementById('chart-jobs'), null, { renderer: 'svg' });
  chartJobs.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      backgroundColor: surface,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(p) {
        return '<strong>' + p.name + '</strong><br/>' +
               '暴露分数：' + p.value[1] + '%<br/>' +
               '速度分数：' + p.value[0];
      }
    },
    grid: commonGrid,
    xAxis: {
      type: 'value',
      name: '速度分数',
      nameLocation: 'middle',
      nameGap: 30,
      min: 0,
      max: 16,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'value',
      name: '暴露分数 (2026)',
      nameLocation: 'middle',
      nameGap: 40,
      min: 0,
      max: 80,
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, formatter: '{value}%' }
    },
    series: [
      {
        type: 'scatter',
        symbolSize: function(data) { return 6 + data[2] * 0.9; },
        data: seriesData,
        markLine: {
          silent: true,
          lineStyle: { color: rule, type: 'solid' },
          data: [
            { xAxis: 7, label: { formatter: '平均速度 7', color: muted, position: 'end' } },
            { yAxis: 39, label: { formatter: '平均暴露 39%', color: muted, position: 'end' } }
          ]
        },
        markArea: {
          silent: true,
          itemStyle: { color: 'transparent', borderWidth: 1, borderType: 'dashed' },
          data: [
            [
              { xAxis: 7, yAxis: 39, itemStyle: { color: accent3 + '11' } },
              { xAxis: 16, yAxis: 80 }
            ]
          ],
          label: {
            show: true,
            position: 'insideTopRight',
            color: muted,
            formatter: '高暴露 + 高速度'
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chartJobs.resize(); });
})();
