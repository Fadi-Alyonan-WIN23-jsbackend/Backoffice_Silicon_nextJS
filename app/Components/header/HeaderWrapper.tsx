import Header from './Header';
import { cookies } from 'next/headers';

export default function HeaderWrapper() {
  const cookieStore = cookies();
  const isSignedIn = !!cookieStore.get('Authorization');
  
  return <Header isSignedIn={isSignedIn} />;
}