"use client"
import { useRouter } from 'next/navigation';
import style from './Header.module.css';

type HeaderProps = {
  isSignedIn: boolean;
};
export default function Header({ isSignedIn }: HeaderProps) {
  const router = useRouter();
  const handleSignOut = () => {
    document.cookie = 'Authorization=; Max-Age=0; path=/; secure; sameSite=strict';
    router.push('/auth/signIn');
  };

  return (
    <div className={`header ${style.header}`}>
        <a href="/"><img src="/images/silicon-logo-w-text.svg" alt="Silicon" /></a>
        {isSignedIn ? <a className="btn btn-danger" onClick={handleSignOut}><i className="fa-regular fa-right-to-bracket"></i>Sign Out</a> : <></>}
    </div>
  );
}
