import React from "react";
import { Pie } from "react-chartjs-2";
import basicAccessories from "../../chart-accessories/BasicAccessories";
import { PostCountForCategoryType } from "../../../../types";
import { useHistory } from "react-router-dom";

type Props = {
  postCountForEachCategory: PostCountForCategoryType[];
  fromDate: string;
  toDate: string;
};

const PieChartForCategories: React.FC<Props> = ({
  postCountForEachCategory,
  fromDate,
  toDate,
}) => {
  const history = useHistory();
  const { labels, backgroundColors, graphValues } = basicAccessories(
    postCountForEachCategory
  );

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: "No of posts",
        backgroundColor: backgroundColors,
        data: graphValues,
      },
    ],
  };
  return (
    <div>
      <Pie
        data={pieData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: { display: true },
            y: {
              display: true,
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
        width={700}
        height={400}
        getElementAtEvent={(data, index) => {
          console.log("clicked", data);
          data.forEach(function (item) {
            let indexOfClickedCat: number = item["index"];
            console.log(
              "pie data",
              indexOfClickedCat,
              pieData.labels[indexOfClickedCat]
            );
            let catId: string =
              postCountForEachCategory[indexOfClickedCat].catId;
            let catName: string =
              postCountForEachCategory[indexOfClickedCat].catName;
            history.push({
              pathname: "/posts-details",
              search: `?category=${catName}`,
              state: { catName, fromDate, toDate, catId },
            });
          });
        }}
      />
    </div>
  );
};

export default PieChartForCategories;
