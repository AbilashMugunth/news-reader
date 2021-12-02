cateegoryUrl =
  "https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

async function categoryNewsApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

categoryNewsApi(cateegoryUrl);

const form = document.querySelector("form");
console.log(form.elements);

const formElements = form.elements;

const categoryFilter = formElements[0];
const sentimentFilter = formElements[1];
const sourcesFilter = formElements[2];

function returnCategory() {
  var selectedValue = document.getElementById("categories").value;
  console.log(selectedValue);
  return selectedValue;
}

function returnSentiment() {
  var selectedValue = document.getElementById("sentiments").value;
  console.log(selectedValue);
  return selectedValue;
}

function returnSource() {
  var selectedValue = document.getElementById("sources").value;
  console.log(selectedValue);
  return selectedValue;
}

returnCategory();
returnSentiment();
returnSource();

const result = document.querySelector(".result");
result.addEventListener("click", () => {
  categoryNewsApi(
    `https://get.scrapehero.com/news-api/news/?q=Us&sentiment=${returnSentiment()}&start_date=2020-12-01&end_date=2020-12-03&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`
  );
});

// https://get.scrapehero.com/news-api/news/?q=Iphone&sentiment=positive&start_date=2020-12-01&end_date=2020-12-03&source_id=1&category_id=1&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE
