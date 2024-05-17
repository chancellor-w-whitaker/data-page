import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";

import { useClickOutsideCondensed } from "../hooks/useClickOutside";
import { getTextColor } from "../../js/color-functions";

const useBodyBgColor = (footerRef) => {
  const [color, setColor] = useState(
    window.localStorage.getItem("color")
      ? window.localStorage.getItem("color")
      : "#495057"
  );
  const contrast = getTextColor(color).name;

  useEffect(() => {
    window.localStorage.setItem("color", color);
    document.body.style.backgroundColor = color;
  }, [color]);
  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.className = "container footer-container-" + contrast;
    }
  }, [contrast, footerRef]);

  return [color, setColor];
};

export const ColorPicker = ({ footerRef }) => {
  const [color, onChange] = useBodyBgColor(footerRef);
  const [isOpen, open, popover] = useClickOutsideCondensed();

  return (
    <div className="picker">
      <div
        style={{ backgroundColor: color }}
        className="swatch"
        onClick={open}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker onChange={onChange} color={color} />
        </div>
      )}
    </div>
  );
};
