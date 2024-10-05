"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react"; // For dropdowns
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // For mobile menu icons
import avatar from '@/public/users-avatar.png'
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 h-fit max-w-[100rem] mx-auto px-4 py-4 sm:px-6 lg:px-8 w-full  ">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex z-40 font-semibold">
            <img
              src="/logo.png"
              className="w-32 sm:w-40"
              alt="HealthPlatform Logo"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isOpen ? (
              <XMarkIcon className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Right Section (Visible on larger screens) */}
        <div className="hidden sm:flex items-center  space-x-2 sm:space-x-4">
          <Link href="/facilityhome">
            <span className="font-bold pr-6 text-[#067c73] hover:text-blue-700 cursor-pointer">
              FOR LABS & HEALTHCARE PROVIDERS
            </span>
          </Link>
          <Link href="/pricing">
            <button className="text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
              {session ? "Upgrade Now" : "Pricing"}
            </button>
          </Link>
          <Link href="/faqs">
            <button className="text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
              FAQ&apos;s
            </button>
          </Link>
          {session ? (
            <>
              <Link href={session.user.role === 'FACILITY' ? '/facility/dashboard' : "/dashboard"}>
                <button className="text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                  Dashboard
                </button>
              </Link>

              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <button className="text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                    Admin
                  </button>
                </Link>
              )}

              <Menu as="div" className="relative inline-block text-left">
                <div className="rounded-full flex items-center  justify-center">
                  <Menu.Button className="w-8 h-8 rounded-full">
                    <Image
                      src={avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            <Link href="/login">
              <button className="text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu (Only visible when isOpen is true) */}
      {isOpen && (
        <div className="sm:hidden mt-4  space-y-2">
          <Link href="/facilityhome">
            <span className="block font-bold mb-4 text-[#067c73] hover:text-blue-700 cursor-pointer">
              FOR LABS & HEALTHCARE PROVIDERS
            </span>
          </Link>
          <Link href="/pricing">
            <button className="w-full text-white mb-4 bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
              {session ? "Upgrade Now" : "Pricing"}
            </button>
          </Link>
          <Link href="/faqs">
            <button className="w-full text-white mb-4 bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
              FAQ&apos;s
            </button>
          </Link>
          {session ? (
            <>
              <Link href={session.user.role === 'FACILITY' ? '/facility/dashboard' : "/dashboard"}>
                <button className="w-full text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                  Dashboard
                </button>
              </Link>

              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <button className="w-full text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                    Admin
                  </button>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-left text-sm px-4 py-2 text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="w-full text-white bg-black border border-black text-sm px-4 py-2 font-semibold rounded-lg hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
