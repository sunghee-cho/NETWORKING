import "../styles/Footer.css";
import SocialIcon from "../assets/icons/Social Icons.png";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const hideFooterForPaths = ["/", "/chat", "/joblist", "/notifications"];

  if (hideFooterForPaths.includes(location.pathname)) {
    return <></>;
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <h1 className="footer__title">
            NET<span>WORKING</span>
          </h1>
          <img className="footer__icon" src={SocialIcon} alt="소셜아이콘" />
        </div>
        <div className="footer__wrapper">
          <div className="footer__group">
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
          <div className="footer__group">
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
          <div className="footer__group">
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
        </div>
      </div>
    </footer>
  );
}