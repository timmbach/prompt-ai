"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  // session: {
  //   user: {
  //     name?: string;
  //     email?: string;
  //     image?: string;
  //     // Add any other user properties you expect here
  //   };
  //   accessToken: string;
  //   expires: string;
  //   // Add any other session properties you expect here
  // };
};

function Nav({}: Props) {
  // const isUserLoggedIn = true;
  const { data: sessionData }: any = useSession();

  // console.log(sessionData)

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // presence of providers show that next authentication via google, github, etc is ready
    const newProviders = async () => {
      const response: any = await getProviders();

      setProviders(response);
    };
    newProviders();
  }, []);

  const handleSignIn = async (providerId: any) => {
    await signIn(providerId);
  };
  // const handleSignOut = async () => {
  //   await signOut();
  // };
  return (
    <nav className="flex_between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex_center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={50}
          height={50}
        />
      </Link>
      <p className="logo_text tracking-widest">prompt-ai</p>

      {/* get user form current session */}
      <div className="hidden sm:flex">
        {sessionData?.user ? (
          <div className="flex gap-3 md:gap-5 ">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_button"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={sessionData?.user.image}
                width={37}
                height={37}
                alt="profile img"
                className="rounded-lg"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile nav */}
      <div className="flex sm:hidden relative">
        {sessionData?.user ? (
          <div className="flex">
            <Image
              src={sessionData?.user.image}
              width={37}
              height={37}
              alt="profile img"
              className="rounded-lg"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
