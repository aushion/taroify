import { Fail, Success } from "@taroify/icons"
import { cloneIconElement } from "@taroify/icons/utils"
import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as React from "react"
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react"
import Backdrop from "../backdrop"
import { useTimeoutEffect } from "../hooks"
import Loading from "../loading"
import Popup, { usePopupBackdrop } from "../popup"
import { prefixClassname } from "../styles"
import { matchSelector } from "../utils/dom/element"
import { useObject } from "../utils/state"
import { isElementOf } from "../utils/validate"
import { ToastOptions, useToastClose, useToastOpen } from "./toast.imperative"
import { ToastPosition, ToastType } from "./toast.shared"

const TOAST_PRESET_TYPES = ["text", "loading", "success", "fail", "html"]

const TOAST_PRESET_POSITIONS = ["top", "middle", "bottom"]

function defaultToastIcon(icon?: ReactNode, type?: ToastType): ReactNode {
  if (icon) {
    return icon
  }
  if (type === "success") {
    return <Success />
  }
  if (type === "loading") {
    return <Loading />
  }
  if (type === "fail") {
    return <Fail />
  }
  return undefined
}

function useToastIcon(node?: ReactNode, type?: ToastType) {
  return useMemo(() => {
    const icon = defaultToastIcon(node, type)
    if (!isValidElement(icon)) {
      return icon
    }
    const element = icon as ReactElement
    return cloneElement(icon, {
      className: classNames(prefixClassname("toast__icon"), element.props.className),
    })
  }, [node, type])
}

interface ToastChildren {
  backdrop?: ReactNode
  content?: ReactNode[]
}

function useToastChildren(children?: ReactNode): ToastChildren {
  return useMemo(() => {
    const __children__: ToastChildren = {
      content: [],
    }
    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        if (isElementOf(element, Backdrop)) {
          __children__.backdrop = element
        } else {
          __children__.content?.push(child)
        }
      } else {
        __children__.content?.push(child)
      }
    })
    if (!__children__.backdrop) {
      __children__.backdrop = <Popup.Backdrop open={false} />
    }
    return __children__
  }, [children])
}

export interface ToastProps extends ViewProps {
  className?: string
  style?: CSSProperties
  defaultOpen?: boolean
  open?: boolean
  type?: ToastType
  position?: ToastPosition
  icon?: ReactNode
  duration?: number
  children?: ReactNode

  onClose?(opened: boolean): void
}

export default function Toast(props: ToastProps) {
  const {
    object: {
      id,
      className,
      open = false,
      icon: iconProp,
      type = "text",
      position = "middle",
      duration = 3000,
      children: childrenProp,
      backdrop: backdropOptions,
      onClose,
      ...restProps
    },
    setObject,
  } = useObject<ToastProps & ToastOptions>(props)

  const { backdrop: backdropElement, content } = useToastChildren(childrenProp)
  const backdrop = usePopupBackdrop(backdropElement, backdropOptions)
  const icon = useToastIcon(iconProp, type)

  const { stop: stopAutoClose } = useTimeoutEffect(
    () => {
      if (open) {
        setObject({ open: false })
        onClose?.(false)
      }
    },
    duration,
    [open],
  )

  useToastOpen(({ selector, message, ...restOptions }: ToastOptions) => {
    if (matchSelector(selector, id)) {
      stopAutoClose()
      setObject({
        open: true,
        children: message,
        ...restOptions,
      })
    }
  })

  useToastClose((selector) => {
    if (matchSelector(selector, id)) {
      setObject({
        open: false,
      })
    }
  })

  return (
    <Popup
      open={open}
      id={id}
      className={classNames(
        prefixClassname("toast"),
        {
          [prefixClassname(`toast--${position}`)]: TOAST_PRESET_POSITIONS.includes(position),
          [prefixClassname(`toast--${type}`)]: !icon && TOAST_PRESET_TYPES.includes(type),
        },
        className,
      )}
      {...restProps}
    >
      {backdrop}
      {
        //
        icon &&
          cloneIconElement(icon, {
            className: prefixClassname("toast__icon"),
          })
      }
      {icon ? <View className={prefixClassname("toast__message")} children={content} /> : content}
    </Popup>
  )
}
