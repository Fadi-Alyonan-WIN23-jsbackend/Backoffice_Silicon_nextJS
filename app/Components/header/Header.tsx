import AdminBar from '../variousComponents/adminBar/AdminBar';
import style from './Header.module.css';

export default function Header() {
  return (
    <div className={`header ${style.header}`}>
      <AdminBar />
    </div>
  );
}
