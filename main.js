// cateegoryUrl =
//   // "https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const base_url = "https://get.scrapehero.com/news-api/news/";

const api_key = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const defaultSearchTerm = "Iphone";
const defaultSentiment = "Positive";
const defaultSource = "277%2C4171";
const defaultCategory = "13010000%2C04018000";
const defaultStartDate = "2021-11-01";

let today = new Date().toISOString().slice(0, 10);
const defaultEndDate = today;

async function categoryNewsApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newsList = data.result.data;
    insert(newsList);
    // insertDefault(newsList);
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

categoryNewsApi(
  `${base_url}?q=${defaultSearchTerm}&sentiment=${defaultSentiment}&start_date=${defaultStartDate}&end_date=${defaultEndDate}&source_id=${defaultSource}&category_id=${defaultCategory}&x-api-key=${api_key}`
);

const mainHeading = document.querySelector(".main-heading");
const mainSideHeading = document.querySelector(".main-side-heading");
const mainPublication = document.querySelector(".main-publication");
const mainDate = document.querySelector(".main-date");
const mainNews = document.querySelector(".main-news");

// function insertDefault(news) {
//   console.log(news);
//   const defaultNews = news[0];
//   const datee = defaultNews.date;

//   function slicedDate() {
//     const returnDate = datee.slice(0, 10);
//     return returnDate;
//   }

//   mainHeading.innerHTML = `${defaultNews.title}`;
//   mainPublication.innerHTML = `${defaultNews.publication}`;
//   mainDate.innerHTML = `${slicedDate()}`;
//   mainNews.innerHTML = `${defaultNews.content}`;
// }

const previewContainer = document.querySelector(".preview-container");

function insert(news) {
  console.log(news[0]);

  news.forEach((element) => {
    const defaultNews = news[0];
    const datee = element.date;
    // // console.log();

    function slicedDate() {
      const returnDate = datee.slice(0, 10);
      return returnDate;
    }

    mainHeading.innerHTML = `${defaultNews.title}`;
    mainPublication.innerHTML = `${defaultNews.publication}`;
    mainDate.innerHTML = `${slicedDate()}`;
    mainNews.innerHTML = `${defaultNews.content}`;

    const eachPreviewContainer = document.createElement("div");
    eachPreviewContainer.classList.add("each-preview-container");
    eachPreviewContainer.addEventListener("click", () => {
      mainHeading.innerHTML = `${element.title}`;
      mainPublication.innerHTML = `${element.publication}`;
      mainDate.innerHTML = `${slicedDate()}`;
      mainNews.innerHTML = `${element.content}`;
    });

    // function reformatDate(date) {
    //   dArr = date.split("-");
    //   const newDate = dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
    //   return newDate;
    // }

    eachPreviewContainer.innerHTML = `
        <div class="news-box">
          
          <div class='news-info'>
          <span
          class="date">${slicedDate()}</span>
              <h3 class="news-title" data-tooltip="View Fullstory" >${
                element.title
              }</h3>
            <p class="overview">${element.publication}</p>
          </div>
        </div>`;
    previewContainer.appendChild(eachPreviewContainer);

    // searchContainer.appendChild(newsContainer);
  });
}

// *!Search functionality ////////////////////////////////////////////

const searchTab = document.querySelector("#search-tab");
const dateTab = document.querySelector(".date-range");

searchTab.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && searchTab.value !== undefined) {
    const string = searchTab.value;

    console.dir(searchTab.value);
    console.dir(string);
    event.preventDefault();
    categoryNewsApi(
      `${base_url}?q=${string}&sentiment=${defaultSentiment}&start_date=${defaultStartDate}&end_date=${defaultEndDate}&source_id=277%2C4171&category_id=13010000%2C04018000&x-api-key=${api_key}`
    );

    dateTab.value = `${defaultStartDate}-${defaultEndDate}`;
    previewContainer.innerHTML = "";
    if (searchTab.value == "") {
      window.location.reload();
      console.log("reloaded");
    }
  }
});

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

  previewContainer.innerHTML = "";
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
      const string = searchTab.value;
      console.log(string);
      categoryNewsApi(
        `${base_url}?q=${
          string || defaultSearchTerm
        }&sentiment=${defaultSentiment}&start_date=${startDate}&end_date=${endDate}&source_id=${defaultSource}&category_id=${defaultCategory}&x-api-key=${api_key}`
      );
      previewContainer.innerHTML = "";
    }
  );
});

// *! MODAL /////////////////////////

let modal = document.querySelector(".modal");

//  select the open-btn button
let advancedSearchBtn = document.getElementById("advance-search");

//  select the modal-background
let modalBackground = document.getElementById("modal-background");

//  select the close-btn
let closeBtn = document.getElementById("close-btn");

//  shows the modal when the user clicks open-btn
advancedSearchBtn.addEventListener("click", function () {
  modalBackground.style.display = "block";
});

//  hides the modal when the user clicks close-btn
closeBtn.addEventListener("click", function () {
  modalBackground.style.display = "none";
});

// hides the modal when the user clicks outside the modal
window.addEventListener("click", function (event) {
  //  check if the event happened on the modal-background
  if (event.target === modalBackground) {
    //  hides the modal
    modalBackground.style.display = "none";
  }
});
