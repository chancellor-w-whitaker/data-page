import { useRef, useId, memo } from "react";

import { ColorPicker } from "./ColorPicker";
import { SearchBar } from "./SearchBar";
import { Header } from "./Header";
import { Center } from "./Center";
import { Footer } from "./Footer";
import "../../style.css";

const App = memo(
  ({
    department = "Institutional Effectiveness & Research",
    heading = "Data Pages",
    children,
  }) => {
    const footerRef = useRef();

    return (
      <>
        <Header
          colorPicker={<ColorPicker footerRef={footerRef} />}
          searchBar={<SearchBar />}
          department={department}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="sidebar border border-right col-md-4 col-lg-3 p-0 bg-white dash-shadow">
              <ExampleSidebar></ExampleSidebar>
            </div>
            <div
              className="col-md-8 ms-sm-auto col-lg-9 px-md-4 py-md-4 bg-white border border-start-0 dash-shadow"
              style={{ paddingBottom: 12, paddingTop: 12 }}
            >
              <Center children={children} heading={heading} />
            </div>
          </div>
        </div>
        <Footer footerRef={footerRef} />
      </>
    );
  }
);

export default App;

const sidebarItems = [
  {
    items: [
      { label: "EKU Data Page" },
      {
        href: "https://ir.eku.edu/university-survey-results",
        label: "University Survey Results",
      },
      {
        href: "https://ir.eku.edu/qualtrics",
        label: "Qualtrics Survey Software",
      },
      {
        href: "https://ir.eku.edu/eku-course-evaluations",
        label: "Course Evaluations",
      },
      {
        label: "Data Request Form",
      },
      {
        href: "https://strategicplanning.eku.edu/eku-strategic-plan",
        label: "EKU Strategic Plan",
      },
      {
        href: "https://oie.eku.edu/eku-program-review",
        label: "Program Review",
      },
      {
        href: "https://gened.eku.edu/general-education-assessment#_ga=2.72741779.189407330.1680544482-1686285476.1673295261",
        label: "General Education Assessment",
      },
    ],
    header: "Institutional Effectiveness & Research",
    expanded: true,
  },
  {
    items: [
      {
        href: "https://reports.ky.gov/t/CPE/views/KentuckyPostsecondaryEducationInteractiveDataDashboard/Navigation?%3AshowAppBanner=false&%3Adisplay_count=n&%3AshowVizHome=n&%3Aorigin=viz_share_link&%3AisGuestRedirectFromVizportal=y&%3Aembed=y",
        label: "Interactive Data Center",
      },
      {
        href: "https://cpe.ky.gov/ourwork/strategicagenda.html",
        label: "CPE Strategic Agenda",
      },
      { href: "https://kystats.ky.gov/Latest/PSFR", label: "Feedback Report" },
      {
        href: "https://kystats.ky.gov/Reports/Tableau/2021_MSPSR",
        label: "Graduate Outcomes by Credential",
      },
    ],
    header: "KY Council on Postsecondary Education",
  },
];

const ExampleSidebar = () => {
  const sidebarID = useId();

  return (
    <div className="flex-shrink-0 p-3">
      <a
        className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
        href="https://ir.eku.edu/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 250 80.619217"
          className="bi pe-none me-2"
          width={74.42394286712063}
          height={24}
        >
          <g transform="matrix(1.25 0 0 -1.25 -257.85 535.8)">
            <path
              d="m305.45 410.51 17.251 11.077c5.1089 3.6073 5.0256 6.2017 5.0256 6.2017l17.419 0.10888-11.418-8.3236-15.242-11.181 7.2368-26.269-0.51185 0.003c-2.3042 0.0174-5.3333-0.0272-8.1874-0.067-2.1077-0.0294-4.1147-0.0615-5.6659-0.074l-1.6373 0.008-6.7707 23.282-10.385-23.216-16.947-0.20744 0.66971 0.67025c0.70185 0.70293 1.2676 1.4974 1.6721 2.3968l17.443 38.771c0.67571 1.4935 0.7503 2.717 0.44648 3.7052l-0.15301 0.49604 16.913-0.0256-7.1578-17.356zm-93.737-36.422 175.02-0.44157-179.52-8.5648 4.4958 9.0064zm50.176 8.4417h-47.572c0.65611 0.65177 1.1864 1.3792 1.5883 2.2052l18.94 39.016c0.6376 1.3144 0.85049 2.5705 0.64686 3.6976l48.084 0.0996-4.5258-9.9652c-2.9506 1.6885-8.4886 3.3824-13.865 3.3824l-13.18-0.16935-5.5799-11.484 15.045-0.16991-4.0581-7.2646h-14.539l-5.5761-11.649 16.904 0.165c6.4222-0.165 13.757 2.0652 14.2 2.1981l-6.53-10.07zm126.51 6.0433c-1.1314-2.5128-3.7858-4.5002-8.6383-5.7901-4.2285-1.0786-10.468-1.6754-19.217-1.7963-8.6546-0.0642-14.458 0.44648-17.436 1.3427-3.4346 0.99859-3.8806 2.2422-2.8422 4.5318l17.191 37.989c0.49548 1.0998 0.57224 2.099 0.29781 2.9892 0 0 17.256 0.25593 17.629 0.0686 0.0741-0.22595-15.687-34.559-15.687-34.559-0.91475-2.0162-0.33815-3.4902 1.0389-4.406 1.2637-0.83577 3.1085-1.1293 4.6243-1.1559 3.3998 0 6.505 1.0198 7.796 3.8686l15.34 36.005 17.126 0.055-17.223-39.143"
              fillRule="evenodd"
              fill="#611f34"
            />
          </g>
        </svg>
        <span className="fs-5 fw-semibold">IE&R Menu</span>
      </a>
      <ul className="list-unstyled ps-0">
        {sidebarItems.map(({ expanded, header, items }, index) => (
          <li className="mb-1" key={index}>
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-target={`#${sidebarID + index}-collapse`}
              aria-expanded={expanded ? true : false}
              data-bs-toggle="collapse"
            >
              {header}
            </button>
            <div
              className={`collapse ${expanded ? "show" : ""}`.trim()}
              id={`${sidebarID + index}-collapse`}
            >
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                {items.map(({ label, href }, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      href={href}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li className="border-top my-3" />
      </ul>
    </div>
  );
};
