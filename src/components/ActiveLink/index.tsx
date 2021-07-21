import React from "react";
import { ReactElement, cloneElement } from "react";
import { Link, LinkProps } from "react-router-dom";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink ({ children, activeClassName,...rest }: ActiveLinkProps) {
  const active = activeClassName === window.location.pathname;

  return (
    <Link {...rest} >
      {cloneElement(children, {
        active
      })}
    </Link>
  )
}
