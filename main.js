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
