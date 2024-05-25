export default {
  title: "Weekly Sales Report ",
  data: {
    loading: true,
  },
  axes: {
    left: {
      mapsTo: "value",
      stacked: true,
    },
    bottom: {
      mapsTo: "date",
      scaleType: "time",
    },
  },
  toolbar: {
    enabled: true,
    numberOfIcons: 3,
    controls: [
      {
        type: "Zoom in",
      },
      {
        type: "Zoom out",
      },
      {
        type: "Reset zoom",
      },
      {
        type: "Custom",
        text: "Custom button",
        shouldBeDisabled: () => !1,
        clickFunction: () => {
          console.log(
            "Custom click function executed. Event `toolbar-button-click` has also been dispatched.",
          );
        },
        iconSVG: {
          content: `<path d="M23,13H18v2h5v2H19a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2h6V15A2,2,0,0,0,23,13Zm0,8H19V19h4Z"/>
				<path d="M13,9H9a2,2,0,0,0-2,2V23H9V18h4v5h2V11A2,2,0,0,0,13,9ZM9,16V11h4v5Z"/><rect data-name="&lt;Transparent Rectangle&gt;" width="32" height="32" style="fill: none"/>`,
        },
      },
    ],
  },
  zoomBar: {
    top: {
      enabled: true,
    },
  },
  height: "400px",
  width: "1200px",
};
