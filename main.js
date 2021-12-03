const base_url = "https://get.scrapehero.com/news-api/news/";
const api_key = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const defaultSearchTerm =
  "google%2Camerica%2Ccovid%2CIndia%2Cworld%2Csports%2Cmovie%2Cfacebook";
const defaultSentiment = `${"positive" || "negative" || "neutral"}`;

const defaultSource = "169%2C277%2C211%2C210%2C1%2C2%2C14%2C136%2C157%2C178";
const defaultCategory = "01000000%2C04000000%2C13000000%2C15000000";

const mixedSent = "Negative";
const defaultStartDate = "2021-11-01";
let today = new Date().toISOString().slice(0, 10);
const defaultEndDate = today;

async function categoryNewsApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const newsList = data.result.data;
    insert(newsList);
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

categoryNewsApi(
  `${base_url}?q=${defaultSearchTerm}&sentiment=${defaultSentiment}&start_date=${defaultStartDate}&end_date=${defaultEndDate}&source_id=${defaultSource}&category_id=${defaultCategory}&x-api-key=${api_key}`
);

// *!DISPLAYING NEWS IN LANDING PAGE ////////////////////////////////////////////
const mainHeading = document.querySelector(".main-heading");
const mainSideHeading = document.querySelector(".main-side-heading");
const mainPublication = document.querySelector(".main-publication");
const mainDate = document.querySelector(".main-date");
const mainNews = document.querySelector(".main-news");

const previewContainer = document.querySelector(".preview-container");

function insert(news) {
  console.log(news);

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
    mainDate.innerHTML = `${formatDate(slicedDate())}`;
    mainNews.innerHTML = `${defaultNews.content}`;

    const eachPreviewContainer = document.createElement("div");
    eachPreviewContainer.classList.add("each-preview-container");
    eachPreviewContainer.addEventListener("click", () => {
      mainHeading.innerHTML = `${element.title}`;
      mainPublication.innerHTML = `${element.publication}`;
      mainDate.innerHTML = `${formatDate(slicedDate())}`;
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
            <span class="date">${formatDate(slicedDate())}</span>
            <h3 class="news-title">${element.title}</h3>
            <div class='publication-box'>
              <p class="sentiment-color"></p>
              <p class="overview">${element.publication}</p>
            </div>
          </div>
        </div>`;
    previewContainer.appendChild(eachPreviewContainer);
    const sentiment = element.sentiment;
    const sentimentColors = document.querySelectorAll(".sentiment-color");

    changeSentimentColors(sentimentColors, sentiment);
  });
}

// *!CHANGING COLORS OF SENTIMENT ////////////////////////////////////////////
function changeSentimentColors(colors, sentiment) {
  colors.forEach((color) => {
    if (sentiment == "Positive") {
      color.style.backgroundColor = "green";
    } else if (sentiment == "Neutral") {
      color.style.backgroundColor = "gray";
    } else if (sentiment == "Negative") {
      color.style.backgroundColor = "red";
    }
  });
}

function returnCategory() {
  var selectedValue = document.getElementById("category").value;
  console.dir(selectedValue);
  if (selectedValue !== "") {
    return selectedValue;
  }
  return defaultCategory;
}

function returnSentiment() {
  var selectedValue = document.getElementById("sentiment").value;
  if (selectedValue !== "") {
    return selectedValue;
  }
  return defaultSentiment;
}

function returnSource() {
  var selectedValue = document.getElementById("source").value;
  if (selectedValue !== "") {
    return selectedValue;
  }
  return defaultSource;
}

// *!SEARCH TERM functionality ////////////////////////////////////////////
const searchTab = document.querySelector("#search-tab");
const dateTab = document.querySelector(".date-range");

searchTab.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && searchTab.value !== undefined) {
    const string = searchTab.value;

    console.dir(searchTab.value);
    console.dir(string);
    event.preventDefault();
    categoryNewsApi(
      `${base_url}?q=${string}&sentiment=${returnSentiment()}&start_date=${defaultStartDate}&end_date=${defaultEndDate}&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=${api_key}`
    );

    dateTab.value = `${defaultStartDate}-${defaultEndDate}`;
    previewContainer.innerHTML = "";
    if (searchTab.value == "") {
      window.location.reload();
      console.log("reloaded");
    }
  }
});

// *! ADVANCED SEARCH functionlaity ///////////////////////////

returnCategory();
returnSentiment();
returnSource();

const result = document.querySelector(".result");
result.addEventListener("click", () => {
  console.dir(searchTab);
  let string = searchTab.value;
  console.log(string);
  categoryNewsApi(
    `${base_url}?q=${
      string || defaultSearchTerm
    }&sentiment=${returnSentiment()}&start_date=${defaultStartDate}&end_date=${defaultEndDate}&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=${api_key}`
  );
  console.log(searchTab.value);

  previewContainer.innerHTML = "";
  // searchTab.value = "";
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
        }&sentiment=${returnSentiment()}&start_date=${startDate}&end_date=${endDate}&source_id=${returnSource()}&category_id=${returnCategory()}&x-api-key=${api_key}`
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

function formatDate(d) {
  var date = new Date(d);

  if (isNaN(date.getTime())) {
    return d;
  } else {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    return `${month[date.getMonth()]} ${day},${date.getFullYear()}`;
  }
}

// 178 -bbc
//210 - indian express
//211- india today
//436-sun news
//814 tamilnet.com
//4171 -googlenews
//14-ABC News
// 136-mashabble
// 157 -techradar
//169 -times of india
