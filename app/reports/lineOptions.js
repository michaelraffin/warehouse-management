export default {
  title: "Annual Sales Report",
  axes: {
    bottom: {
      title: "2019 Annual Sales Figures",
      mapsTo: "key",
      scaleType: "labels",
    },
    left: {
      mapsTo: "value",
      title: "Conversion rate",
      scaleType: "linear",
    },
  },
  height: "400px",
};
