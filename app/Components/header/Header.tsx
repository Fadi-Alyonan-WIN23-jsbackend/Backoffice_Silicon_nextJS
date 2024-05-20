import style from './Header.module.css';


export default function Header() {
  return (
    <div className={`header ${style.header}`}>
        <a href="/"><img src="/images/silicon-logo-w-text.svg" alt="Silicon" /></a>
    </div>
  );
}
