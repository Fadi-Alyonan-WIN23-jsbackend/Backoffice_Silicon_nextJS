import Link from 'next/link';
import style from './AdminBar.module.css';

export default function AdminBar() {
  return (
    <nav className={`navHeader ${style.navHeader}`}>
      <h1>Administration bar</h1>
      <Link href='/admincourses/'>Courses</Link>
      <Link href='/adminusers/'>Users</Link>
      <Link href='/admincustomers/'>Customers</Link>
    </nav>
  );
}
