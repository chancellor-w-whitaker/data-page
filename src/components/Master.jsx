import { useCallback, useState } from "react";

import { useEventListener } from "../hooks/useEventListener";
import { Button } from "../wrapper/components/Button";
import { ImagesMasonry } from "./ImagesMasonry";

const sections = [
  {
    items: [
      {
        title: "EKU Data Page",
      },
      {
        link: "https://ir.eku.edu/university-survey-results",
        title: "University Survey Results",
      },
      {
        link: "https://ir.eku.edu/qualtrics",
        title: "Qualtrics Survey Software",
      },
      {
        link: "https://ir.eku.edu/eku-course-evaluations",
        title: "Course Evaluations",
      },
      {
        title: "Data Request Form",
      },
      {
        link: "https://strategicplanning.eku.edu/eku-strategic-plan",
        title: "EKU Strategic Plan",
      },
      {
        link: "https://oie.eku.edu/eku-program-review",
        title: "Program Review",
      },
      {
        link: "https://gened.eku.edu/general-education-assessment#_ga=2.72741779.189407330.1680544482-1686285476.1673295261",
        title: "General Education Assessment",
      },
    ],
    title: "Institutional Effectiveness & Research",
  },
  // {
  //   title: "Institutional Effectiveness",
  //   items: [
  //     {
  //       title: "EKU Strategic Plan",
  //       link: "https://strategicplanning.eku.edu/eku-strategic-plan",
  //     },
  //     {
  //       title: "Program Review",
  //       link: "https://oie.eku.edu/eku-program-review",
  //     },
  //     {
  //       title: "Assurance of Learning Day",
  //       link: "https://oie.eku.edu/assurance-learning-day",
  //     },
  //     {
  //       title: "Student Learning Assessment",
  //       link: "https://oie.eku.edu/assessment-student-learning",
  //     },
  //     {
  //       title: "General Education Assessment",
  //       link: "https://gened.eku.edu/general-education-assessment#_ga=2.72741779.189407330.1680544482-1686285476.1673295261",
  //     },
  //     {
  //       title: "Quality Enhancement Plan",
  //       link: "https://qep.eku.edu/",
  //     },
  //     {
  //       title: "Timeline of Assessment Reports",
  //       link: "https://oie.eku.edu/timeline-assessment-reports",
  //     },
  //     {
  //       title: "APAC Committee",
  //       link: "https://oie.eku.edu/academic-planning-and-assessment-committee",
  //     },
  //     {
  //       title: "Nuventive TracDat",
  //       link: "https://oie.eku.edu/tracdat",
  //     },
  //   ],
  // },
  {
    items: [
      {
        link: "https://reports.ky.gov/t/CPE/views/KentuckyPostsecondaryEducationInteractiveDataDashboard/Navigation?%3AshowAppBanner=false&%3Adisplay_count=n&%3AshowVizHome=n&%3Aorigin=viz_share_link&%3AisGuestRedirectFromVizportal=y&%3Aembed=y",
        title: "Interactive Data Center",
      },
      {
        link: "https://cpe.ky.gov/ourwork/strategicagenda.html",
        title: "CPE Strategic Agenda",
      },
      {
        link: "https://kystats.ky.gov/Latest/PSFR",
        title: "Feedback Report",
      },
      {
        link: "https://kystats.ky.gov/Reports/Tableau/2021_MSPSR",
        title: "Graduate Outcomes by Credential",
      },
    ],
    title: "KY Council on Postsecondary Education",
  },
];

export const Master = () => {
  return (
    <>
      <ImagesMasonry />
      {/* <div className="position-fixed top-50 start-0 transform-align-center">
        <OffcanvasButton className="btn btn-primary ms-3">
          Outside Offcanvas
        </OffcanvasButton>
      </div> */}
      {/* <Offcanvas /> */}
    </>
  );
};

const FilterBar = ({ setQuery, query }) => {
  return (
    <input
      onChange={(e) => setQuery(e.target.value)}
      className="form-control body-search fs-5"
      placeholder="Filter"
      aria-label="Search"
      value={query}
      type="search"
    ></input>
  );
};

