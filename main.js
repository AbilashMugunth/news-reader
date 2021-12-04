// *!URL SELECTORS ////////////////////////////////////////////
const base_url = "https://get.scrapehero.com/news-api/news/";
const api_key = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";

const defaultSearchTerm =
  "google%2Camerica%2Ccovid%2CIndia%2Cworld%2Csports%2Cmovie%2Cfacebook";
const defaultSentiment = `${"positive" || "negative" || "neutral"}`;
const defaultSource = "169%2C277%2C211%2C210%2C1%2C2%2C14%2C136%2C157%2C178";
const defaultCategory = "01000000%2C04000000%2C13000000%2C15000000";

const defaultStartDate = "2021-11-01";
let today = new Date().toISOString().slice(0, 10);
const defaultEndDate = today;

// *!ASYNC FUNCTION ////////////////////////////////////////////
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

// *!LANDING PAGE SELECTORS ////////////////////////////////////////////
const newsContent = document.querySelector(".news-content");
const mainHeading = document.querySelector(".main-heading");
const mainSideHeading = document.querySelector(".main-side-heading");
const mainPublication = document.querySelector(".main-publication");
const mainDate = document.querySelector(".main-date");
const mainNews = document.querySelector(".main-news");
const previewContainer = document.querySelector(".preview-container");
const errorMessage =
  "We can't find what you are looking for 😑😑😑 please use diffrent keyword or filter";

