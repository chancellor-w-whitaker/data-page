export function Header({ colorPicker, department, searchBar }) {
  return (
    <nav
      className="eastern-header navbar navbar-expand-lg navbar-dark bg-gradient"
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            href="https://www.eku.edu/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 80.619217"
              className="eku-svg"
              height="37.5"
              width="117.5"
              fill="white"
            >
              <g transform="matrix(1.25 0 0 -1.25 -257.85 535.8)">
                <path
                  d="m305.45 410.51 17.251 11.077c5.1089 3.6073 5.0256 6.2017 5.0256 6.2017l17.419 0.10888-11.418-8.3236-15.242-11.181 7.2368-26.269-0.51185 0.003c-2.3042 0.0174-5.3333-0.0272-8.1874-0.067-2.1077-0.0294-4.1147-0.0615-5.6659-0.074l-1.6373 0.008-6.7707 23.282-10.385-23.216-16.947-0.20744 0.66971 0.67025c0.70185 0.70293 1.2676 1.4974 1.6721 2.3968l17.443 38.771c0.67571 1.4935 0.7503 2.717 0.44648 3.7052l-0.15301 0.49604 16.913-0.0256-7.1578-17.356zm-93.737-36.422 175.02-0.44157-179.52-8.5648 4.4958 9.0064zm50.176 8.4417h-47.572c0.65611 0.65177 1.1864 1.3792 1.5883 2.2052l18.94 39.016c0.6376 1.3144 0.85049 2.5705 0.64686 3.6976l48.084 0.0996-4.5258-9.9652c-2.9506 1.6885-8.4886 3.3824-13.865 3.3824l-13.18-0.16935-5.5799-11.484 15.045-0.16991-4.0581-7.2646h-14.539l-5.5761-11.649 16.904 0.165c6.4222-0.165 13.757 2.0652 14.2 2.1981l-6.53-10.07zm126.51 6.0433c-1.1314-2.5128-3.7858-4.5002-8.6383-5.7901-4.2285-1.0786-10.468-1.6754-19.217-1.7963-8.6546-0.0642-14.458 0.44648-17.436 1.3427-3.4346 0.99859-3.8806 2.2422-2.8422 4.5318l17.191 37.989c0.49548 1.0998 0.57224 2.099 0.29781 2.9892 0 0 17.256 0.25593 17.629 0.0686 0.0741-0.22595-15.687-34.559-15.687-34.559-0.91475-2.0162-0.33815-3.4902 1.0389-4.406 1.2637-0.83577 3.1085-1.1293 4.6243-1.1559 3.3998 0 6.505 1.0198 7.796 3.8686l15.34 36.005 17.126 0.055-17.223-39.143"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </a>
        </div>
        <div className="navbar-brand text-wrap">
          <div>
            <a
              className="text-uppercase fs-6 eastern-brand-link"
              href="https://www.eku.edu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Eastern Kentucky University
            </a>
          </div>
          <div>
            <a
              className="fs-4 eastern-brand-link"
              href="https://ir.eku.edu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {department}
            </a>
          </div>
        </div>
        <button
          className="navbar-toggler navbar-toggler-shadow"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-label="Toggle navigation"
          data-bs-toggle="collapse"
          aria-expanded="false"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample07">
          <div className="navbar-nav my-2 my-lg-0 gap-lg-3 ms-auto">
            {/* <div className="nav-link py-0 py-lg-2 px-lg-0">
              <div className="py-2 py-lg-0">{colorPicker}</div>
            </div>
            <div className="nav-link py-0 py-lg-2 px-lg-0 text-nowrap">
              <a
                href="https://tools.eku.edu/siteindex/a"
                className="eastern-nav-link fs-5"
                rel="noopener noreferrer"
                target="_blank"
              >
                A-Z Index
              </a>
            </div> */}
          </div>
          {searchBar}
        </div>
      </div>
    </nav>
  );
}
