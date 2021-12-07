import { View } from "@tarojs/components"
import { ViewProps } from "@tarojs/components/types/View"
import classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { Children, forwardRef, isValidElement, ReactElement, ReactNode, useMemo } from "react"
import { EnterHandler, ExitHandler } from "react-transition-group/Transition"
import Backdrop from "../backdrop"
import { prefixClassname } from "../styles"
import Transition, { TransitionName } from "../transition"
import { isElementOf } from "../utils/validate"
import PopupBackdrop from "./popup-backdrop"
import PopupClose from "./popup-close"
import PopupContext from "./popup.context"
import { PopupPlacement } from "./popup.shared"

function toTransactionName(placement?: PopupPlacement) {
  if (placement === "top") {
    return TransitionName.SlideDown
  }

  if (placement === "bottom") {
    return TransitionName.SlideUp
  }

  if (placement === "right") {
    return TransitionName.SlideRight
  }

  if (placement === "left") {
    return TransitionName.SlideLeft
  }

  return TransitionName.Fade
}

interface PopupChildren {
  backdrop?: ReactNode
  close?: ReactNode
  content: ReactNode[]
}

function usePopupChildren(children?: ReactNode): PopupChildren {
  return useMemo(() => {
    const __children__: PopupChildren = {
      backdrop: undefined,
      close: undefined,
      content: [],
    }

    Children.forEach(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        const element = child as ReactElement
        if (isElementOf(element, Backdrop)) {
          __children__.backdrop = element
        } else if (element.type === PopupClose) {
          __children__.close = element
        } else {
          __children__.content.push(child)
        }
      } else {
        __children__.content.push(child)
      }
    })
    return __children__
  }, [children])
}

export interface PopupProps extends ViewProps {
  open?: boolean
  transaction?: string
  placement?: PopupPlacement
  rounded?: boolean
  duration?: number | { appear?: number; enter?: number; exit?: number }
  children?: ReactNode

  mountOnEnter?: boolean

  onOpen?(opened: boolean): void

  onClose?(opened: boolean): void

  onTransitionEntered?: EnterHandler<HTMLElement>
  onTransitionExited?: ExitHandler<HTMLElement>
}

const Popup = forwardRef<any, PopupProps>((props, ref) => {
  const {
    className,
    open,
    transaction,
    placement,
    rounded = false,
    duration,
    children,
    mountOnEnter = true,
    onOpen,
    onClose,
    onTransitionEntered,
    onTransitionExited,
    ...restProps
  } = props

  const transactionName = transaction ?? toTransactionName(placement)
  const { backdrop = <PopupBackdrop />, close, content } = usePopupChildren(children)

  return (
    <PopupContext.Provider
      value={{
        open,
        placement,
        onClose,
      }}
    >
      {backdrop}
      <Transition
        in={open}
        appear
        mountOnEnter={mountOnEnter}
        name={transactionName}
        duration={duration}
        onEnter={() => onOpen?.(true)}
        onEntered={onTransitionEntered}
        onExited={onTransitionExited}
      >
        <View
          ref={ref}
          className={classNames(
            prefixClassname("popup"),
            {
              [prefixClassname("popup--rounded")]: rounded,
              [prefixClassname("popup--center")]: _.isUndefined(placement),
              [prefixClassname("popup--top")]: placement === "top",
              [prefixClassname("popup--right")]: placement === "right",
              [prefixClassname("popup--bottom")]: placement === "bottom",
              [prefixClassname("popup--left")]: placement === "left",
            },
            className,
          )}
          {...restProps}
        >
          {close}
          {content}
        </View>
      </Transition>
    </PopupContext.Provider>
  )
})

export default Popup
