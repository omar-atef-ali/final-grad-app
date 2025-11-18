import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    // <>
    //   <footer class="mt-auto">
    //     <div class="container">
    //       <div class="row">
    //         <div class="col-md-4 mb-3">
    //           <h5>About Us</h5>
    //           <p>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
    //             ac ante mollis quam tristique convallis.
    //           </p>
    //         </div>
    //         <div class="col-md-4 mb-3">
    //           <h5>Quick Links</h5>
    //           <ul class="list-unstyled">
    //             <li>
    //               <a href="#" class="text-decoration-none text-white">
    //                 Home
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" class="text-decoration-none text-white">
    //                 Services
    //               </a>
    //             </li>
    //             <li>
    //               <a href="#" class="text-decoration-none text-white">
    //                 Contact
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div class="col-md-4 mb-3">
    //           <h5>Follow Us</h5>
    //           <ul class="list-inline social-icons">
    //             <li class="list-inline-item">
    //               <a href="#" class="text-white">
    //                 <i class="bi bi-facebook"></i>
    //               </a>
    //             </li>
    //             <li class="list-inline-item">
    //               <a href="#" class="text-white">
    //                 <i class="bi bi-twitter"></i>
    //               </a>
    //             </li>
    //             <li class="list-inline-item">
    //               <a href="#" class="text-white">
    //                 <i class="bi bi-instagram"></i>
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //       <hr class="mb-4" />
    //       <div class="row">
    //         <div class="col-md-12 text-center">
    //           <p>&copy; 2023 Your Company. All rights reserved.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </footer>
    // </>
    <>

      <footer className={`text-white pt-5 pb-4 w-50 ${style.footerbg}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
              <h6 className="text-uppercase font-weight-bold mb-4">About</h6>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget aliquam tincidunt, nisl nisl
                aliquam nisl, eget aliquam nisl nisl eget aliquam.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold mb-4">Products</h6>
              <p><a href="#" className="text-white">Product 1</a></p>
              <p><a href="#" className="text-white">Product 2</a></p>
              <p><a href="#" className="text-white">Product 3</a></p>
              <p><a href="#" className="text-white">Product 4</a></p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold mb-4">Useful links</h6>
              <p><a href="#" className="text-white">Your Account</a></p>
              <p><a href="#" className="text-white">Become an Affiliate</a></p>
              <p><a href="#" className="text-white">Shipping Rates</a></p>
              <p><a href="#" className="text-white">Help</a></p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold mb-4">Contact</h6>
              <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
              <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2023 Copyright:
          <a href="#" className="text-white"> Your Website</a>
        </div>
      </footer>
    </>
  );
}
