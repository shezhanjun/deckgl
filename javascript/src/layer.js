import { render as mustacheRender } from "mustache";
import { CLASS_NAME_TOOLTIP } from "./constants";
import { convertColor } from "./utils";

export default function(props, widgetElement) {
  // Pass data back to R in 'shinyMode'
  if (HTMLWidgets.shinyMode) {
    props.onClick = function(info) {
      const data = {
        lng: info.lngLat[0],
        lat: info.lngLat[1],
        object: info.object
      };
      Shiny.onInputChange(widgetElement.id + "_onclick", data);
    };
  }

  // Support deprecated? 'getTooltip' property
  const tooltip = props.tooltip || props.getTooltip;
  if (tooltip) {
    // const tooltipElement = createTooltip(widgetElement);
    const tooltipElement = document.getElementsByClassName(CLASS_NAME_TOOLTIP)[0];
    if (tooltip.style) tooltipElement.style.cssText = tooltip.style;
    props.onHover = function({ x, y, object }) {
      if (!object) {
        tooltipElement.innerHTML = "";
        tooltipElement.style.display = "none";
        return;
      }

      tooltipElement.style.top = y + "px";
      tooltipElement.style.left = x + "px";
      tooltipElement.innerHTML = typeof tooltip === "function" ?
        tooltip(object) : mustacheRender(typeof tooltip === "string" ? tooltip : tooltip.html, object);
      tooltipElement.style.display = "block";
    };
  }

  return Object.assign(props, convertColorProps(props));
  //return new deck[className](props);
}

function convertColorProps(props) {
  const convertedProps = { };
  for (let [key, value] of Object.entries(props)) {
    // if (key === "colorRange" && typeof value[0] === "string") {
    if (key === "colorRange") {
      convertedProps[key] = value.map(specifier => typeof specifier === "string" ?
        convertColor(specifier) : specifier);
    }
    else if (key.includes("Color")) {
      convertedProps[key] = (data) => {
        const specifier = typeof value === "function" ? value(data) : value;
        const rgba = typeof specifier === "string" ? convertColor(specifier) : specifier;
        return rgba;
      };
    }
  }

  return convertedProps;
}
