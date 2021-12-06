# TreeSelect 分类选择

### 介绍

用于从一组相关联的数据集合中进行选择。

### 引入

```tsx
import { TreeSelect } from "@taroify/core"
```

## 代码演示

### 单选模式

`tabValue` 表示左侧高亮选项的索引，`value` 表示右侧高亮选项的 value。

```tsx
import { TreeSelect } from "@taroify/core"

function RadioTreeSelect() {
  const [tabValue, setTabValue] = useState(0)
  const [value, setValue] = useState(0)

  return (
    <TreeSelect tabValue={tabValue} value={value} onTabChange={setTabValue} onChange={setValue}>
      <TreeSelect.Tab title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>
      </TreeSelect.Tab>
    </TreeSelect>
  )
}
```

### 多选模式

`value` 为数组格式时，可以选中多个右侧选项。

```tsx
import { TreeSelect } from "@taroify/core"

function MultiselectTreeSelect() {
  const [tabValue, setTabValue] = useState(0)
  const [value, setValue] = useState([0, 1])

  return (
    <TreeSelect tabValue={tabValue} value={value} onTabChange={setTabValue} onChange={setValue}>
      <TreeSelect.Tab title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>
      </TreeSelect.Tab>
    </TreeSelect>
  )
}
```

### 自定义内容

可以通过 `TreeSelect.Tab` 组件自定义右侧区域的内容。

```tsx
import { TreeSelect } from "@taroify/core"

function TreeSelectWithCustomContent() {
  const [tabValue, setTabValue] = useState(0)

  return (
    <TreeSelect tabValue={tabValue} onTabChange={setTabValue}>
      <TreeSelect.Tab title="分组 1">
        <Image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </TreeSelect.Tab>
      <TreeSelect.Tab title="分组 2">
        <Image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </TreeSelect.Tab>
    </TreeSelect>
  )
}
```

### 徽标提示

设置 `badge` 属性后，会在图标右上角展示相应的徽标。

```tsx
import { TreeSelect } from "@taroify/core"

function BadgeTreeSelect() {
  const [tabValue, setTabValue] = useState(0)
  const [value, setValue] = useState(0)

  return (
    <TreeSelect tabValue={tabValue} value={value} onTabChange={setTabValue} onChange={setValue}>
      <TreeSelect.Tab badge title="浙江">
        <TreeSelect.Option value={0}>杭州</TreeSelect.Option>
        <TreeSelect.Option value={1}>温州</TreeSelect.Option>
        <TreeSelect.Option value={2} disabled>
          宁波
        </TreeSelect.Option>
        <TreeSelect.Option value={3}>义乌</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab badge="5" title="江苏">
        <TreeSelect.Option value={4}>南京</TreeSelect.Option>
        <TreeSelect.Option value={5}>无锡</TreeSelect.Option>
        <TreeSelect.Option value={6}>徐州</TreeSelect.Option>
        <TreeSelect.Option value={7}>苏州</TreeSelect.Option>
      </TreeSelect.Tab>
      <TreeSelect.Tab title="福建" disabled>
        <TreeSelect.Option value={8}>泉州</TreeSelect.Option>
        <TreeSelect.Option value={9}>厦门</TreeSelect.Option>n
      </TreeSelect.Tab>
    </TreeSelect>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultTabValue | 左侧默认选中项的索引 | _number \| string_ | `0` |
| tabValue | 左侧选中项的索引 | _number \| string_ | `0` |
| defaultValue | 右侧默认选中项的 value，支持传入数组 | _number \| string \|<br>(number \| string)[]_ | `0` |
| value | 右侧选中项的 value，支持传入数组 | _number \| string \|<br>(number \| string)[]_ | `0` |
| max | 右侧项最大选中个数 | _number \| string_ | `Infinity` |
| activeIcon | 自定义右侧栏选中状态的图标 | _ReactNode_ | `<Success />` |

### Events

| 事件名     | 说明                 | 回调参数                  |
| ---------- | -------------------- | ------------------------- |
| onTabChange | 点击左侧导航时触发   | _value: any, tabObject: TreeSelect.TabObject_ |
| onChange | 点击右侧选择项时触发 | _any \| any[]_     |
