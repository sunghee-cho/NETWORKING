import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <h1 className="header__title">
            NET<span>WORKING</span>
          </h1>
        </div>
        <div className="header__wrapper">
          <p className="header__sub-title">Page</p>
          <p className="header__sub-title">Page</p>
          <p className="header__sub-title">Page</p>
          <button className="header__button">Button</button>
        </div>
      </div>
    </header>
  );
}
