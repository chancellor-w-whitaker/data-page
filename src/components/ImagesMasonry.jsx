import { useDeferredValue, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
import { Masonry } from "react-plock";

import { TooltipContent, TooltipTrigger, Tooltip } from "./Tooltip";
import { useElementSize } from "../hooks/useElementSize";
import { useWidth } from "../WidthContext";

const dataPage2 = false;

// const order = [
//   "Factbook",
//   "Common Data Set 22-23",
//   "Common Data Set 23-24",
//   "Data Request Form",
//   "Fast Facts",
//   "Spring Graduation 2024",
//   "KY Service Region",
//   "Historical Enrollment",
//   "Benchmarks",
// ];

// const sorter = ({ title, order }) =>
//   order.includes(title) ? order.indexOf(title) : Number.MAX_SAFE_INTEGER;

// const masonryItems = [
//   {
//     description:
//       "Compare Annual Enrollment, Degrees Awarded, Retention Rates, Graduation Rates, & Credit Hours; Supporting Details Provided",
//     link: "https://ir.eku.edu/factbook/",
//     image: "./images/factbook.svg",
//     title: "Factbook",
//     secret: false,
//   },
//   {
//     description:
//       "The Common Data Set (CDS) initiative is a collaborative effort among data providers in the higher education community",
//     title: "Common Data Set 22-23",
//     link: "data/CDS-22-23.xlsx",
//     image: "./images/cds.svg",
//     secret: false,
//   },
//   {
//     description:
//       "The Common Data Set (CDS) initiative is a collaborative effort among data providers in the higher education community",
//     title: "Common Data Set 23-24",
//     link: "data/CDS-23-24.xlsx",
//     image: "./images/cds.svg",
//     secret: false,
//   },
//   {
//     description:
//       "Interact with a Colorful Heatmap of KY Counties Fall 2024 Enrollment",
//     link: "https://www.irserver2.eku.edu/reports/serviceregion/",
//     image: "./images/serviceregion.png",
//     title: "KY Service Region",
//     secret: false,
//   },
//   {
//     description:
//       "View EKU's Peer Institutions & EKU's Aspirational Institutions",
//     link: "https://www.irserver2.eku.edu/reports/benchmarkschools/",
//     image: "./images/benchmarkschools.png",
//     title: "Benchmarks",
//     secret: false,
//   },
//   {
//     description:
//       "View and Interact with a Statistical Report of EKU Spring 2024 Graduates",
//     link: "https://ir.eku.edu/spring-graduation-2024",
//     image: "./images/spring-graduation-2024.png",
//     title: "Spring Graduation 2024",
//     secret: false,
//   },
//   {
//     image: "./images/request-form.svg",
//     description: "Coming soon!",
//     title: "Data Request Form",
//     secret: false,
//   },
//   {
//     description:
//       "Compare Annual Fall Enrollment, Degrees Awarded, Retention Rates, Graduation Rates, Progression Rates, & DFW Rates of University or College",
//     link: "https://www.irserver2.eku.edu/D3/Factbook/FB0",
//     image: "./images/fast-facts.png",
//     title: "Fast Facts",
//     secret: false,
//   },
//   {
//     description:
//       "View and Interact with a PowerBI Report of EKU Enrollment throughout Time",
//     link: "https://irserver2.eku.edu/reports/historicalenrollment/",
//     image: "./images/historicalenrollment.png",
//     title: "Historical Enrollment",
//     secret: false,
//   },
//   {
//     description: "Compare Each Year's First Day Enrollment of New Freshman",
//     link: "https://irserver2.eku.edu/reports/firstdayenrollment/",
//     image: "./images/firstdayenrollment.png",
//     title: "First Day Enrollment",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Annual Number of Full-Time & Part-Time Faculty, Full-Time & Part-Time Staff, & Part-Time Students",
//     link: "https://www.irserver2.eku.edu/reports/pc/facultystaff/",
//     image: "./images/facultystaff.png",
//     title: "Full-Time Faculty & Staff",
//     secret: true,
//   },
//   {
//     description:
//       "Compare KPI Metrics by EKU Target, CPE Target, Agreed Target, Average, Predicted, & Recorded",
//     link: "https://www.irserver2.eku.edu/Reports/CPE/Metrics/KPI",
//     image: "./images/kpi-metrics.png",
//     title: "KPI Metrics",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Diversity Metrics by EKU Target, CPE Target, Agreed Target, Average, Predicted, & Recorded",
//     link: "https://www.irserver2.eku.edu/Reports/CPE/Metrics/Diversity",
//     image: "./images/diversity-metrics.png",
//     title: "Diversity Metrics",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Weekly & Yearly Applied, Admitted, & Enrolled of Varying Groups",
//     link: "https://irserver2.eku.edu/Reports/PC/Applications/",
//     title: "Applied, Admitted, & Enrolled",
//     image: "./images/applications.png",
//     secret: true,
//   },
//   {
//     description: "Compare Weekly & Yearly Enrollment of Varying Groups",
//     link: "https://irserver2.eku.edu/Reports/PC/Program%20Enrollment/",
//     image: "./images/current-enrollment.png",
//     title: "Current Enrollment",
//     secret: true,
//   },
//   {
//     description: "Compare Annual Retention Rate of Varying Groups",
//     link: "https://irserver2.eku.edu/Reports/PC/RetentionRate/",
//     image: "./images/retentionrate.png",
//     title: "Retention Rates",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Regional University Performance in Different Metrics; Model to Calculate Performance can be Modified",
//     link: "https://irserver2.eku.edu/Reports/performancemodel/",
//     image: "./images/performancemodel.png",
//     title: "Performance Model",
//     secret: true,
//   },
//   {
//     description: "Compare Statistics of the Four Main Freshman Demographics",
//     link: "https://irserver2.eku.edu/Reports/freshmanprofile/",
//     image: "./images/freshmanprofile.png",
//     title: "Freshman Profile",
//     secret: true,
//   },
//   {
//     description: "Compare Annual Enrollment Recorded at Each Day of Semester",
//     link: "https://irserver2.eku.edu/Reports/pc/daytodayenrollment/",
//     image: "./images/daytodayenrollment.png",
//     title: "Day To Day Enrollment",
//     secret: true,
//   },
//   {
//     description: "Compare Annual KPI's of Each County in KY",
//     link: "https://irserver2.eku.edu/Reports/SAS/Counties/",
//     image: "./images/counties.png",
//     title: "KY County Reports",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Faculty Workload within Varying Groups; Personal Workload Reports can be Generated",
//     link: "https://irserver2.eku.edu/reports/facultyworkload/",
//     image: "./images/facultyworkload.png",
//     title: "Faculty Workload",
//     secret: true,
//   },
//   {
//     description: "Compare DFW Rate & Grade Distribution of Varying Groups",
//     link: "https://irserver2.eku.edu/Reports/PC/DFW/",
//     title: "Grade Distribution",
//     image: "./images/dfw.png",
//     secret: true,
//   },
//   {
//     description:
//       "Compare Annual Campaign Report, Contribution Source Report, Eastern Fund, Board Participation, Endowment Market Performance, & Foundation Scholarships",
//     link: "https://irserver2.eku.edu/Reports/PC/Development/v01/",
//     title: "Development & Alumni Engagement",
//     image: "./images/development.png",
//     secret: true,
//   },
//   {
//     description: "Compare Change in Enrollment within Various Measures",
//     link: "https://www.irserver2.eku.edu/reports/enrreport/",
//     image: "./images/enrreport.png",
//     title: "Enrollment Report",
//     secret: true,
//   },
//   {
//     description:
//       "View Scholarship Budgets, View Student Financial Aid, and Compare Number of Offered, Accepted, Paid, Declined, & Cancelled Scholarships",
//     link: "https://irserver2.eku.edu/Reports/FinancialAid/budgets",
//     title: "Scholarship Dashboard",
//     image: "./images/budgets.png",
//     secret: true,
//   },
// ].sort(
//   ({ title: titleA }, { title: titleB }) =>
//     sorter({ title: titleA, order }) - sorter({ title: titleB, order })
// );

const masonryItems = [
  {
    description:
      "Compare Annual Enrollment, Degrees Awarded, Retention Rates, Graduation Rates, & Credit Hours; Supporting Details Provided",
    link: "https://ir.eku.edu/factbook/",
    image: "./images/factbook.svg",
    title: "Factbook",
    secret: false,
  },
  {
    image: "./images/request-form.svg",
    description: "Coming soon!",
    title: "Data Request Form",
    secret: false,
  },
  {
    description:
      "Compare Annual Fall Enrollment, Degrees Awarded, Retention Rates, Graduation Rates, Progression Rates, & DFW Rates of University or College",
    link: "https://www.irserver2.eku.edu/D3/Factbook/FB0",
    image: "./images/fast-facts.png",
    title: "Fast Facts",
    secret: false,
  },
  {
    description:
      "The Common Data Set (CDS) initiative is a collaborative effort among data providers in the higher education community",
    title: "Common Data Set 22-23",
    link: "data/CDS-22-23.xlsx",
    image: "./images/cds.svg",
    secret: false,
  },
  {
    description:
      "The Common Data Set (CDS) initiative is a collaborative effort among data providers in the higher education community",
    title: "Common Data Set 23-24",
    link: "data/CDS-23-24.xlsx",
    image: "./images/cds.svg",
    secret: false,
  },
  {
    description:
      "View and Interact with a Statistical Report of EKU Spring 2024 Graduates",
    link: "https://ir.eku.edu/spring-graduation-2024",
    image: "./images/spring-graduation-2024.png",
    title: "Spring Graduation 2024",
    secret: false,
  },
  {
    description:
      "Interact with a Colorful Heatmap of KY Counties Fall 2024 Enrollment",
    link: "https://www.irserver2.eku.edu/reports/serviceregion/",
    image: "./images/serviceregion.png",
    title: "KY Service Region",
    secret: false,
  },
  {
    description:
      "View and Interact with a PowerBI Report of EKU Enrollment throughout Time",
    link: "https://irserver2.eku.edu/reports/historicalenrollment/",
    image: "./images/historicalenrollment.png",
    title: "Historical Enrollment",
    secret: false,
  },
  {
    description:
      "View EKU's Peer Institutions & EKU's Aspirational Institutions",
    link: "https://www.irserver2.eku.edu/reports/benchmarkschools/",
    image: "./images/benchmarkschools.png",
    title: "Benchmarks",
    secret: false,
  },
  {
    description: "Compare Each Year's First Day Enrollment of New Freshman",
    link: "https://irserver2.eku.edu/reports/firstdayenrollment/",
    image: "./images/firstdayenrollment.png",
    title: "First Day Enrollment",
    secret: true,
  },
  {
    description:
      "Compare Annual Number of Full-Time & Part-Time Faculty, Full-Time & Part-Time Staff, & Part-Time Students",
    link: "https://www.irserver2.eku.edu/reports/pc/facultystaff/",
    image: "./images/facultystaff.png",
    title: "Full-Time Faculty & Staff",
    secret: true,
  },
  {
    description:
      "Compare KPI Metrics by EKU Target, CPE Target, Agreed Target, Average, Predicted, & Recorded",
    link: "https://www.irserver2.eku.edu/Reports/CPE/Metrics/KPI",
    image: "./images/kpi-metrics.png",
    title: "KPI Metrics",
    secret: true,
  },
  {
    description:
      "Compare Diversity Metrics by EKU Target, CPE Target, Agreed Target, Average, Predicted, & Recorded",
    link: "https://www.irserver2.eku.edu/Reports/CPE/Metrics/Diversity",
    image: "./images/diversity-metrics.png",
    title: "Diversity Metrics",
    secret: true,
  },
  {
    description: "Compare Annual Retention Rate of Varying Groups",
    link: "https://irserver2.eku.edu/Reports/PC/RetentionRate/",
    image: "./images/retentionrate.png",
    title: "Retention Rates",
    secret: true,
  },
  {
    description: "Compare Annual Enrollment Recorded at Each Day of Semester",
    link: "https://irserver2.eku.edu/Reports/pc/daytodayenrollment/",
    image: "./images/daytodayenrollment.png",
    title: "Day To Day Enrollment",
    secret: true,
  },
  {
    description:
      "Compare Annual Campaign Report, Contribution Source Report, Eastern Fund, Board Participation, Endowment Market Performance, & Foundation Scholarships",
    link: "https://irserver2.eku.edu/Reports/PC/Development/v01/",
    title: "Development & Alumni Engagement",
    image: "./images/development.png",
    secret: true,
  },
  {
    description: "Compare Statistics of the Four Main Freshman Demographics",
    link: "https://irserver2.eku.edu/Reports/freshmanprofile/",
    image: "./images/freshmanprofile.png",
    title: "Freshman Profile",
    secret: true,
  },
  {
    description:
      "Compare Weekly & Yearly Applied, Admitted, & Enrolled of Varying Groups",
    link: "https://irserver2.eku.edu/Reports/PC/Applications/",
    title: "Applied, Admitted, & Enrolled",
    image: "./images/applications.png",
    secret: true,
  },
  {
    description: "Compare Weekly & Yearly Enrollment of Varying Groups",
    link: "https://irserver2.eku.edu/Reports/PC/Program%20Enrollment/",
    image: "./images/current-enrollment.png",
    title: "Current Enrollment",
    secret: true,
  },
  {
    description: "Compare Annual KPI's of Each County in KY",
    link: "https://irserver2.eku.edu/Reports/SAS/Counties/",
    image: "./images/counties.png",
    title: "KY County Reports",
    secret: true,
  },
  {
    description: "Compare Change in Enrollment within Various Measures",
    link: "https://www.irserver2.eku.edu/reports/enrreport/",
    image: "./images/enrreport.png",
    title: "Enrollment Report",
    secret: true,
  },
  {
    description: "Compare DFW Rate & Grade Distribution of Varying Groups",
    link: "https://irserver2.eku.edu/Reports/PC/DFW/",
    title: "Grade Distribution",
    image: "./images/dfw.png",
    secret: true,
  },
  {
    description:
      "Compare Faculty Workload within Varying Groups; Personal Workload Reports can be Generated",
    link: "https://irserver2.eku.edu/reports/facultyworkload/",
    image: "./images/facultyworkload.png",
    title: "Faculty Workload",
    secret: true,
  },
  {
    description:
      "Compare Regional University Performance in Different Metrics; Model to Calculate Performance can be Modified",
    link: "https://irserver2.eku.edu/Reports/performancemodel/",
    image: "./images/performancemodel.png",
    title: "Performance Model",
    secret: true,
  },
  {
    description:
      "View Scholarship Budgets, View Student Financial Aid, and Compare Number of Offered, Accepted, Paid, Declined, & Cancelled Scholarships",
    link: "https://irserver2.eku.edu/Reports/FinancialAid/budgets",
    title: "Scholarship Dashboard",
    image: "./images/budgets.png",
    secret: true,
  },
];

console.log(masonryItems);

const media = [576, 992, 1200, 1201];

const columns = [1, 2, 3, 4];

const gap = [24, 24, 24, 24];

const getColumnCount = (width) => {
  if (media.length === columns.length) {
    const lastBreakpoint = media[media.length - 1];

    const lastCount = columns[columns.length - 1];

    if (width >= lastBreakpoint) return lastCount;

    const breakpoints = media.slice(0, media.length - 1);

    for (let i = breakpoints.length - 1; i >= 0; i--) {
      const breakpoint = breakpoints[i];

      const count = columns[i + 1];

      if (width >= breakpoint) return count;
    }

    const firstCount = columns[0];

    return firstCount;
  }
};

const insert = ({ element, into, here }) => [
  ...into.slice(0, here),
  element,
  ...into.slice(here),
];

export const ImagesMasonry = () => {
  const width = useWidth();

  const columnCount = getColumnCount(width);

  const dataRequestFormPosition = columnCount - 1;

  console.log(columnCount);

  const filterCallback = useMemo(
    () => (dataPage2 ? () => true : ({ secret }) => !secret),
    []
  );

  // const data = useMemo(() => {
  //   const array = [...masonryItems].filter(filterCallback);

  //   array.forEach((object) => {
  //     const { description, title } = object;

  //     const words = getWords(`${title} ${description}`);

  //     object.words = words;
  //   });

  //   return array;
  // }, [filterCallback]);

  // const positionedData = useMemo(() => {
  //   const dataRequestForm = data.find(
  //     (element) => element.title === "Data Request Form"
  //   );

  //   const filteredData = data.filter(
  //     (element) => element.title !== "Data Request Form"
  //   );

  //   const findPosition = () => {
  //     if (width < 992) return 1;

  //     if (width < 1200) return 2;

  //     return 3;
  //   };

  //   const drfPosition = findPosition();

  //   filteredData.splice(drfPosition, 0, dataRequestForm);

  //   return filteredData;
  // }, [data, width]);

  // const [query] = useState("");

  // const deferredQuery = useDeferredValue(query);

  // const queriedData = useMemo(
  //   () => getQueriedData({ data: positionedData, deferredQuery }),
  //   [deferredQuery, positionedData]
  // );

  const data = masonryItems.filter(filterCallback);

  const rearrangeData = () => {
    const count = getColumnCount(width);

    if (count < 2) return data;

    const dataRequestForm = data.find(
      ({ title }) => title === "Data Request Form"
    );

    const fastFacts = data.find(({ title }) => title === "Fast Facts");

    const withoutEither = data.filter(
      (item) => item !== dataRequestForm && item !== fastFacts
    );

    const withOne = insert({
      element: dataRequestForm,
      into: withoutEither,
      here: count - 1,
    });

    const withBoth = insert({
      element: fastFacts,
      into: withOne,
      here: count,
    });

    return withBoth;
  };

  const rearrangedData = rearrangeData();

  return (
    <>
      {/* <Header
        style={{ backgroundColor: "rgb(216 217 217)" }}
        className="card-shadow bg-gradient"
        title="EKU Data Page"
        description="Below are interactive dashboards that allow you to track, analyze, and display university trends. Some dashboards require elevated permissions."
      >
        <FilterBar {...{ query, setQuery }} />
      </Header> */}
      {rearrangedData.length > 0 ? (
        <Masonry
          render={(item, idx) => (
            <Card
              style={{
                height: "auto",
                width: "100%",
              }}
              key={idx}
              {...item}
            />
          )}
          config={{
            columns,
            media,
            gap,
          }}
          items={rearrangedData}
          className=""
        />
      ) : null}
    </>
  );
};

const getQueriedData = ({ deferredQuery, data }) => {
  if (deferredQuery === "") return data;

  const queryWords = getWords(deferredQuery);

  console.log(queryWords);

  const matching = data.filter(({ words }) =>
    words.some((word) =>
      queryWords.some((searchTerm) => word.includes(searchTerm))
    )
  );

  return matching;
};

const getWords = (text) => {
  let x = text.replace(/[^A-Za-z0-9]+/g, " ");

  let newArr = x.trim().split(" ");

  return [...newArr.map((string) => string.toLowerCase())];
};

const Header = ({ description, className, children, title, style }) => {
  const cardClassName =
    typeof className === "string" ? "card " + className : "card";

  return (
    <>
      <div className={cardClassName} style={style}>
        <div className="card-body">
          <h5 className="card-title display-4">{title}</h5>
          <p className="card-text fs-4">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

const Card = ({
  description,
  contentCard,
  children,
  title,
  image,
  style,
  link,
  to,
}) => {
  const [ref, { width: tooltipWidth }] = useElementSize();

  const anchor = (
    <a
      className="card card-hover thumbnail-card text-decoration-none"
      rel="noreferrer"
      target="_blank"
      style={style}
      href={link}
      ref={ref}
    >
      {!contentCard && (
        <img className="card-img rounded" src={image} alt="..." />
      )}
      <div
        className={`p-0 position-${
          contentCard ? "static" : "absolute"
        } card-img-overlay overflow-auto bg-dark-hover-transition text-center bg-gradient`}
      >
        <h5 className="card-title text-bg-dark bg-opacity-75 lh-1 p-2 m-0">
          {title}
        </h5>
        {children}
        {/* <p className="card-text text-bg-dark bg-opacity-75 lh-1 p-2 m-3">
        {description}
      </p> */}
      </div>
    </a>
  );

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          {/* {to ? <Link to={to}>{anchor}</Link> : anchor} */}
          {anchor}
        </TooltipTrigger>
        {description && (
          <TooltipContent>
            <div style={{ width: tooltipWidth - 12 }}>{description}</div>
          </TooltipContent>
        )}
      </Tooltip>
    </>
  );
};
