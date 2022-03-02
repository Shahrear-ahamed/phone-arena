const loadPhoneDataSearches = (searchPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data));
};
const loadOneMobile = (modelNumber) => {
  const url = `https://openapi.programming-hero.com/api/phone/${modelNumber}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => mobileDetails(data.data));
};

// define globally accessible
const errorTitle = document.getElementById("error-title");
// function for reusing
const getHtmlId = (id) => document.getElementById(id);
const addRemoveClass = (idName, value) => {
  const classStyle = document.getElementById(idName);
  if (value) {
    classStyle.classList.add("hidden");
  } else {
    classStyle.classList.remove("hidden");
  }
};

// search value by keypress and button click
const keypress = getHtmlId("search-phone");
keypress.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    loadSearch();
  }
});
const loadSearch = () => {
  document.getElementById("phone-result").textContent = "";
  const searchValue = getHtmlId("search-phone");
  const searchResult = getHtmlId("search-result");

  // error handling for empty input
  if (searchValue.value === "") {
    errorTitle.innerText = "Please enter brands name";
    errorTitle.classList.remove("hidden");
    addRemoveClass("error-msg", true);
    addRemoveClass("result-title", true);
    addRemoveClass("loadMore-div", true);
  } else {
    errorTitle.classList.add("hidden");
    addRemoveClass("error-msg", true);
    addRemoveClass("result-title", true);
    addRemoveClass("loadMore-div", true);
    searchResult.innerText = searchValue.value;
    loadPhoneDataSearches(searchValue.value);
    searchValue.value = "";
    addRemoveClass("detail-main-section", true);
  }
};

// show data only
const showData = (allPhones) => {
  let phones = allPhones.slice(0, 20);
  // error handling after load data
  if (phones.length === 0) {
    errorTitle.innerText = "We're sorry, no phone found.";
    errorTitle.classList.remove("hidden");
    addRemoveClass("error-msg", false);
    addRemoveClass("loadMore-div", true);
  } else {
    errorTitle.classList.add("hidden");
    addRemoveClass("error-msg", true);
    addRemoveClass("loadMore-div", false);
  }
  const loadTwentyPhone = (phones) => {
    const phoneResult = document.getElementById("phone-result");
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="my-4 py-4 rounded-lg border-0 w-4/5 mx-auto shadow-lg">
          <img class="mx-auto w-3/5" src="${phone.image}" alt="">
          <h2 class="text-2xl mt-4 font-semibold">${phone.phone_name}</h2>
          <div class="flex justify-between mx-7 mt-5 mb-3">
              <h4 class="text-lg font-semibold">Brand: ${phone.brand}</h4>
              <button class="bg-blue-600 text-white py-1 px-5 rounded" onClick="showDetails('${phone.slug}')">Details</button>
          </div>
      </div>`;
      phoneResult.appendChild(div);
    });
  };
  loadTwentyPhone(phones);
  addRemoveClass("result-title", false);

  // add load more button function
  const loadMore = () => {
    phones = allPhones.slice(20, allPhones.length);
    loadTwentyPhone(phones);
    addRemoveClass("loadMore-div", true);
  };
};

// load detaiils from details button
const showDetails = (id) => {
  loadOneMobile(id);
};
// load details auto seciton created are here
const mobileDetails = (mobile) => {
  document.getElementById(
    "model-title"
  ).innerText = `${mobile.brand} ${mobile.name}`;
  document.getElementById("details-img").src = `${mobile.image}`;
  document.getElementById("brand-title").innerText = `${mobile.brand}`;
  // sensor details
  const [face, acce, gyro, proxi, comp, baro] = mobile.mainFeatures.sensors;
  const sensors = `${face}, ${acce}, ${gyro}, ${proxi}, ${comp}, ${baro}`;
  // other details
  const err = "No data found for this device";
  const detailsArray = [
    "Announced",
    "Display",
    "Cheapset",
    "Memory",
    "Storage",
    "Sensors",
    "Others",
  ];

  const loadTable = getHtmlId("load-details");
  loadTable.textContent = "";
  detailsArray.forEach((elem) => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");
    tr.classList.add("border-black-800");
    tr.innerHTML = `
      <td>
        <h2 class="text-lg font-semibold details-td-title">${elem}</h2>
      </td>
      <td><p id="${elem}"></p></td>
      `;
    loadTable.appendChild(tr);
  });

  loadDetailsData("Announced", mobile.releaseDate);
  loadDetailsData("Display", mobile.mainFeatures.displaySize);
  loadDetailsData("Cheapset", mobile.mainFeatures.chipSet);
  loadDetailsData("Memory", mobile.mainFeatures.memory);
  loadDetailsData("Storage", mobile.mainFeatures.storage);
  loadDetailsData("Sensors", sensors);
  document.getElementById("Others").innerHTML = `
    <p>Bluetooth: ${
      mobile?.others?.Bluetooth ? mobile?.others?.Bluetooth : err
    }</p>
    <p>GPS: ${mobile?.others?.GPS ? mobile?.others?.GPS : err}</p>
    <p>NFC: ${mobile?.others?.NFC ? mobile?.others?.NFC : err}</p>
    <p>Radio: ${mobile?.others?.Radio ? mobile?.others?.Radio : err}</p>
    <p>USB: ${mobile?.others?.USB ? mobile?.others?.USB : err}</p>
    <p>WLAN: ${mobile?.others?.WLAN ? mobile?.others?.WLAN : err}</p>
  `;
  addRemoveClass("detail-main-section", false);
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", () => {
    addRemoveClass("detail-main-section", true);
  });
};
// load data to details table
const loadDetailsData = (id, mobileData) => {
  const loadElement = document.getElementById(id);
  if (mobileData === undefined || mobileData === "" || mobileData === null) {
    loadElement.innerText = "No release date found";
  } else {
    loadElement.innerText = mobileData;
  }
};