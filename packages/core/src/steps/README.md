# Steps 步骤条

### 介绍

用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

### 引入

```tsx
import { Steps } from "@taroify/core"
```

## 代码演示

### 基础用法

`value` 属性表示当前步骤的索引，从 0 起计。

```tsx
<Steps value={0}>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 下方标签

可以通过 alternativeLabel 属性来设置下方标签展示方式

```tsx
<Steps defaultValue={0} alternativeLabel>
  <Steps.Step>买家下单</Steps.Step>
  <Steps.Step>商家接单</Steps.Step>
  <Steps.Step>买家提货</Steps.Step>
  <Steps.Step>交易完成</Steps.Step>
</Steps>
```

### 自定义样式

可以通过 `css` 设置激活状态下的颜色。

```tsx
<Steps className="custom-color" defaultValue={0}>
  <Steps.Step icon={<ArrowRight />}>买家下单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>商家接单</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>买家提货</Steps.Step>
  <Steps.Step icon={<ArrowRight />}>交易完成</Steps.Step>
</Steps>
```

```scss
.custom-color {
  .taroify-step--completed {
    .taroify-step__icon, {
      color: #38f;
    }

    .taroify-step__line,
    .taroify-step__circle {
      background-color: #38f;
    }
  }

  .taroify-step--active {
    .taroify-step__label,
    .taroify-step__icon {
      color: #38f;
    }

    .taroify-step__circle {
      background-color: #38f;
    }
  }
}
```

### 竖向步骤条

可以通过设置 `direction` 属性来改变步骤条的显示方向。

```tsx
<Steps defaultValue={0} direction="vertical">
  <Steps.Step>
    <View>【城市】物流状态2</View>
    <View>2016-07-12 12:40</View>
  </Steps.Step>
  <Steps.Step>
    <View>【城市】物流状态1</View>
    <View>2016-07-11 10:00</View>
  </Steps.Step>
  <Steps.Step>
    <View>【城市】物流状态</View>
    <View>2016-07-10 12:00</View>
  </Steps.Step>
  <Steps.Step>
    <View>快件已发货</View>
    <View>2016-07-10 09:30</View>
  </Steps.Step>
</Steps>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认步骤对应的索引值 | _number \| string_ | `0` |
| value | 当前步骤对应的索引值 | _number \| string_ | `0` |
| direction | 步骤条方向，可选值为 `vertical` | _string_ | `horizontal` |