// *!DISPLAYING NEWS IN LANDING PAGE ////////////////////////////////////////////
function insert(news) {
  console.log(news);
  if (news == "") {
    previewContainer.innerHTML = errorMessage;
    newsContent.innerHTML = errorMessage;
  }
  news.forEach((element) => {
    const defaultNews = news[0];
    const datee = element.date;

    function slicedDate() {
      const returnDate = datee.slice(0, 10);
      return returnDate;
    }

    // *!DISPLAYING NEWS FROM DEFAULT////////////////
    mainHeading.innerHTML = `${defaultNews.title}`;
    mainPublication.innerHTML = `${defaultNews.publication}`;
    mainDate.innerHTML = `${formatDate(slicedDate())}`;
    mainNews.innerHTML = `${defaultNews.content}`;

    // *!ADDING EACH PREVIEWS FROM API ////////////////
    const eachPreviewContainer = document.createElement("div");
    eachPreviewContainer.classList.add("each-preview-container");
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

    // *!DISPLAYING NEWS FROM PREVIEWS ////////////////
    eachPreviewContainer.addEventListener("click", () => {
      console.log(eachPreviewContainer);

      mainHeading.innerHTML = `${element.title}`;
      mainPublication.innerHTML = `${element.publication}`;
      mainDate.innerHTML = `${formatDate(slicedDate())}`;
      mainNews.innerHTML = `${element.content}`;
    });

    // *!SENTIMENT SELECTORS & CALLING changeSentimentColors FUNCTION ////////////////
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

// *!FUNCTIONS TO RETURN FILTERED VALUES ////////////////////////////////////////////
function returnCategory() {
  var selectedValue = document.getElementById("category").value;
  console.dir(selectedValue);
  if (selectedValue !== "") {
    localStorage.setItem("categoryvalue", selectedValue);
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

// *!SEARCH TERM FUNCTIONALITY ////////////////////////////////////////////
const searchTab = document.querySelector("#search-tab");
const dateTab = document.querySelector(".date-range");

searchTab.addEventListener("keyup", function (event) {
  // *!If ENTER is pressed //////
  if (event.keyCode === 13 && searchTab.value !== undefined) {
    const string = searchTab.value;

    // *! setting search term local storage////////
    localStorage.setItem("search", searchTab.value);

    console.dir(string);
    event.preventDefault();

    // *!Requesting API When ENTER is clicked ////
    categoryNewsApi(
      `${base_url}?q=${string}&sentiment=${
        getLocalSentiment() || returnSentiment()
      }&start_date=${getLocalStartDate() || defaultStartDate}&end_date=${
        getLocalEndDate() || defaultEndDate
      }&source_id=${getLocalSource() || returnSource()}&category_id=${
        getLocalCategory() || returnCategory()
      }&x-api-key=${api_key}`
    );
    previewContainer.innerHTML = "";

    // *!If search value is empty reload the page //////
    if (searchTab.value == "") {
      window.location.reload();
      console.log("reloaded");
    }
  }
});

// *! ADVANCED SEARCH FUNCTIONALITY ///////////////////////////
const localCategory = document.getElementById("category");
const localSentiment = document.getElementById("sentiment");
const localSource = document.getElementById("source");
const result = document.querySelector(".result");
const cancel = document.querySelector(".cancel");

// *! resets the form when cancel button clicked ////
cancel.addEventListener("click", () => {
  document.querySelector(".form").reset();
});

result.addEventListener("click", () => {
  // *! Setting filters local storage ////
  localStorage.setItem("categoryvalue", localCategory.value);
  localStorage.setItem("sentimentvalue", localSentiment.value);
  localStorage.setItem("sourcevalue", localSource.value);

  console.dir(searchTab);
  let string = searchTab.value;
  console.log(string);

  // *!Requesting API When ShowResult button clicked ////
  categoryNewsApi(
    `${base_url}?q=${string || defaultSearchTerm}&sentiment=${
      getLocalSentiment() || returnSentiment()
    }&start_date=${getLocalStartDate() || defaultStartDate}&end_date=${
      getLocalEndDate() || defaultEndDate
    }&source_id=${getLocalSource() || returnSource()}&category_id=${
      getLocalCategory() || returnCategory()
    }&x-api-key=${api_key}`
  );

  console.log(searchTab.value);
  previewContainer.innerHTML = "";
  // searchTab.value = "";
});

// *! DATE FUNCTIONALITY ///////////////////////////

// !*JQUERY FUNCTION ///////////////////
$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
      autoUpdateInput: false,
      locale: {
        cancelLabel: "Clear",
      },
    },

    function (start, end, label) {
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");
      console.log(
        "A new date selection was made: " + startDate + " to " + endDate
      );
      const string = searchTab.value;
      console.log(string);

      // *!REQUESTING API WHEN DATED CHANGED //////////////////////////
      categoryNewsApi(
        `${base_url}?q=${string || defaultSearchTerm}&sentiment=${
          getLocalSentiment() || returnSentiment()
        }&start_date=${startDate}&end_date=${endDate}&source_id=${
          getLocalSource() || returnSource()
        }&category_id=${
          getLocalCategory() || returnCategory()
        }&x-api-key=${api_key}`
      );
      previewContainer.innerHTML = "";

      // *!SETTING STARTDATE AND ENDDATE LOCAL STORAGE //
      localStorage.setItem("startdate", startDate);
      localStorage.setItem("enddate", endDate);

      // *!DISPLAY DATE IN (paragraph under date search) WHEN DATE IS CHANGED//
      document.getElementById("display-start-date").innerHTML = formatDate(
        getLocalStartDate() || defaultStartDate
      );

      document.getElementById("display-end-date").innerHTML = formatDate(
        getLocalEndDate() || defaultEndDate
      );
    }
  );
});

// *!DISPLAY DATE IN (paragraph under date search) WHEN REFRESHED THE PAGE//

document.getElementById("display-start-date").innerHTML = formatDate(
  getLocalStartDate() || defaultStartDate
);

document.getElementById("display-end-date").innerHTML = formatDate(
  getLocalEndDate() || defaultEndDate
);

// *!LOCAL STORAGE //////////////////////////
function getLocalSearchTerm() {
  searchTab.value = localStorage.getItem("search");
  return searchTab.value;
}

function getLocalStartDate() {
  return localStorage.getItem("startdate");
}

function getLocalEndDate() {
  return localStorage.getItem("enddate");
}

localCategory.value = localStorage.getItem("categoryvalue");
function getLocalCategory() {
  return localStorage.getItem("categoryvalue");
}

localSentiment.value = localStorage.getItem("sentimentvalue");
function getLocalSentiment() {
  return localStorage.getItem("sentimentvalue");
}

localSource.value = localStorage.getItem("sourcevalue");
function getLocalSource() {
  return localStorage.getItem("sourcevalue");
}

// *!INITIAL REQUEST WHEN PAGE LOADED///////////////////////
categoryNewsApi(
  `${base_url}?q=${getLocalSearchTerm() || defaultSearchTerm}&sentiment=${
    getLocalSentiment() || defaultSentiment
  }&start_date=${getLocalStartDate() || defaultStartDate}&end_date=${
    getLocalEndDate() || defaultEndDate
  }&source_id=${getLocalSource() || defaultSource}&category_id=${
    getLocalCategory() || defaultCategory
  }&x-api-key=${api_key}`
);

// *! MODAL /////////////////////////
let modal = document.querySelector(".modal");
let advancedSearchBtn = document.getElementById("advance-search");
let modalBackground = document.getElementById("modal-background");
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

// *! DATE CONVERSION FUNCTION /////////////////////////
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
//4171 -googlenews
//14-ABC News
// 136-mashabble
// 157 -techradar
//169 -times of india