const Offcanvas = () => {
  const [direction, setDirection] = useState(true);
  const changeDirection = useCallback(
    () => setDirection((condition) => !condition),
    []
  );

  useEventListener("shown.bs.offcanvas", changeDirection);
  useEventListener("hidden.bs.offcanvas", changeDirection);

  return (
    <div
      className="offcanvas offcanvas-start bg-gradient"
      aria-labelledby="offcanvasExampleLabel"
      id="offcanvasExample"
      tabIndex="-1"
    >
      <div className="position-relative d-flex flex-column h-100">
        <div className="position-absolute end-0 top-50 transform-align-center-justify-end visible">
          <OffcanvasButton direction={direction}>
            {/* <div className={"flip-card" + (direction ? " flip" : "")}>
              <div className="flip-card-inner">
                <div className="flip-card-front d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-angles-left fa-lg"></i>
                </div>
                <div className="flip-card-back d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-angles-right fa-lg"></i>
                </div>
              </div>
            </div> */}
          </OffcanvasButton>
        </div>
        <div className="offcanvas-header">
          <a
            className="d-flex align-items-center link-body-emphasis text-decoration-none"
            href="https://ir.eku.edu/"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 80.619217"
              className="bi pe-none me-2"
              width="74.424"
              height="24"
            >
              <g transform="matrix(1.25 0 0 -1.25 -257.85 535.8)">
                <path
                  d="m305.45 410.51 17.251 11.077c5.1089 3.6073 5.0256 6.2017 5.0256 6.2017l17.419 0.10888-11.418-8.3236-15.242-11.181 7.2368-26.269-0.51185 0.003c-2.3042 0.0174-5.3333-0.0272-8.1874-0.067-2.1077-0.0294-4.1147-0.0615-5.6659-0.074l-1.6373 0.008-6.7707 23.282-10.385-23.216-16.947-0.20744 0.66971 0.67025c0.70185 0.70293 1.2676 1.4974 1.6721 2.3968l17.443 38.771c0.67571 1.4935 0.7503 2.717 0.44648 3.7052l-0.15301 0.49604 16.913-0.0256-7.1578-17.356zm-93.737-36.422 175.02-0.44157-179.52-8.5648 4.4958 9.0064zm50.176 8.4417h-47.572c0.65611 0.65177 1.1864 1.3792 1.5883 2.2052l18.94 39.016c0.6376 1.3144 0.85049 2.5705 0.64686 3.6976l48.084 0.0996-4.5258-9.9652c-2.9506 1.6885-8.4886 3.3824-13.865 3.3824l-13.18-0.16935-5.5799-11.484 15.045-0.16991-4.0581-7.2646h-14.539l-5.5761-11.649 16.904 0.165c6.4222-0.165 13.757 2.0652 14.2 2.1981l-6.53-10.07zm126.51 6.0433c-1.1314-2.5128-3.7858-4.5002-8.6383-5.7901-4.2285-1.0786-10.468-1.6754-19.217-1.7963-8.6546-0.0642-14.458 0.44648-17.436 1.3427-3.4346 0.99859-3.8806 2.2422-2.8422 4.5318l17.191 37.989c0.49548 1.0998 0.57224 2.099 0.29781 2.9892 0 0 17.256 0.25593 17.629 0.0686 0.0741-0.22595-15.687-34.559-15.687-34.559-0.91475-2.0162-0.33815-3.4902 1.0389-4.406 1.2637-0.83577 3.1085-1.1293 4.6243-1.1559 3.3998 0 6.505 1.0198 7.796 3.8686l15.34 36.005 17.126 0.055-17.223-39.143"
                  fillRule="evenodd"
                  fill="#611f34"
                />
              </g>
            </svg>
            <span
              className="fs-5 fw-semibold offcanvas-title"
              id="offcanvasExampleLabel"
            >
              IE&R Menu
            </span>
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 250 41.5"
            className="bi pe-none me-3"
            width="144.578"
            height="24"
          >
            <path
              fill="#611f34"
              d="M39.6,5.4c-0.5-0.3-1.1-0.6-1.7-0.8C37.3,4.4,36.6,4.2,36,4c-0.7-0.2-1.3-0.3-2-0.3  c-0.7-0.1-1.3-0.1-1.9-0.1c-1.3,0-2.5,0-3.7,0c-1.2,0-2.5,0-3.7,0.1l-3.1,6.1l8.4,0.1l-2.3,3.9h-8.1l-3.1,6.1l9.4-0.1  c1.3,0,2.7-0.1,4-0.3c1.3-0.2,2.6-0.5,3.9-0.8L30.1,24H3.6c0.4-0.4,0.7-0.7,0.9-1.2L15,2.1c0.1-0.3,0.2-0.6,0.2-1c0-0.4,0-0.7,0-1  h27.1L39.6,5.4z M60.5,14.6l-8,0.1L59.8,8L60.5,14.6z M72.7,24L68.7,0.1c-1.9,0-3.7,0-5.6,0.1c-1.8,0-3.7,0-5.6,0.1  c0.1,0.1,0.1,0.2,0.1,0.3c0,0.3-0.2,0.8-0.7,1.4c-0.5,0.6-1.1,1.3-1.7,1.9c-0.7,0.7-1.3,1.3-1.9,1.9c-0.6,0.6-1.1,1-1.4,1.3  c-3,2.9-6,5.7-9,8.5c-3,2.8-6.1,5.6-9.1,8.4h9l5.9-5.7l12.1,0.1l0.8,5.6H72.7z M110.6,0.7c-1.2-0.1-2.5-0.3-3.7-0.4  c-1.2-0.1-2.5-0.2-3.7-0.2h-7.3c-0.5,0-1.1,0-1.8,0.1c-0.7,0-1.4,0.1-2.1,0.2c-0.7,0.1-1.5,0.2-2.2,0.4c-0.7,0.2-1.4,0.4-2.1,0.6  c-0.7,0.2-1.2,0.5-1.8,0.9c-0.5,0.4-0.9,0.8-1.2,1.2l-1.4,2.3c-0.3,0.6-0.7,1.1-1,1.7c-0.3,0.6-0.5,1.2-0.5,1.9s0.2,1.2,0.6,1.5  c0.4,0.3,0.9,0.6,1.5,0.7c1,0.3,2,0.6,3,0.8c1,0.2,2,0.5,3,0.8c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.6,0.3,0.9,0.4  c0.3,0.2,0.5,0.4,0.7,0.6c0.2,0.2,0.3,0.5,0.3,0.9c0,0.2-0.1,0.4-0.2,0.6c-0.1,0.3-0.3,0.6-0.4,0.9c-0.1,0.3-0.3,0.6-0.5,0.9  c-0.2,0.3-0.6,0.6-1.2,0.8c-0.6,0.2-1.3,0.4-2,0.5c-0.7,0.1-1.4,0.2-2.1,0.2c-0.7,0-1.2,0.1-1.6,0.1c-0.4,0-0.9,0-1.6,0  c-0.7,0-1.4-0.1-2.1-0.2c-0.7-0.1-1.4-0.2-2-0.3c-0.6-0.1-1.1-0.3-1.4-0.5l-2.3,4.5c0.2,0.1,0.6,0.2,1.2,0.3c0.6,0.1,1.3,0.2,2,0.3  c0.8,0.1,1.6,0.2,2.4,0.2c0.9,0.1,1.7,0.1,2.5,0.2c0.8,0,1.5,0.1,2.2,0.1c0.6,0,1.1,0,1.5,0c0.6,0,1.3,0,2.1-0.1  c0.8,0,1.6-0.1,2.5-0.2c0.9-0.1,1.8-0.2,2.7-0.4c0.9-0.2,1.8-0.4,2.6-0.6c0.8-0.2,1.6-0.6,2.2-0.9c0.7-0.4,1.2-0.8,1.6-1.3  c0.2-0.2,0.3-0.4,0.4-0.6c0.1-0.2,0.2-0.4,0.3-0.7c0.1-0.3,0.4-0.7,0.7-1.3c0.3-0.6,0.6-1.1,0.9-1.7c0.3-0.6,0.6-1.2,0.8-1.7  c0.2-0.5,0.3-0.9,0.3-1.2c0-0.6-0.3-1.1-0.8-1.5c-0.5-0.4-1.2-0.7-1.9-1c-0.8-0.3-1.6-0.5-2.5-0.7c-0.9-0.2-1.7-0.4-2.5-0.6  C95.7,9.3,95,9,94.5,8.7C94,8.4,93.8,8,93.8,7.4c0-0.1,0-0.3,0.1-0.4c0-0.1,0.1-0.2,0.1-0.4c0.1-0.3,0.3-0.6,0.4-0.8  c0.1-0.3,0.3-0.6,0.4-0.8c0.1-0.2,0.3-0.3,0.7-0.5c0.3-0.1,0.7-0.3,1.2-0.3c0.5-0.1,1-0.2,1.5-0.2c0.5-0.1,1-0.1,1.5-0.1  c0.5,0,0.9,0,1.4-0.1c0.4,0,0.7,0,1,0c0.4,0,0.9,0,1.6,0c0.7,0,1.3,0.1,2.1,0.1c0.7,0.1,1.4,0.2,2,0.3c0.6,0.1,1.1,0.3,1.4,0.5  L110.6,0.7z M144,0.1h-28.3L113.6,5c0.2-0.1,0.5-0.2,0.9-0.3c0.4-0.1,0.8-0.1,1.2-0.1c0.4,0,0.9,0,1.3-0.1c0.4,0,0.8,0,1,0  c0.9,0,1.8,0,2.6,0c0.9,0,1.7,0,2.6,0.1L114.4,24h9.6l8.6-19.3c1.2,0,2.3,0,3.5-0.1c1.1,0,2.3-0.1,3.5-0.1c0.4,0,0.7,0,1,0.1  c0.3,0.1,0.6,0.3,0.9,0.5L144,0.1z M176.5,0.1h-27.1c0,0.3,0,0.7,0,1c0,0.4-0.1,0.7-0.2,1l-10.6,20.7c-0.2,0.4-0.5,0.8-0.9,1.2h26.5  l3.6-5.3c-1.3,0.4-2.6,0.6-3.9,0.8c-1.3,0.2-2.7,0.3-4,0.3l-9.4,0.1l3.1-6.1h8.1l2.3-3.9l-8.4-0.1l3.1-6.1c1.3,0,2.5,0,3.8-0.1  c1.2,0,2.5,0,3.7,0c0.6,0,1.2,0,1.9,0.1c0.7,0.1,1.3,0.2,2,0.3c0.7,0.2,1.3,0.3,1.9,0.6c0.6,0.2,1.2,0.5,1.7,0.8L176.5,0.1z   M198,5.5c0,0.1,0,0.3-0.1,0.5c0,0.2-0.1,0.3-0.2,0.5c-0.1,0.4-0.3,0.8-0.5,1.2c-0.2,0.4-0.5,0.8-0.7,1.1c-0.3,0.3-0.6,0.6-1,0.8  c-0.4,0.2-0.8,0.3-1.3,0.4c0,0-0.1,0-0.2,0c-0.1,0-0.3,0-0.5,0c-0.2,0-0.3,0-0.5,0h-0.3h-2c-0.4,0-0.8,0-1.4,0c-0.5,0-1,0-1.3-0.1  l3-5.8c0.6,0,1.2,0,1.8,0c0.6,0,1.2,0,1.8,0c0.2,0,0.5,0,0.9,0c0.4,0,0.8,0.1,1.1,0.2c0.4,0.1,0.7,0.2,0.9,0.4  C197.9,4.9,198,5.2,198,5.5 M208.5,3.3c0-0.5-0.1-0.9-0.3-1.2c-0.2-0.3-0.4-0.6-0.8-0.9c-0.3-0.2-0.7-0.5-1-0.6  c-0.4-0.2-0.7-0.3-1.1-0.5h-24c0.1,0.2,0.2,0.5,0.3,0.7c0.1,0.3,0.1,0.5,0.1,0.8c0,0.3-0.1,0.5-0.2,0.7L170.1,24h10.5l5.2-9.4  c0.8,0,1.5,0,2.2,0c0.7,0,1.5,0,2.2,0c0.2,0,0.5,0,0.8,0.1c0.3,0.1,0.5,0.2,0.7,0.3c0.2,0.1,0.4,0.3,0.6,0.5  c0.1,0.2,0.2,0.4,0.2,0.7c0,0.2,0,0.4-0.1,0.6c-0.1,0.2-0.2,0.4-0.2,0.6l-3.2,6.6h9.8c0.3-0.5,0.6-1.2,0.9-1.9  c0.4-0.7,0.7-1.4,1.1-2.2c0.3-0.8,0.6-1.5,0.9-2.2c0.2-0.7,0.4-1.4,0.4-1.9c0-0.5-0.1-0.9-0.3-1.2c-0.2-0.3-0.4-0.6-0.7-0.8  c-0.3-0.2-0.6-0.4-1-0.5c-0.4-0.1-0.8-0.2-1.2-0.3c1.3,0,2.5-0.2,3.4-0.7c1-0.5,1.8-1.1,2.6-1.8c0.7-0.8,1.4-1.7,1.9-2.7  c0.6-1,1.1-2,1.5-3.1C208.4,4.1,208.5,3.7,208.5,3.3 M249.5,0.1H239c0.1,0.2,0.1,0.5,0.1,0.7c0,0.1,0,0.3,0,0.5  c0,0.2-0.1,0.3-0.1,0.4l-5.8,12l-4.6-13.6h-11.7c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,1.1l-10.2,20.6  c-0.1,0.3-0.3,0.5-0.5,0.7c-0.2,0.2-0.4,0.4-0.6,0.7h7.1l8.1-17l4.9,15c0.1,0.3,0.2,0.6,0.2,1c0,0.3-0.1,0.7-0.3,1h12.4L249.5,0.1z   M14.6,33.6c1.1-0.7,2.1-1.3,3.2-2h-4.1c-0.1,0.3-0.3,0.5-0.5,0.7c-0.2,0.2-0.5,0.3-0.7,0.5l-4.4,2.4l1.7-3.6H5.7c0,0.1,0,0.2,0,0.4  c0,0.1-0.1,0.2-0.1,0.3l-4.4,8.5C1,40.9,0.9,41,0.8,41.1c-0.1,0.1-0.2,0.2-0.3,0.3h4.4l2.6-5.1l1.7,5.1c0.3,0,0.6,0,0.8,0  c0.3,0,0.6,0,0.8,0h2.5l-1.9-5.8C12.5,34.9,13.6,34.3,14.6,33.6 M31.2,31.6H20c0,0.1,0,0.3,0,0.4c0,0.1,0,0.3-0.1,0.4l-4.3,8.5  c-0.1,0.2-0.2,0.3-0.4,0.5h10.9l1.5-2.2c-0.5,0.2-1.1,0.3-1.6,0.3c-0.5,0.1-1.1,0.1-1.6,0.1l-3.9,0l1.3-2.5h3.3l0.9-1.6l-3.4,0  l1.3-2.5c0.5,0,1,0,1.5,0c0.5,0,1,0,1.5,0c0.3,0,0.5,0,0.8,0c0.3,0,0.5,0.1,0.8,0.1c0.3,0.1,0.5,0.1,0.8,0.2  c0.3,0.1,0.5,0.2,0.7,0.3L31.2,31.6z M46.7,31.6h-4.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1-0.1,0.2L40,37.2l-1.9-5.6  h-4.8c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.3-0.1,0.4L29,40.8c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3h2.9l3.3-7l2,6.2  c0,0.1,0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4h5.1L46.7,31.6z M60.7,31.6H49l-0.9,2c0.1,0,0.2-0.1,0.4-0.1c0.2,0,0.3,0,0.5-0.1  c0.2,0,0.4,0,0.5,0c0.2,0,0.3,0,0.4,0c0.4,0,0.7,0,1.1,0c0.4,0,0.7,0,1.1,0l-3.6,8h3.9l3.5-8c0.5,0,0.9,0,1.4,0c0.5,0,0.9,0,1.4,0  c0.2,0,0.3,0,0.4,0.1c0.1,0,0.3,0.1,0.4,0.2L60.7,31.6z M74.2,31.6H70l-3.5,7.6c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.2  c-0.2,0.1-0.3,0.1-0.5,0.1c-0.2,0-0.4,0-0.5,0c-0.1,0-0.3,0-0.4,0c-0.2,0-0.3-0.1-0.5-0.1c-0.2-0.1-0.3-0.1-0.4-0.2  c-0.1-0.1-0.2-0.2-0.2-0.4c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0.6-1.2,1.2-2.4,1.8-3.6c0.6-1.2,1.2-2.4,1.8-3.6h-4.3  c0,0.2,0.1,0.3,0.1,0.5c0,0.1,0,0.2,0,0.2l-3.2,6.5c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.2-0.1,0.3-0.1,0.5c0,0.3,0.1,0.5,0.3,0.7  c0.2,0.2,0.4,0.4,0.7,0.5c0.3,0.1,0.6,0.2,1,0.3c0.4,0.1,0.7,0.1,1.1,0.1c0.4,0,0.7,0,1,0.1c0.3,0,0.6,0,0.8,0c0.3,0,0.6,0,1,0  c0.4,0,0.8,0,1.3-0.1c0.4,0,0.9-0.1,1.4-0.2c0.5-0.1,0.9-0.2,1.3-0.3c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.4,0.6-0.7L74.2,31.6z   M86.4,31.8c-0.3,0-0.6-0.1-0.8-0.1c-0.3,0-0.6-0.1-0.8-0.1h-3.6c-0.2,0-0.3,0-0.5,0c-0.2,0-0.3,0.1-0.5,0.1  c-0.4,0.1-0.9,0.2-1.3,0.3c-0.4,0.1-0.8,0.3-1.2,0.5c-0.4,0.2-0.8,0.4-1.1,0.7c-0.4,0.3-0.7,0.5-1,0.9c-0.2,0.2-0.4,0.5-0.5,0.7  c-0.2,0.3-0.3,0.5-0.5,0.8c-0.2,0.3-0.3,0.6-0.4,0.9c-0.1,0.3-0.3,0.6-0.4,0.8c-0.1,0.2-0.2,0.5-0.3,0.8c-0.1,0.3-0.1,0.5-0.1,0.8  c0,0.5,0.1,0.8,0.3,1.2s0.5,0.6,0.8,0.8c0.3,0.2,0.7,0.4,1.1,0.4c0.4,0.1,0.8,0.1,1.2,0.1h5.9l1.2-2.2c-0.5,0.1-1,0.1-1.6,0.2  c-0.5,0-1,0.1-1.6,0.1c-0.2,0-0.4,0-0.6,0c-0.2,0-0.5,0-0.7-0.1c-0.3,0-0.5-0.1-0.8-0.1c-0.3-0.1-0.5-0.1-0.7-0.3  c-0.2-0.1-0.4-0.2-0.5-0.4c-0.1-0.2-0.2-0.4-0.2-0.6c0-0.2,0-0.3,0.1-0.4c0.1-0.3,0.3-0.6,0.4-0.9c0.2-0.3,0.4-0.7,0.6-1  c0.2-0.3,0.5-0.6,0.7-0.9c0.3-0.3,0.5-0.5,0.8-0.6c0.4-0.2,0.9-0.4,1.4-0.4c0.5-0.1,1-0.1,1.5-0.1c0.4,0,0.9,0,1.4,0.1  c0.5,0.1,0.9,0.2,1.3,0.3L86.4,31.8z M98.6,33.6c1.1-0.7,2.1-1.3,3.2-2h-4.1c-0.1,0.3-0.3,0.5-0.5,0.7c-0.2,0.2-0.5,0.3-0.7,0.5  l-4.4,2.4l1.7-3.6h-4.1c0,0.1,0,0.2,0,0.4c0,0.1-0.1,0.2-0.1,0.3l-4.4,8.5c-0.1,0.1-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.3,0.3h4.4  l2.6-5.1l1.7,5.1c0.3,0,0.6,0,0.8,0c0.3,0,0.6,0,0.8,0h2.5l-1.9-5.8C96.5,34.9,97.5,34.3,98.6,33.6 M113.9,31.6h-4.3  c-0.7,0.6-1.3,1.3-1.9,1.9c-0.6,0.6-1.2,1.3-1.8,2l0.7-3.8l-4.3-0.1c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.1,0.4,0.1,0.6  c0,0.6-0.1,1.3-0.2,1.9c-0.1,0.6-0.2,1.3-0.3,1.9c0,0.2,0,0.5-0.1,0.7c0,0.2-0.1,0.5-0.1,0.7c-0.1,0.2-0.2,0.3-0.3,0.5  c-0.1,0.2-0.2,0.3-0.3,0.5l-1.7,2.6h4.3l1.6-2.6c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0.2-0.3,0.3-0.5c0.4-0.4,0.8-0.8,1.2-1.1  c0.4-0.3,0.9-0.7,1.3-1L113.9,31.6z M135.2,31.6h-4.1l-3.4,7.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.3,0.2-0.5,0.2  c-0.2,0.1-0.3,0.1-0.5,0.1c-0.2,0-0.4,0-0.5,0c-0.1,0-0.3,0-0.4,0c-0.2,0-0.3-0.1-0.5-0.1c-0.2-0.1-0.3-0.1-0.4-0.2  c-0.1-0.1-0.2-0.2-0.2-0.4c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0.1-0.2c0.6-1.2,1.1-2.4,1.7-3.6c0.6-1.2,1.2-2.4,1.8-3.6h-4.3  c0,0.2,0.1,0.3,0.1,0.5c0,0.1,0,0.2,0,0.2l-3.1,6.4c-0.1,0.1-0.1,0.3-0.2,0.4c0,0.1-0.1,0.3-0.1,0.4c0,0.3,0.1,0.5,0.3,0.7  c0.2,0.2,0.4,0.4,0.7,0.5c0.3,0.1,0.6,0.2,1,0.3c0.4,0.1,0.7,0.1,1.1,0.1c0.4,0,0.7,0,1,0.1c0.3,0,0.6,0,0.7,0c0.3,0,0.6,0,1,0  c0.4,0,0.8,0,1.2-0.1c0.4,0,0.9-0.1,1.3-0.2c0.5-0.1,0.9-0.2,1.3-0.3c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.5-0.4,0.6-0.7L135.2,31.6z   M151.5,31.6h-4.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1-0.1,0.2l-2.4,4.9l-1.9-5.5h-4.8c0,0.1,0.1,0.2,0.1,0.3  c0,0.1,0,0.3-0.1,0.4l-4.2,8.4c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3h2.9l3.3-6.9l2,6.1c0,0.1,0.1,0.3,0.1,0.4  c0,0.1,0,0.3-0.1,0.4h5L151.5,31.6z M159,31.6h-4.4c0,0.1,0,0.3,0,0.4c0,0.2-0.1,0.3-0.2,0.4l-4.3,8.4c-0.1,0.2-0.2,0.3-0.4,0.5h4.4  L159,31.6z M171.7,34c0.8-0.8,1.7-1.6,2.5-2.5l-3.6,0l-7.6,7.6l2.5-7.6l-4.9,0.1c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.4  c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1-0.1,0.2l-2.9,8.5h6.1c0.9-0.8,1.7-1.6,2.6-2.4c0.8-0.8,1.7-1.6,2.5-2.4  C170.1,35.7,170.9,34.9,171.7,34 M187,31.6h-11c0,0.1,0,0.3,0,0.4c0,0.1,0,0.3-0.1,0.4l-4.3,8.4c-0.1,0.2-0.2,0.3-0.4,0.5H182  l1.5-2.2c-0.5,0.1-1.1,0.3-1.6,0.3c-0.5,0.1-1.1,0.1-1.6,0.1l-3.8,0l1.3-2.5h3.3l0.9-1.6l-3.4,0l1.3-2.5c0.5,0,1,0,1.5,0  c0.5,0,1,0,1.5,0c0.2,0,0.5,0,0.8,0c0.3,0,0.5,0.1,0.8,0.1c0.3,0.1,0.5,0.1,0.8,0.2c0.3,0.1,0.5,0.2,0.7,0.3L187,31.6z M195.8,33.8  c0,0.1,0,0.1,0,0.2c0,0.1,0,0.1-0.1,0.2c-0.1,0.2-0.1,0.3-0.2,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.4,0.3  c-0.1,0.1-0.3,0.1-0.5,0.2c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0h-0.1h-0.8c-0.2,0-0.3,0-0.6,0c-0.2,0-0.4,0-0.5,0  l1.2-2.4c0.2,0,0.5,0,0.7,0c0.2,0,0.5,0,0.7,0c0.1,0,0.2,0,0.4,0c0.2,0,0.3,0,0.5,0.1c0.1,0,0.3,0.1,0.4,0.2  C195.7,33.5,195.8,33.7,195.8,33.8 M200,32.9c0-0.2,0-0.3-0.1-0.5c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.3-0.2-0.4-0.3  c-0.2-0.1-0.3-0.1-0.4-0.2H189c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2,0,0.3c0,0.1,0,0.2-0.1,0.3l-4.7,8.8h4.3l1.7-3  c0.4-0.3,0.9-0.5,1.3-0.8c0.3,0,0.6,0,0.9,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.2,0.1,0.2,0.2  c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.2,0,0.3c0,0.1-0.1,0.2-0.1,0.2l-1.3,2.7h4c0.1-0.2,0.2-0.5,0.4-0.8c0.1-0.3,0.3-0.6,0.4-0.9  c0.1-0.3,0.3-0.6,0.4-0.9c0.1-0.3,0.1-0.6,0.1-0.8c0-0.2,0-0.4-0.1-0.5c-0.1-0.1-0.2-0.2-0.3-0.3s-0.3-0.2-0.4-0.2  c-0.2-0.1-0.3-0.1-0.5-0.1c0.5,0,1-0.1,1.4-0.3c0.4-0.2,0.7-0.4,1-0.8c0.3-0.3,0.6-0.7,0.8-1.1c0.2-0.4,0.4-0.8,0.6-1.3  C200,33.2,200,33,200,32.9 M213,31.8c-0.5-0.1-1-0.1-1.5-0.2c-0.5-0.1-1-0.1-1.5-0.1h-3c-0.2,0-0.4,0-0.7,0c-0.3,0-0.6,0-0.9,0.1  c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.2-0.8,0.3c-0.3,0.1-0.5,0.2-0.7,0.4c-0.2,0.1-0.4,0.3-0.5,0.5l-0.6,0.9  c-0.1,0.2-0.3,0.5-0.4,0.7c-0.1,0.2-0.2,0.5-0.2,0.8c0,0.3,0.1,0.5,0.2,0.6c0.2,0.1,0.4,0.2,0.6,0.3c0.4,0.1,0.8,0.2,1.2,0.3  c0.4,0.1,0.8,0.2,1.2,0.3c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.2,0.1,0.4  c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.1,0.2-0.2,0.4c-0.1,0.1-0.1,0.2-0.2,0.4c-0.1,0.1-0.2,0.2-0.5,0.3c-0.2,0.1-0.5,0.1-0.8,0.2  c-0.3,0-0.6,0.1-0.9,0.1c-0.3,0-0.5,0-0.7,0c-0.2,0-0.4,0-0.7,0c-0.3,0-0.6,0-0.9-0.1c-0.3,0-0.6-0.1-0.8-0.1  c-0.3-0.1-0.4-0.1-0.6-0.2l-0.9,1.8c0.1,0,0.3,0.1,0.5,0.1c0.2,0,0.5,0.1,0.8,0.1c0.3,0,0.6,0.1,1,0.1c0.4,0,0.7,0.1,1,0.1  c0.3,0,0.6,0,0.9,0c0.3,0,0.5,0,0.6,0c0.2,0,0.5,0,0.9,0c0.3,0,0.7,0,1-0.1c0.4,0,0.7-0.1,1.1-0.2c0.4-0.1,0.7-0.2,1-0.3  c0.3-0.1,0.6-0.2,0.9-0.4c0.3-0.1,0.5-0.3,0.7-0.5c0.1-0.1,0.1-0.2,0.2-0.2c0-0.1,0.1-0.2,0.1-0.3c0.1-0.1,0.2-0.3,0.3-0.5  c0.1-0.2,0.2-0.5,0.4-0.7c0.1-0.2,0.2-0.5,0.3-0.7c0.1-0.2,0.1-0.4,0.1-0.5c0-0.3-0.1-0.5-0.3-0.6c-0.2-0.2-0.5-0.3-0.8-0.4  c-0.3-0.1-0.7-0.2-1-0.3c-0.4-0.1-0.7-0.2-1-0.3c-0.3-0.1-0.6-0.2-0.8-0.3c-0.2-0.1-0.3-0.3-0.3-0.5c0-0.1,0-0.1,0-0.2  c0,0,0-0.1,0.1-0.1c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.2-0.3c0-0.1,0.1-0.1,0.3-0.2c0.1-0.1,0.3-0.1,0.5-0.1  c0.2,0,0.4-0.1,0.6-0.1c0.2,0,0.4,0,0.6-0.1c0.2,0,0.4,0,0.6,0c0.2,0,0.3,0,0.4,0c0.2,0,0.4,0,0.6,0c0.3,0,0.5,0,0.8,0.1  c0.3,0,0.6,0.1,0.8,0.1c0.3,0,0.4,0.1,0.6,0.2L213,31.8z M220.3,31.6H216c0,0.1,0,0.3,0,0.4c0,0.2-0.1,0.3-0.2,0.4l-4.3,8.4  c-0.1,0.2-0.2,0.3-0.4,0.5h4.4L220.3,31.6z M234.1,31.6h-11.5l-0.9,2c0.1,0,0.2-0.1,0.4-0.1c0.2,0,0.3,0,0.5-0.1c0.2,0,0.3,0,0.5,0  c0.2,0,0.3,0,0.4,0c0.4,0,0.7,0,1.1,0c0.3,0,0.7,0,1.1,0l-3.6,7.9h3.9l3.5-7.9c0.5,0,0.9,0,1.4,0c0.5,0,0.9,0,1.4,0  c0.2,0,0.3,0,0.4,0.1c0.1,0,0.3,0.1,0.4,0.2L234.1,31.6z M246.4,31.6h-4.2c-0.6,0.6-1.3,1.2-1.9,1.9c-0.6,0.6-1.2,1.3-1.8,2l0.7-3.7  l-4.2-0.1c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.1,0.4,0.1,0.6c0,0.6-0.1,1.3-0.2,1.9c-0.1,0.6-0.2,1.3-0.3,1.9c0,0.2,0,0.4-0.1,0.7  c0,0.2-0.1,0.5-0.1,0.7c-0.1,0.2-0.1,0.3-0.3,0.5c-0.1,0.2-0.2,0.3-0.3,0.5l-1.6,2.6h4.3l1.6-2.6c0.1-0.2,0.2-0.3,0.3-0.5  c0.1-0.2,0.2-0.3,0.3-0.5c0.4-0.4,0.8-0.7,1.2-1.1c0.4-0.3,0.8-0.7,1.3-1L246.4,31.6z"
            />
          </svg> */}
          </a>
          <button
            data-bs-dismiss="offcanvas"
            className="btn-close"
            aria-label="Close"
            type="button"
          ></button>
        </div>
        <div className="border-top mx-3" />
        <div className="offcanvas-body">
          <ul className="list-unstyled ps-0">
            {sections.map((section, i) => (
              <li key={section.title} className="mb-1">
                <button
                  data-bs-target={
                    "#" + section.title.replace(/\s/g, "") + "-collapse"
                  }
                  className="text-start btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  aria-expanded={i < 1 ? "true" : "false"}
                  data-bs-toggle="collapse"
                >
                  {section.title}
                </button>
                <div
                  id={section.title.replace(/\s/g, "") + "-collapse"}
                  className={"collapse" + (i < 1 ? " show" : "")}
                >
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a
                          className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                          href={item.link}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {item.title}
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
      </div>
    </div>
  );
};

const OffcanvasButton = ({ direction }) => {
  return (
    <Button
      className="btn ms-2 ms-sm-3 rounded-pill follows-offcanvas-btn opacity-xs-25 offcanvas-btn-transition border-secondary-subtle"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      data-bs-toggle="offcanvas"
      backgroundColor="#611f34"
      type="button"
    >
      <div className="icon-link">
        Menu
        <svg
          className="bi bi-arrow-left offcanvas-menu-arrow"
          transform={`scale (${direction ? -1 : 1}, 1)`}
          xmlns="http://www.w3.org/2000/svg"
          transform-origin="center"
          fill="currentColor"
          viewBox="0 0 16 16"
          height={16}
          width={16}
        >
          <path
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </Button>
  );
};

/*
- lock symbol on restricted cards
- make button box shadow based on bg color
- don't need weird extensions at end of urls
- modal + tooltip z index weirdness
*/

// 4/7/2023

/*

TODO
* arrange permission required blocks towards bottom
* edit desc to include ...some dashboards require elevated permissions
* fix header bg color
- re-organize template

*/

// 4/6/2023

/*

TITLE
* eku data page (on page + browser)

BLOCKS
* need perm, towards the bottom
* Enrollment Report: https://www.irserver2.eku.edu/reports/enrreport/
* dev & alumni eng: https://irserver2.eku.edu/Reports/PC/Development/v01/
* KY County Reports: https://irserver2.eku.edu/Reports/SAS/Counties/
* Faculty Workload: https://irserver2.eku.edu/reports/facultyworkload/
* Grade Distribution: https://irserver2.eku.edu/Reports/PC/DFW/
* need to remove pc dashboard

MENU ICON
- chad says maybe show cpe pc links to certain people (don't add for now)
* arrow icon pointing out
* see about having icon follow menu and switch directions
* adjust top % of menu button on resize (might be easy way to do with css)
* lower opacity on button on smaller screens (hover adds opacity back)

MENU LINKS
- talk with chad about having menu on the other pages (every page in blocks, even old ones)
* one heading for inst. eff., another for inst. res.
* the ones already listed are inst. res. (add data page)
* the following are inst. eff.
* strategic planning https://strategicplanning.eku.edu/eku-strategic-plan
* student learning assessment https://oie.eku.edu/assessment-student-learning
* assurance of learning day https://oie.eku.edu/assurance-learning-day
* timeline of assessment reports https://oie.eku.edu/timeline-assessment-reports
* academic planning & assessment committee https://oie.eku.edu/academic-planning-and-assessment-committee
* nuventive TRACDAT https://oie.eku.edu/tracdat
* program review https://oie.eku.edu/eku-program-review
* general education assessment https://gened.eku.edu/general-education-assessment#_ga=2.72741779.189407330.1680544482-1686285476.1673295261
* take off other tools
* for cpe: CPE Strategic Agenda: https://cpe.ky.gov/ourwork/strategicagenda.html 

DESCRIPTION
* ...some dashboards require elevated permissions (not verbat.)

TEMPLATE
* new search link: `https://www.eku.edu/search/?q=${query}`
* change header bg color
- re-arrange so sidebar is now child of template and not dashboard
- re-organize in general

MY RECS
- Data Page instead of EKU Data Page (maybe other ideas too)
- eku full text logo instead of other logo (found in identity guide) (if so, chad says take off ie&r menu) (see if branding will design ie&r logo)

HOME PAGE
- chad proposes adding stats in masonry cards (cards like strategic plan)
- bethany will write desc.
- similar to data page
- pull ie&r links, turn into blocks, including data page
- bethany can create the description text
- make default grey bg

*/

// 4/5/2023

// QUESTIONS
// do we like sidebar design?
// do we like current sidebar logo (have another one ready)?
// are the links correct?
// would we rather have the external links icon in the header instead?

// TODO
// template could use some re-arranging
// need to ensure sidebar belongs to template now and is not a child to the same element surronding the fullscreen modal (console bug)
// should i prevent escape key from exiting sidebar?

// LINKS
// sidebar links (eku course evals, qualtrics, univ survey results, inst effectiv, data request form, banner prod, argos rep, cpe links on data page, need to review pc cpe links)

// DATA
// links separated between internal & external in data
// want to use api for blocks
// keywords for blocks to support search next to title
