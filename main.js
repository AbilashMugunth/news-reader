cateegoryUrl =
  "https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const api_key = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const base_url = "https://get.scrapehero.com/news-api/news/";
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

const searchTab = document.querySelector("#search-tab");

searchTab.addEventListener("keyup", function (event) {
  const string = searchTab.value;

  if (event.keyCode === 13 && searchTab.value !== undefined) {
    console.log(string);
    event.preventDefault();
    categoryNewsApi(
      `${base_url}?q=${string}&sentiment=Positive&start_date=2020-12-01&end_date=2020-12-03&source_id=277%2C4171&category_id=13010000%2C04018000&x-api-key=${api_key}`
    );
    if (searchTab.value == "") {
      window.location.reload();
      console.log("reloaded");
    }
  }
});

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
    `${base_url}?q=Us&sentiment=${returnSentiment()}&start_date=2020-12-01&end_date=2020-12-03&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=${api_key}`
  );
  console.log(searchTab.value);
});

// *! Date functionlaity ///////////////////////////

$('input[name="dates"]').daterangepicker();

$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
    },
    function (start, end, label) {
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");
      console.log(
        "A new date selection was made: " + startDate + " to " + endDate
      );

      categoryNewsApi(
        `${base_url}?q=Us&sentiment=${returnSentiment()}&start_date=${startDate}&end_date=${endDate}&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=${api_key}`
      );
    }
  );
});
