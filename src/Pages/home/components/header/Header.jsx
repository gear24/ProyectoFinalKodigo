import { useNavigate } from "react-router-dom";

export const Header = () => {
   const navigate = useNavigate();

   const goHome = () => {
      navigate("/");
   };

   const goLogin = () => {
      navigate("/login");
   };
   const goRegister = () => {
      navigate("/register");
   };

   return (
      <header className="header">
         <div className="container">
            <nav>
               <a
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     goHome();
                  }}
               >
                  <label>Início</label>
               </a>

               <a
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     goLogin();
                  }}
               >
                  <label>LOGIN</label>
               </a>

               <a
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     goRegister();
                  }}
               >
                  <label>REGISTER</label>
               </a>
            </nav>
         </div>
      </header>
   );
};
