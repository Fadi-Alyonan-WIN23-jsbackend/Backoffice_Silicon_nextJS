import style from './AdminBar.module.css';

export default function AdminBar() {
  return (
    <>
        <nav className={`navHeader ${style.navHeader}`}>
        <h1>Administration bar</h1>
        <a href="/adminCourses">Courses</a>
        <a href="/adminUsers">Users</a>
        <a href="/adminCustomers">Customers</a>
        </nav>
    </>
    
  );
}
