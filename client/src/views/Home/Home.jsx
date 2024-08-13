import React from "react";
import style from "./Home.module.css";
import NavBarHome from "../../components/Navs/NavBarHome/NavBarHome";
import NavMovile from "../../components/Navs/NavMovile/NavMovile";
// import ProductsHome from "../../components/ProductsHome/ProductsHome";

function Home() {
  return (
    <div className={style.mainContainer}>
      <NavMovile/>
      <NavBarHome/>
      <div className={style.design}>
        <div className={style.presentacion}>
          <h1>BakeryApp</h1>
          <h2>[baked goods & cookies]</h2>
        </div> 
      </div>
      {/* <ProductsHome/> */}
    </div>
  );
}

export default Home;