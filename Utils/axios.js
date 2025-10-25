import Axios from "axios";
import axiosLocalV2 from "axios";
export const axiosLocal = axiosLocalV2;
export const url = "https://fulfillmentph.com"; // "https://loogyapi.digital"; //  `https://looky-search-api.onrender.com`; // `https://laiwarehouse.onrender.com`; ////process.env.stagingEndpoint
// "http://192.168.1.148:9091"; //
export const urlFirebase = url; //"https://loogyapi.digital"; //process.env.urlFirebase;
export const urlSupBase = url; //"https://loogyapi.digital"; //process.env.urlSupaBase;
export const mapBoxUrl = url; //"https://loogyapi.digital"; //process.env.mapBoxEndpoint;

export const axiosV2Local = (token, id) =>
  Axios.create({
    baseURL: "https://fulfillmentph.com", // "http://192.168.1.148:9091",
    timeOut: 3000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      userID: id,
    },
  });

export const axios = Axios.create({
  baseURL: url,
  timeOut: 3000,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA4NDI2NywiZXhwIjoxOTU1NjYwMjY3fQ.xolRkFiSZYYgBKQkH4NzNstJJVPtABmJBQwFtAHgDg0",
  },
});
export const axiosV2 = (token, id) =>
  Axios.create({
    baseURL: url,
    timeOut: 3000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      userID: id,
    },
  });

export const productStats = Axios.create({
  baseURL: urlFirebase,
  timeOut: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productLike = Axios.create({
  baseURL: urlSupBase,
  timeOut: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MapBox = Axios.create({
  baseURL: mapBoxUrl,
  timeOut: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});
