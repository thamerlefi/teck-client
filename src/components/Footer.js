import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <footer className="text-center text-lg-start  text-muted mt-2">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com/profile.php?id=100008373409490" target="_blank" rel="noreferrer" className="me-4 link-secondary">
              <i className="fab fa-facebook-f"></i>
            </a>
            
            {/* <a href="" className="me-4 link-secondary">
              <i className="fab fa-google"></i>
            </a> */}
            
            <a href="https://www.linkedin.com/in/themer-lefi-a97bb6268/" target="_blank" rel="noreferrer" className="me-4 link-secondary">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/thamerlefi" target="_blank" rel="noreferrer" className="me-4 link-secondary">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase text-white fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-white"></i>
                  Teck-Shop
                </h6>
                <p>
                Seamless Shopping Experience For Tech Enthusiasts
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase text-white fw-bold mb-4">
                  Categories
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    Accessories
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Camera
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laptop
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Phone
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase text-white fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase text-white fw-bold mb-4">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home me-3 text-secondary"></i> Ksar hlel,
                  Monastir, TN
                </p>
                <p>
                  <i className="fas fa-envelope me-3 text-secondary"></i>
                  info@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3 text-secondary"></i> + 216 54
                  498 484
                </p>
                <p>
                  <i className="fas fa-print me-3 text-secondary"></i> + 01 234
                  567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.025)" }}
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="#!">
            Tech-shop.com
          </a>
        </div>
      </footer>
    </div>
  );
}
