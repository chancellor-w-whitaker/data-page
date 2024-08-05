import { Masonry as Plock } from "react-plock";
import { useMemo } from "react";

import { TooltipContent, TooltipTrigger, Tooltip } from "./Tooltip";
import { useElementSize } from "../hooks/useElementSize";
import { getColumnCount } from "../js/getColumnCount";
import { usePromise } from "../hooks/usePromise";
import { useWidth } from "../WidthContext";
import { insert } from "../js/insert";

const constants = {
  settingsPromise: fetch("settings.json").then((response) => response.json()),
  media: [576, 992, 1200, 1201],
  gap: [24, 24, 24, 24],
  columns: [1, 2, 3, 4],
  dataPage2: false,
};

const { settingsPromise, dataPage2, columns, media, gap } = constants;

const filterCallback = dataPage2 ? () => true : ({ secret }) => !secret;

export const Masonry = () => {
  const settings = usePromise({ promise: settingsPromise, initialState: {} });

  const { assetPrefix, reportsUrl } = settings;

  const reportsPromise = useMemo(
    () => reportsUrl && fetch(reportsUrl).then((response) => response.json()),
    [reportsUrl]
  );

  const reports = usePromise({ promise: reportsPromise, initialState: [] });

  const width = useWidth();

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
              style={{
                height: "auto",
                width: "100%",
              }}
              assetPrefix={assetPrefix}
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

const isAnAsset = (string) => string[0] === "/";

const Card = ({
  description,
  contentCard,
  assetPrefix,
  children,
  image,
  title,
  style,
  link,
}) => {
  const [ref, { width: tooltipWidth }] = useElementSize();

  const src = isAnAsset(image) ? `${assetPrefix}${image}` : image;

  const href = isAnAsset(link) ? `${assetPrefix}${link}` : link;

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
