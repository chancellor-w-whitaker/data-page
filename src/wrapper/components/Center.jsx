import {
  useLayoutEffect,
  cloneElement,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import * as portals from "react-reverse-portal";

import { useEventListener } from "../../hooks/useEventListener";
import { Button } from "./Button";

const resetScrollersByClassName = (
  containerRef,
  classNames,
  beforeModalOpen
) => {
  classNames.forEach((className) => {
    const scrollerCollection =
      containerRef.current.getElementsByClassName(className);
    for (let i = 0; i < scrollerCollection.length; i++) {
      const scroller = scrollerCollection[i];
      if (beforeModalOpen) {
        scroller.style.pointerEvents = "none";
        scroller.scrollTop = 0;
      } else {
        scroller.style.pointerEvents = "auto";
      }
    }
  });
};
const useFullscreenPortal = (children, heading) => {
  const scrollersRef = useRef({
    classNames: {},
  });
  const recordScroll = useCallback(
    (e) => {
      scrollersRef.current.classNames[e.target.className] = true;
    },
    [scrollersRef]
  );
  const dashboardRef = useRef();
  const fullscreenModalName = "fullscreenDashboard";
  const target = "#" + fullscreenModalName;
  const [modalEventStack, setModalEventStack] = useState([]);
  const portalNode = useMemo(() => portals.createHtmlPortalNode(), []);
  const handleModalChange = useCallback((e) => {
    resetScrollersByClassName(
      dashboardRef,
      Object.keys(scrollersRef.current.classNames),
      true
    );
    const nextObject = { type: e.type.split(".")[0], target: e.target.id };
    setModalEventStack((array) => {
      const mostRecent = array[array.length - 1];
      if (mostRecent?.type === "hide" && nextObject.type === "hidden") {
        return [];
      } else {
        return [...array, nextObject];
      }
    });
  }, []);
  const fullscreenModalShown = useMemo(() => {
    const mostRecentEvent = modalEventStack[modalEventStack.length - 1];
    return (
      mostRecentEvent?.type === "shown" &&
      mostRecentEvent?.target === fullscreenModalName
    );
  }, [modalEventStack]);
  const anyModalShown = useMemo(
    () => modalEventStack[modalEventStack.length - 1]?.type === "shown",
    [modalEventStack]
  );
  const fullscreenBackButtonCondition = useMemo(() => {
    // hide, show, hidden, shown
    const last = modalEventStack[modalEventStack.length - 1];
    const secondLast = modalEventStack[modalEventStack.length - 2];
    const thirdLast = modalEventStack[modalEventStack.length - 3];
    const fourthLast = modalEventStack[modalEventStack.length - 4];
    const firstHideIndex = modalEventStack.findIndex(
      (obj) => obj?.type === "hide"
    );
    if (
      fourthLast?.type === "hide" &&
      thirdLast?.type === "show" &&
      secondLast?.type === "hidden" &&
      last?.type === "shown" &&
      firstHideIndex !== -1
    ) {
      if (modalEventStack[firstHideIndex]?.target === fullscreenModalName) {
        return true;
      }
    }
    return false;
  }, [modalEventStack]);
  const modalCloseButton = useMemo(
    () =>
      anyModalShown ? (
        fullscreenBackButtonCondition ? (
          <button
            data-bs-target={"#" + fullscreenModalName}
            className="btn-close go-back-btn"
            data-bs-toggle="modal"
          />
        ) : (
          <button
            data-bs-dismiss="modal"
            className="btn-close"
            aria-label="Close"
            type="button"
          />
        )
      ) : null,
    [anyModalShown, fullscreenBackButtonCondition]
  );
  const dashboard = useMemo(
    () => cloneElement(children, { modalCloseButton }),
    [children, modalCloseButton]
  );
  const portal = useMemo(
    () => (
      <portals.InPortal node={portalNode}>
        <div onScrollCapture={recordScroll} ref={dashboardRef}>
          {dashboard}
        </div>
      </portals.InPortal>
    ),
    [portalNode, dashboardRef, recordScroll, dashboard]
  );
  const body = useMemo(
    () => !fullscreenModalShown && <portals.OutPortal node={portalNode} />,
    [fullscreenModalShown, portalNode]
  );
  const fullscreenBody = useMemo(
    () => fullscreenModalShown && <portals.OutPortal node={portalNode} />,
    [fullscreenModalShown, portalNode]
  );
  const fullscreen = useMemo(
    () => (
      <FullscreenModal
        modalName={fullscreenModalName}
        body={fullscreenBody}
        heading={heading}
      />
    ),
    [heading, fullscreenBody, fullscreenModalName]
  );

  useLayoutEffect(() => {
    resetScrollersByClassName(
      dashboardRef,
      Object.keys(scrollersRef.current.classNames),
      false
    );
  }, [modalEventStack]);

  useEventListener("show.bs.modal", handleModalChange);
  useEventListener("hide.bs.modal", handleModalChange);
  useEventListener("shown.bs.modal", handleModalChange);
  useEventListener("hidden.bs.modal", handleModalChange);

  return [portal, target, body, fullscreen];
};
const FullscreenModal = ({ modalName, heading, body }) => {
  const label = modalName + "Label";

  return (
    <>
      <div
        aria-labelledby={label}
        className="modal fade"
        aria-hidden="true"
        id={modalName}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={label}>
                Eastern Kentucky University
                {/* {heading} */}
              </h1>
              <button
                data-bs-dismiss="modal"
                className="btn-close"
                aria-label="Close"
                type="button"
              />
            </div>
            <div className="modal-body">{body}</div>
            {/* <div className="modal-footer">
              <Button
                backgroundColor="white"
                type="button"
                className="btn three-d-btn"
                data-bs-dismiss="modal"
              >
                Close
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
function Page({ fullscreen, heading, portal, target, body }) {
  return (
    <>
      {portal}
      {/* <Button
        backgroundColor="white"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={target}
        className="btn square-button rounded-0 border-0 position-absolute top-0 end-0"
      >
        <i className="fa-solid fa-up-right-and-down-left-from-center d-flex fs-4"></i>
      </Button> */}
      {body}
      {/* {fullscreen} */}
    </>
  );
}

export const Center = ({ children, heading }) => {
  const [portal, target, body, fullscreen] = useFullscreenPortal(
    children,
    heading
  );

  return (
    <Page
      fullscreen={fullscreen}
      heading={heading}
      portal={portal}
      target={target}
      body={body}
    />
  );
};
