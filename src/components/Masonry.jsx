import { Masonry as Plock } from "react-plock";
import { useMemo } from "react";

import { TooltipContent, TooltipTrigger, Tooltip } from "./Tooltip";
import { useElementSize } from "../hooks/useElementSize";
import { getColumnCount } from "../js/getColumnCount";
import { renderBuiltUrl } from "../renderBuiltUrl";
import { usePromise } from "../hooks/usePromise";
import { useWidth } from "../WidthContext";
import { insert } from "../js/insert";

// stipulation--only known to be a static resource if begins with "/"
// if you choose to write "./static/..." yourself, you will encounter no issues

const isResource = (string) => string[0] === "/";

const constants = {
  settingsFilename: "settings.json",
  media: [576, 992, 1200, 1201],
  gap: [24, 24, 24, 24],
  columns: [1, 2, 3, 4],
  dataPage2: false,
};

const { settingsFilename, dataPage2, columns, media, gap } = constants;

const settingsUrl = renderBuiltUrl(settingsFilename);

const settingsPromise = fetch(settingsUrl).then((response) => response.json());

export const Masonry = () => {
  const settings = usePromise({ promise: settingsPromise, initialState: {} });

  const { reportsUrl } = settings;

  const reportsPromise = useMemo(
    () => reportsUrl && fetch(reportsUrl).then((response) => response.json()),
    [reportsUrl]
  );

  const reports = usePromise({ promise: reportsPromise, initialState: [] });

  const width = useWidth();

  const filterCallback = dataPage2 ? () => true : ({ secret }) => !secret;

  const data = reports.filter(filterCallback);

  const rearrangeData = () => {
    const count = getColumnCount({ columns, width, media });

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
      {rearrangedData.length > 0 ? (
        <Plock
          render={(item, idx) => (
            <Card
              style={{ height: "auto", width: "100%" }}
              key={idx}
              {...item}
            />
          )}
          config={{ columns, media, gap }}
          items={rearrangedData}
          className=""
        />
      ) : null}
    </>
  );
};

const Card = ({
  description,
  contentCard,
  children,
  image,
  title,
  style,
  link,
}) => {
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
