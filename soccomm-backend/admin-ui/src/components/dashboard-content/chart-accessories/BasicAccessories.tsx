import { PostCountForCategoryType } from "../../../types";

function generateRandomColor() {
  let randomColorHexValues: string = Math.floor(
    Math.random() * 16777215
  ).toString(16);
  let symbol: string = "#";
  let randomColor: string = symbol + randomColorHexValues;
  return randomColor;
}

function BasicAccessories(objectArray: PostCountForCategoryType[]) {
  const labels: string[] = [];
  const backgroundColors: string[] = [];
  const graphValues: number[] = [];

  objectArray.forEach(function (item, index) {
    labels[index] = item.catName;
    backgroundColors[index] = generateRandomColor();
    graphValues[index] = item.countOfPosts;
    return labels;
  });

  return {
    labels,
    backgroundColors,
    graphValues,
  };
}

export default BasicAccessories;
