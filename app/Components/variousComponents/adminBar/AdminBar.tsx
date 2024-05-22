import style from './AdminBar.module.css';

export default function AdminBar() {
  return (
    <aside className={`asideBox ${style.asideBox}`}>
        <h1></h1>
        <div className={`navBar ${style.navBar}`}>
            <a className={`btnNavbar ${style.btnNavbar}`} href="/adminCourses">Courses</a>
            <a className={`btnNavbar ${style.btnNavbar}`} href="/adminUsers">Users</a>
            <a className={`btnNavbar ${style.btnNavbar}`} href="/adminSubscribers">Subscribers</a>
            <a className={`btnNavbar ${style.btnNavbar}`} href="/adminCustomers">Customers</a>
        </div>
    </aside>
  );
}
