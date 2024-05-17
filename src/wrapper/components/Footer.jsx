export const Footer = ({ footerRef }) => {
  return (
    <>
      <div className="container" ref={footerRef}>
        <div className="row">
          <div className="col-12 col-xxl-10 offset-xxl-1">
            <footer className="py-3 my-3 my-xl-4">
              <ul
                className={
                  "nav justify-content-center border-bottom border-opacity-50 pb-3 mb-3 eastern-links"
                }
              >
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      href="https://equity.eku.edu/equal-opportunityaffirmative-action-statement"
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      EO/AA Statement
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      href="https://adaccess.eku.edu/accessibility-and-disability-compliance"
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Accessibility
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      href="https://www.eku.edu/eku-privacy-statement/"
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Privacy Statement
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      href="https://form.asana.com/?k=I67xQySiqf7J19FAstuZ_A&d=28839040002083"
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Website Feedback
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      href="https://www.google.com/maps/dir//Eastern+Kentucky+University,+Lancaster+Ave,+Richmond,+KY/@37.7353841,-84.3336913,13z"
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      521 Lancaster Ave. Richmond, KY 40475
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link px-2">
                    <a
                      className={"footer-link"}
                      rel="noopener noreferrer"
                      href="tel:8596221000"
                      target="_blank"
                    >
                      859-622-1000
                    </a>
                  </div>
                </li>
              </ul>
              <p className={"text-center text-opacity-75 eastern-copyright"}>
                © 2023 Eastern Kentucky University. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
