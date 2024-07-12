"use client";

import { useState, useEffect } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Chip,
} from "@nextui-org/react";

import ConfirmButton from "@/elements/ConfirmButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const { status, data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetch(`/api/unread-count`)
      .then((data) => data.json())
      .then((data) => {
        if (!data) {
          return;
        }
        setUnreadCount(data?.data?.count);
        setLoadingNotifications(false);
      });
  }, [loadingNotifications]);

  return (
    <Navbar
      className="pb-2"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      position="static"
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          rsvp.place
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session && !loadingNotifications ? (
          <>
            <NavbarItem as={Link} href="/notifications">
              <FontAwesomeIcon
                icon={faBell}
                className={unreadCount ? "text-primary" : "text-zinc-400"}
              />
              <Chip
                size="sm"
                className="px-0.5 h-4"
                style={{
                  position: "relative",
                  top: "-8px",
                  left: "-8px",
                  fontSize: "0.5em",
                  zIndex: "-1",
                }}
                color={unreadCount ? "warning" : "default"}
              >
                {unreadCount}
              </Chip>
            </NavbarItem>
            <NavbarItem>
              <NavbarMenuToggle
                // why tf is this necessary?
                className="w-10 h-10"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              />
              {/* XXX why tf is this z-index necessary? */}
              <NavbarMenu className="z-40">
                <div className="mx-4 mt-2 flex flex-col gap-2 max-w-lg place-self-center min-w-[300px]">
                  <NavbarMenuItem>
                    <Link color="foreground" href="/">
                      Home
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={`/user/${session.userId}`}>
                      My profile
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href="/clubs">
                      My clubs
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <ConfirmButton onPress={() => signOut()}>
                      Sign out
                    </ConfirmButton>
                  </NavbarMenuItem>
                </div>
              </NavbarMenu>
            </NavbarItem>
          </>
        ) : (
          <>
            <Skeleton isLoaded={status !== "loading" && !loadingNotifications}>
              <Button
                as={Link}
                color="primary"
                href="#"
                onPress={() => signIn()}
              >
                sign in
              </Button>
            </Skeleton>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
