import { axios } from "../Utils/axios";

let currentDate = new Date();
let currentDay = currentDate.getDay();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
export const fetchTopSales = async () => {
  try {
    let data = {
      query: [
        { $and: [{ year: currentYear }, { month: { $gte: 1, $lte: 4 } }] }, //Set From and to Dynamic
        { $and: [{ year: currentYear }, { month: { $gte: 3, $lte: 12 } }] },
      ],
    };
    let productList = await axios.post("/reports/LesseeTransaction", data);
    console.log("productList", productList);
    return productList.data.results;
  } catch (error) {
    console.log("error Product", error);
  }
};
export const fetchWeeklySales = async () => {
  try {
    let data = {
      query: [
        { year: currentYear },
        { month: { $gte: currentMonth, $lte: currentMonth } },
        { day: { $gte: 1, $lte: 7 } },
        // { $and: [{ year: currentYear }, { month: { $gte: 1, $lte: 4 } }] }, //Set From and to Dynamic
        // { $and: [{ year: currentYear }, { month: { $gte: 3, $lte: 12 } }] },
      ],
    };
    let productList = await axios.post("/reports/LesseeTransaction", data);
    console.log("productList", productList);
    return productList.data.results;
  } catch (error) {
    console.log("error Product", error);
  }
};

export const fetchDailySales = async () => {
  try {
    console.log("currentMonth", currentMonth);
    console.log("currentDay", currentDay);
    console.log("currentYear", currentYear);
    let data = {
      query: [
        {
          $and: [
            {
              $and: [
                { year: currentYear },
                { month: { $gte: currentMonth, $lte: currentMonth } },
                { day: 28 },
              ],
            },
            // { year: currentYear },
            // { month: { $gte: currentMonth, $lte: currentMonth } }, //Set From and to Dynamic
            // { day: currentDay },
          ],
        },
      ],
    };
    let productList = await axios.post("/reports/LesseeTransaction", data);
    // console.log("daily raw sales", productList.data.results);
    // const dailySales = productList.data.results.map((item) => {
    //   return {
    //     date: item._id,
    //     amount: item.grandTotal,
    //   };
    // });

    // const sumWithInitial = dailySales.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue.amount,
    //   0,
    // );

    return productList.data.results;
  } catch (error) {
    console.log("error Product", error);
  }
};
// export default fetchTopSales;

export const fetchTopProducts = async () => {
  try {
    let data = {
      query: { status: true },
      filter: { sort: { stocks: 1 } },
    };
    let productList = await axios.post("/top/LesseeProduct", data);
    return productList.data.results;
  } catch (error) {
    console.log("error Product", error);
  }
};

export const fetchTopStores = async () => {
  try {
    let data = {
      query: { status: true },
      filter: { sort: { totalSpent: 1 } },
    };
    console.log("productList before");
    let productList = await axios.post("/top/LesseeVendor", data);
    console.log("productList", productList.data);
    return productList.data.results;
  } catch (error) {
    console.log("error Product", error);
  }
};
export const generateDay = (value) => {
  switch (value) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";

    case 3:
      return "Wed";

    case 4:
      return "Thu";

    case 5:
      return "Fri";

    case 6:
      return "Sat";

    case 7:
      return "Sun";

    case 8:
      return "Sun";
    default:
      return "None";
  }
};
export const generateMonth = (value) => {
  switch (value) {
    case 0:
      return "Ja";
    case 1:
      return "Ja";
    case 2:
      return "Fe";

    case 3:
      return "Ma";

    case 4:
      return "Ap";

    case 5:
      return "Ma";

    case 6:
      return "Ju";

    case 7:
      return "Jul";

    case 8:
      return "Au";

    case 9:
      return "Sep";

    case 10:
      return "Oct";

    case 11:
      return "Nov";

    case 12:
      return "Dec";

    default:
      return "None";
  }
};