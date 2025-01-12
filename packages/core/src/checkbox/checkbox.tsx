import { Success } from "@taroify/icons"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import { ReactNode, useContext, useMemo } from "react"
import { prefixClassname } from "../styles"
import { addUnitPx } from "../utils/format/unit"
import { useValue } from "../utils/state"
import CheckboxGroupContext from "./checkbox-group.context"
import { CheckboxShape } from "./checkbox.shared"

export interface CheckboxProps extends ViewProps {
  name?: any
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  shape?: CheckboxShape
  icon?: ReactNode
  size?: number
  children?: ReactNode

  onChange?(checked: boolean): void
}

export default function Checkbox(props: CheckboxProps) {
  const {
    className,
    name,
    defaultChecked,
    checked: checkedProp,
    disabled,
    shape = "round",
    icon = <Success />,
    size,
    children,
    onChange: onChangeProp,
    ...restProps
  } = props

  const { value, setValue } = useValue({
    value: checkedProp,
    defaultValue: defaultChecked,
    onChange: onChangeProp,
  })

  const { value: names = [], max: namesMax = 0, onChange: onNamesChange } = useContext(
    CheckboxGroupContext,
  )

  const checked = useMemo(() => value || (name && names?.includes(name)), [value, name, names])

  function onClick() {
    if (disabled) {
      return
    }

    setValue(!checked)

    if (name) {
      if (names?.includes(name)) {
        onNamesChange?.(names.filter((aName) => aName !== name))
      } else if (namesMax === 0 || names.length < namesMax) {
        onNamesChange?.([...names, name])
      }
    }
  }

  return (
    <View
      className={classNames(prefixClassname("checkbox"), className)}
      onClick={onClick}
      {...restProps}
    >
      <View
        className={classNames(
          prefixClassname("checkbox__icon"),
          prefixClassname(`checkbox__icon--${shape}`),
          {
            [prefixClassname("checkbox__icon--disabled")]: disabled,
            [prefixClassname("checkbox__icon--checked")]: checked,
          },
        )}
        style={{ fontSize: size ? addUnitPx(size) : "" }}
        children={icon}
      />
      {children && (
        <View
          className={classNames(prefixClassname("checkbox__label"), {
            [prefixClassname("checkbox__label--disabled")]: disabled,
          })}
          children={children}
        />
      )}
    </View>
  )
}
