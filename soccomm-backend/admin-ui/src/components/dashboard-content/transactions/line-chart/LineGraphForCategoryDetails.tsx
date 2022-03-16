import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

type Props = {
  category: string;
};

const lineData = {
  labels: ["June", "July", "August", "September"],
  datasets: [
    {
      label: "Tuition",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [50, 45, 49, 54],
    },
    {
      label: "Yoga",
      data: [33, 25, 51, 54],
      backgroundColor: "#742774",
      borderColor: "#742774",
    },
    {
      label: "Dance",
      data: [36, 20, 12, 40],
      backgroundColor: "#444422",
      borderColor: "#444422",
    },
    {
      label: "Music",
      data: [20, 50, 50, 23],
      backgroundColor: "#00FF00",
      borderColor: "#00FF00",
    },
    {
      label: "Swimming",
      data: [35, 28, 34, 30],
      backgroundColor: "#FFFF00",
      borderColor: "#FFFF00",
    },
    {
      label: "Painting",
      data: [10, 22, 43, 38],
      backgroundColor: "#7fffd4",
      borderColor: "#7fffd4",
    },
  ],
};

const LineGraphForCategoryDetails: React.FC<Props> = ({ category }) => {
  console.log("category is", category);

  const history = useHistory();
  const firstRender = useRef(true);
  const [subCategory, setSubCategory] = React.useState("");

  useEffect(() => {
    if (firstRender.current === true) {
      console.log("first render");
      firstRender.current = false;
    } else if (firstRender.current === false) {
      console.log("not firstRender", subCategory);
      history.push({
        pathname: "/sub-category-details",
        search: `?sub-category=${subCategory}`,
        state: { subCategory: subCategory },
      });
    }
  }, [subCategory]);

  return (
    <div>
      <Line
        data={lineData}
        options={{
          maintainAspectRatio: false,
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: `Transactions of latest 4 months of ${category}`,
            },
          },
          // animations: {
          //   tension: {
          //     duration: 1000,
          //     easing: "linear",
          //     from: 1,
          //     to: 0,
          //     loop: false,
          //   },
          // },
        }}
        width={800}
        height={400}
        getElementAtEvent={(data) => {
          console.log("clicked", data);
          data.forEach(function (item) {
            let indexOfClickedSubCategory = item["datasetIndex"];
            console.log(
              "line data",
              indexOfClickedSubCategory,
              lineData.labels[indexOfClickedSubCategory]
            );
            let subCategoryArray = lineData.datasets[indexOfClickedSubCategory];
            console.log("array", lineData.datasets[indexOfClickedSubCategory]);
            console.log("subcategory is", subCategoryArray["label"]);
            setSubCategory(subCategoryArray["label"]);
          });
        }}
      />
    </div>
  );
};

export default LineGraphForCategoryDetails;
