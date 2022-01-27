import React, { useEffect, useState } from "react";
import SelectElement from "components/Dropdowns/SelectElement";
import { getLegjobbMunkaruhaMarketingCostByMonth, getMonths } from "services/MarketingCostService";
import { getLegjobbMunkaruhaProfitOnProductsByMonth } from "services/ProfitOnProductsService";
import { getLegjobbMunkaruhaProfitByMonth } from "services/ProfitService";
import CardLineChartTest from "components/Cards/CardLineChartTest";
import FixedCostForm from "components/Forms/FixedCostForm";


const getActualMonth = () => {
  const current = new Date();
  const dateArray = current.toLocaleDateString().split(". ");
  const date = dateArray[0] + "-" + dateArray[1]
  return date;
}

export default function MonthlyStats() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [months, setMonths] = useState();
  const [actualMonth, setActualMonth] = useState(getActualMonth());
  const [chartDataCost, setChartDataCost] = useState({})
  const [chartDataIndividualCost, setChartDataIndividualCost] = useState({})
  const [chartDataProfitOnProducts, setChartDataProfitOnProducts] = useState({})
  const [chartDataProfit, setChartDataProfit] = useState({})


  useEffect(() => {
    getMonths().then((res) => {
      setMonths(res.data)
      setIsLoaded(true)
    })
    .catch((error) => {
      console.error(error)
    });
  }, [])

  useEffect(() => {
    getLegjobbMunkaruhaMarketingCostByMonth(actualMonth).then((res) => {
      setChartDataCost({
        labels: [].concat(...res.data["sum"].map((e) => Object.keys(e))),
        datasets: [
          {
            label: actualMonth,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [].concat(...res.data["sum"].map((e) => Object.values(e))),
            fill: false,
          },
        ],
      })

      setChartDataIndividualCost({
        labels: [].concat(...res.data["argep"].map((e) => Object.keys(e))),
        datasets: [
          {
            label: "Árgép",
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [].concat(...res.data["argep"].map((e) => Object.values(e))),
            fill: false,
          },
          {
            label: "Árukereső",
            backgroundColor: "#f37021",
            borderColor: "#f37021",
            data: [].concat(...res.data["arukereso"].map((e) => Object.values(e))),
            fill: false,
          },
          {
            label: "Facebook",
            backgroundColor: "#4267B2",
            borderColor: "#4267B2",
            data: [].concat(...res.data["facebook"].map((e) => Object.values(e))),
            fill: false,
          },
          {
            label: "Google",
            backgroundColor: "#DB4437",
            borderColor: "#DB4437",
            data: [].concat(...res.data["google"].map((e) => Object.values(e))),
            fill: false,
          },
        ],
      })
    })
    .catch((error) => {
      console.error(error)
    });

    getLegjobbMunkaruhaProfitOnProductsByMonth(actualMonth).then((res) => {
      setChartDataProfitOnProducts({
        labels: [].concat(...res.data.map((e) => Object.keys(e))),
        datasets: [
          {
            label: actualMonth,
            backgroundColor: "#23d95f",
            borderColor: "#23d95f",
            data: [].concat(...res.data.map((e) => Object.values(e))),
            fill: false,
          },
        ],
      })
    })
    .catch((error) => {
      console.error(error)
    });

    getLegjobbMunkaruhaProfitByMonth(actualMonth).then((res) => {
      setChartDataProfit({
        labels: [].concat(...res.data.map((e) => Object.keys(e))),
        datasets: [
          {
            label: actualMonth,
            backgroundColor: "#23d95f",
            borderColor: "#23d95f",
            data: [].concat(...res.data.map((e) => Object.values(e))),
            fill: false,
          },
        ],
      })
    })
    .catch((error) => {
      console.error(error)
    });

    setIsChartLoaded(true);
  }, [actualMonth])


  return (
    isLoaded && isChartLoaded ? (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-4/12 px-4 mb-6">
            <SelectElement label={"Month"} elements={months} setElement={setActualMonth}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
              <CardLineChartTest label={"Marketing cost"} data={chartDataCost} divId={"canvas-div-cost"} canvasElement={'<canvas id="canvas-cost"></canvas>'} canvasId={"canvas-cost"}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
              <CardLineChartTest label={"Marketing cost by channels"} data={chartDataIndividualCost} divId={"canvas-div-ind-cost"} canvasElement={'<canvas id="canvas-ind-cost"></canvas>'} canvasId={"canvas-ind-cost"}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
              <CardLineChartTest label={"Profit on products"} data={chartDataProfitOnProducts} divId={"canvas-div-profit-on-prod"} canvasElement={'<canvas id="canvas-profit-on-prod"></canvas>'} canvasId={"canvas-profit-on-prod"}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
              <CardLineChartTest label={"Profit"} data={chartDataProfit} divId={"canvas-div-profit"} canvasElement={'<canvas id="canvas-profit"></canvas>'} canvasId={"canvas-profit"}/>
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="mb-12 px-4">
            <FixedCostForm month={actualMonth}/>
          </div>
        </div>
      </>
    ) :
      (<>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-4/12 px-4">
            Loading...
          </div>      
        </div>
      </>)
  );
}