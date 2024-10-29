import { useNavigate } from "react-router-dom";

export const Header = () => {
   const navigate = useNavigate();

   const goHome = () => navigate("/");
   const goLogin = () => navigate("/login");
   const goRegister = () => navigate("/register");

   return (
      <header className="header">
         <div className="container">
            <nav>
               <div className="nav-links">
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        goHome();
                     }}
                  >
                     HOME
                  </a>
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        goLogin();
                     }}
                  >
                     LOGIN
                  </a>
                  <a
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        goRegister();
                     }}
                     className="register-btn"
                  >
                     REGISTER
                  </a>
               </div>
            </nav>
         </div>
      </header>
   );
};
