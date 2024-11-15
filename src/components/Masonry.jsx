import { Masonry as Plock } from "react-plock";

import { TooltipContent, TooltipTrigger, Tooltip } from "./Tooltip";
import { useElementSize } from "../hooks/useElementSize";
import { renderBuiltUrl } from "../renderBuiltUrl";
import { useWidth } from "../WidthContext";
import { getWords } from "../js/getWords";

const isResource = (string) => string[0] === "/";

const constants = {
  media: [576, 992, 1200, 1201],
  gap: [24, 24, 24, 24],
  columns: [1, 2, 3, 4],
};

const { columns, media, gap } = constants;

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

const getQueriedData = ({ query, data }) => {
  if (query === "") return data;
  const queryWords = getWords(query);

  const matching = data.filter(({ words }) =>
    words.some((word) =>
      queryWords.some((searchTerm) => word.includes(searchTerm))
    )
  );

  return matching;
};

export const Masonry = ({ query, data }) => {
  const width = useWidth();

  const queriedData = getQueriedData({ query, data });

  const rearrangeData = (data) => {
    const count = getColumnCount(width);

    if (count < 2) return data;

    const dataRequestForm = data.find(
      ({ report_title, title }) =>
        title === "Data Request Form" || report_title === "Data Request Form"
    );

    const fastFacts = data.find(
      ({ report_title, title }) =>
        title === "Fast Facts" || report_title === "Fast Facts"
    );

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

  const rearrangedData = rearrangeData(queriedData);

  return (
    <>
      {rearrangedData.length > 0 ? (
        <Plock
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

const Card = ({
  report_description,
  description: desc,
  report_image_link,
  title: header,
  report_title,
  contentCard,
  report_link,
  image: img,
  children,
  link: a,
  style,
}) => {
  const description = desc ? desc : report_description;

  const title = header ? header : report_title;

  const image = img ? img : report_image_link;

  const link = a ? a : report_link;

  const [ref, { width: tooltipWidth }] = useElementSize();

  const src = isResource(image) ? renderBuiltUrl(image) : image;

  const href = isResource(link) ? renderBuiltUrl(link) : link;

  const anchor = (
    <a
      className="card card-hover thumbnail-card text-decoration-none"
      rel="noreferrer"
      target="_blank"
      style={style}
      href={href}
      ref={ref}
    >
      {!contentCard && <img className="card-img rounded" src={src} alt="..." />}
      <div
        className={`p-0 position-${
          contentCard ? "static" : "absolute"
        } card-img-overlay overflow-auto bg-dark-hover-transition text-center bg-gradient`}
      >
        <h5 className="card-title text-bg-dark bg-opacity-75 lh-1 p-2 m-0">
          {title}
        </h5>
        {children}
      </div>
    </a>
  );

  return (
    <>
      <Tooltip>
        <TooltipTrigger>{anchor}</TooltipTrigger>
        {description && (
          <TooltipContent>
            <div style={{ width: tooltipWidth - 12 }}>{description}</div>
          </TooltipContent>
        )}
      </Tooltip>
    </>
  );
};
