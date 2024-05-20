import style from './AdminBar.module.css';

export default function AdminBar() {
  return (
    <aside className={`asideHeader ${style.asideHeader}`}>
        <h1>Silicon Administrator</h1>
        <div className={`navBar ${style.navBar}`}>
            <a href="/adminCourses">Courses</a>
            <a href="/adminUsers">Users</a>
            <a href="/adminCustomers">Customers</a>
        </div>
    </aside>
  );
}
