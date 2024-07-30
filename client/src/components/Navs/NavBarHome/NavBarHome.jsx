//Dependencias de REACT
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Dependencias de fontAwesome (icono para el carrito de compras)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
//Importacion de componente Cart
import Cart from "../../../views/Cart/Cart";
//Importacion de estilos
import style from "./NavBarHome.module.css";
//Dependencias de GSAP
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//Esta funcion sirve para registrar el plugin "ScrollTrigger" y poder usar sus funciones a traves de gsap()
gsap.registerPlugin( ScrollTrigger);



const NavBarHome = () => {
  const user = localStorage.getItem("userEmail");
  const [modalIsOpen, setModalIsOpen] = useState(false)

  //Nombres con los que voy a manipular los elementos del DOM
  const HomeRef = useRef(null)
  const CocinaRef = useRef(null)
  const NosotrosRef = useRef(null)


  // const AnimacionGSAP = (RefName, x, y ) => {
  // //AnimacionesGSAP recibe 3 paramentros:
  // //primer parametro: Referencia al elemento del DOM que se va a animar
  // //segundo parametro: valo del desplazamiento en el eje x
  // //tercer parametro: valor de desplazamiento en el eje y
  //   gsap.to(RefName.current, {
  //     scrollTrigger: {
  //       trigger: RefName.current,
  //       start: "top 0%",
  //       end: "bottom center",
  //       scrub: true,
  //     },
  //     x: x, 
  //     y: y,
  //   })

  // }

  // useEffect(() => {
      
  //   AnimacionGSAP(HomeRef, -1080, -185);
  //   AnimacionGSAP(CocinaRef, -590, -275);
  //   AnimacionGSAP(NosotrosRef, -85, -365);

  // }, []);

  
  return (
    <nav className={style.navbar}>
      <Cart
        isCartOpen={modalIsOpen}
        setIsCartOpen={() => setModalIsOpen(false)}
      />

      {/* <div className={style.cartBox} onClick={() => setModalIsOpen(true)}>
        <div className={style.cart}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </div> */}

      <Link to="/" className={style.navLink} ref={HomeRef}>
        <div className={style.btn}>HOME</div>
      </Link>

      <Link to="/products" className={style.navLink} ref={CocinaRef}>
        <div className={style.btn}> COCINA </div>
      </Link>

      <Link to="/" className={style.navLink} ref={NosotrosRef}>
        <div className={style.btn}> NOSOTROS </div>
      </Link>

      {user ? (
        <Link to="/profile" className={style.navLink}>
          <div className={style.btn}> PERFIL </div>
        </Link>
      ) : (
        <Link to="/login" className={style.navLink} ref={NosotrosRef}>
          <div className={style.btn}> LOG IN </div>
        </Link>
      )}
    </nav>
  );
};

export default NavBarHome;