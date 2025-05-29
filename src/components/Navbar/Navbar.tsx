import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {FaHome, FaExternalLinkAlt  } from "react-icons/fa";
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation();
  const isHome = location.pathname === '/';

let backgroundClass = styles.homeBackground; // default
  if (isHome) backgroundClass = styles.homeBackground
  else backgroundClass =  styles.allBackground
  
  function goHome() {
    navigate(`/`)
  }
  return (
    <>
    <div className={`${styles.main} ${backgroundClass} `}>
    <p className={styles.logo}>infotravel</p>
    <div className={styles.session}>

          {!isHome ? (<div className={styles.child} onClick={() => goHome()}>
            <FaHome />
            Início
            </div>) : (<></>)}
        
        <div className={styles.child} >
            <FaExternalLinkAlt />
            Iniciar Sessao
        </div>
    </div>
</div>
    </>
  )
}
