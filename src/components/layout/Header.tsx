"use client";

import type {NavbarProps} from "@heroui/react";

import React from "react";
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
} from "@heroui/react";
import {cn} from "@heroui/react";

import {AcmeIcon} from "../icons/AcmeIcon";

const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

// props might not be needed if NavbarProps is removed and {...props} isn't used
export default function Header(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Navbar
      {...props}
      isBordered
      className="shadow-lg w-full"
      classNames={{
        base: cn("border-default-100 w-full z-40 bg-background/80 dark:bg-[#26282c] backdrop-blur-xl", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
        }),
        wrapper: "w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarBrand>
        <div className="rounded-full bg-foreground text-background">
          <AcmeIcon size={34} />
        </div>
        <span className="ml-2 font-medium dark:text-white">ACME</span>
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-[#1e1f1f] md:flex"
        justify="center"
      >
        <NavbarItem>
          <Link className="text-default-500 dark:text-white" href="/" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500 dark:text-white" href="#" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="foreground" href="#" size="sm" className="dark:text-white">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500 dark:text-white" href="#" size="sm">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500 dark:text-white" href="#" size="sm">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {mounted && (
          <NavbarItem className="hidden sm:flex">
            <Button
              isIconOnly
              variant="light"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={handleThemeChange}
              className="dark:text-white"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </NavbarItem>
        )}
        <NavbarItem className="ml-2 !flex gap-2">
          <Button
            className="bg-default-100 text-default-700 dark:bg-default-200 dark:text-white sm:bg-transparent sm:text-default-500 sm:dark:text-white"
            radius="full"
            variant="light"
          >
            Login
          </Button>
          <Button
            className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 dark:text-white sm:flex"
            color="secondary"
            radius="full"
            style={{
              boxShadow: "inset 0 0 4px #bf97ff70",
            }}
            variant="flat"
          >
            Start Free Trial
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: {opacity: 0, y: -20},
          animate: {opacity: 1, y: 0},
          exit: {opacity: 0, y: -20},
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-default-500 dark:text-white" href="#" size="md">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
} 