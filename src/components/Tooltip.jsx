import {
  useDelayGroupContext,
  useTransitionStyles,
  useInteractions,
  FloatingPortal,
  useDelayGroup,
  useMergeRefs,
  useFloating,
  autoUpdate,
  useDismiss,
  useHover,
  useFocus,
  useRole,
  offset,
  shift,
  useId,
  flip,
} from "@floating-ui/react";
import * as React from "react";

export function useTooltip({
  onOpenChange: setControlledOpen,
  open: controlledOpen,
  initialOpen = false,
  placement = "top",
} = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const { delay } = useDelayGroupContext();

  const data = useFloating({
    middleware: [offset(16), flip(), shift()],
    whileElementsMounted: autoUpdate,
    onOpenChange: setOpen,
    placement,
    open,
  });

  const context = data.context;

  const hover = useHover(context, {
    enabled: controlledOpen == null,
    move: false,
    delay,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      setOpen,
      open,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

const TooltipContext = React.createContext(null);

export const useTooltipState = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function Tooltip({ children, ...options }) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = React.forwardRef(function TooltipTrigger(
  { asChild = false, children, ...props },
  propRef
) {
  const state = useTooltipState();

  const childrenRef = children.ref;
  const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": state.open ? "open" : "closed",
      })
    );
  }

  return (
    <span
      // The user can style the trigger based on the state
      data-state={state.open ? "open" : "closed"}
      ref={ref}
      {...state.getReferenceProps(props)}
    >
      {children}
    </span>
  );
});

export const TooltipContent = React.forwardRef(function TooltipContent(
  props,
  propRef
) {
  const state = useTooltipState();
  const id = useId();
  const { isInstantPhase, currentId } = useDelayGroupContext();
  const ref = useMergeRefs([state.refs.setFloating, propRef]);

  useDelayGroup(state.context, { id });

  const instantDuration = 0;
  const duration = 250;

  const { isMounted, styles } = useTransitionStyles(state.context, {
    duration: isInstantPhase
      ? {
          // `currentId` is the current group's `id`
          close: currentId === id ? duration : instantDuration,
          // `id` is this component's `id`
          open: instantDuration,
        }
      : duration,
    initial: {
      opacity: 0,
    },
  });

  return (
    <FloatingPortal>
      {isMounted && (
        <div
          style={{
            visibility: state.x == null ? "hidden" : "visible",
            position: state.strategy,
            left: state.x ?? 0,
            top: state.y ?? 0,
            zIndex: 1100,
            ...props.style,
            ...styles,
          }}
          className={"message-bubble " + state.context.placement}
          ref={ref}
          {...state.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  );
});
