"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface NavProps {
  onNavigate: (page: string) => void;
}

const Nav: React.FC<NavProps> = ({ onNavigate }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3 z-50'>
      <button onClick={() => onNavigate('start')} className='flex gap-2 flex-center'>
        <p className='logo_text'>Taletwist</p>
      </button>
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <button onClick={() => onNavigate('create-category')} className='white_round_btn'>
              + Category
            </button>
            <button onClick={() => onNavigate('create-quiz')} className='white_round_btn'>
              Create Quiz
            </button>
            <button type='button' onClick={handleSignOut} className='black_round_btn'>
              Sign Out
            </button>
            <button onClick={() => onNavigate('profile')}>
              <img
                src={session.user.image as string}
                width={37}
                height={37}
                className='rounded-full mr-5'
                alt='profile'
              />
            </button>
          </div>
        ) : (
          providers && Object.values(providers).map((provider: ClientSafeProvider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='white_round_btn'
            >
              Sign in
            </button>
          ))
        )}
      </div>
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <img
              src={session.user.image as string}
              width={37}
              height={37}
              className='rounded-full mr-3'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <button onClick={() => { setToggleDropdown(false); onNavigate('profile-page'); }} className='dropdown_link'>
                  My Profile
                </button>
                <button onClick={() => { setToggleDropdown(false); onNavigate('create-prompt'); }} className='dropdown_link'>
                  Create Prompt
                </button>
                <button onClick={() => { setToggleDropdown(false); onNavigate('create-category'); }} className='dropdown_link'>
                  + Category
                </button>
                <button
                  type='button'
                  onClick={() => { setToggleDropdown(false); handleSignOut(); }}
                  className='w-full black_round_mobile_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers && Object.values(providers).map((provider: ClientSafeProvider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='white_round_btn'
            >
              Sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
