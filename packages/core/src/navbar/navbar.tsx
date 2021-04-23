import { cloneIconComponent } from "@taroify/icons"
import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BOTTOM } from "../styles/hairline"
import { findChildren } from "../utils/children"

interface NavbarProps {
  bordered?: boolean
  fixed?: boolean
  title?: string
  children?: ReactNode
}

function Navbar(props: NavbarProps) {
  const { bordered, title, children } = props
  const NavLeftRender = findChildren(children, Navbar.NavLeft)
  const NavRightRender = findChildren(children, Navbar.NavRight)
  return (
    <View
      className={classNames(prefixClassname("navbar"), {
        [HAIRLINE_BOTTOM]: bordered,
      })}
    >
      <View className={classNames(prefixClassname("navbar__content"))}>
        {NavLeftRender}
        <View className={classNames(prefixClassname("navbar__title"))} children={title} />
        {NavRightRender}
      </View>
    </View>
  )
}

namespace Navbar {
  interface NavLeftProps {
    icon?: ReactNode
    text?: ReactNode
    children?: ReactNode
  }

  export function NavLeft(props: NavLeftProps) {
    const { icon, text, children } = props
    // If children is not undefined, return left view
    if (children) {
      return <View className={prefixClassname("navbar__left")} children={children} />
    }
    return (
      <View className={prefixClassname("navbar__left")}>
        {icon && cloneIconComponent(icon, { className: prefixClassname("navbar__icon") })}
        {text && <View className={prefixClassname("navbar__text")} children={text} />}
      </View>
    )
  }

  interface NavRightProps {
    icon?: ReactNode
    text?: ReactNode
    children?: ReactNode
  }

  export function NavRight(props: NavRightProps) {
    const { icon, text, children } = props
    // If children is not undefined, return right view
    if (children) {
      return <View className={prefixClassname("navbar__right")} children={children} />
    }
    return (
      <View className={prefixClassname("navbar__right")}>
        {icon && cloneIconComponent(icon, { className: prefixClassname("navbar__icon") })}
        {text && <View className={prefixClassname("navbar__text")} children={text} />}
      </View>
    )
  }
}

export default Navbar
