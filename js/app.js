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

const keypress = document.getElementById("search-phone");
keypress.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    loadSearch();
  }
});
// define globally accessible
const errorTitle = document.getElementById("error-title");
const errorMessage = document.getElementById("error-msg");
const result = document.getElementById("result-title");
const loadMoreDiv = document.getElementById("loadMore-div");
const loadMoreBtn = document.getElementById("loadMore-Btn");

const loadSearch = () => {
  document.getElementById("phone-result").textContent = "";
  const searchValue = document.getElementById("search-phone");
  const searchResult = document.getElementById("search-result");

  // error handling for empty input
  if (searchValue.value === "") {
    errorTitle.innerText = "Please enter brands name";
    errorTitle.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    result.classList.add("hidden");
    loadMoreDiv.classList.add("hidden");
  } else {
    errorTitle.classList.add("hidden");
    errorMessage.classList.add("hidden");
    result.classList.add("hidden");
    loadMoreDiv.classList.add("hidden");
    searchResult.innerText = searchValue.value;
    loadPhoneDataSearches(searchValue.value);
    searchValue.value = "";
    document.getElementById("detail-main-section").classList.add("hidden");
  }
};

const showData = (allPhones) => {
  let phones = allPhones.slice(0, 20);

  // error handling
  if (phones.length === 0) {
    errorTitle.innerText = "We're sorry, no phone found.";
    errorTitle.classList.remove("hidden");
    errorMessage.classList.remove("hidden");
    loadMoreDiv.classList.add("hidden");
  } else {
    errorTitle.classList.add("hidden");
    errorMessage.classList.add("hidden");
    loadMoreDiv.classList.remove("hidden");
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
      </div>
      `;
      phoneResult.appendChild(div);
    });
  };
  loadTwentyPhone(phones);
  document.getElementById("result-title").classList.remove("hidden");

  // add load more button function
  loadMoreBtn.addEventListener("click", () => {
    phones = allPhones.slice(20, allPhones.length);
    loadTwentyPhone(phones);
    loadMoreDiv.classList.add("hidden");
  });
};

// load detaiils from details button
const showDetails = (id) => {
  loadOneMobile(id);
};

// load details auto seciton are here
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
  const err = "no data found";
  const {
    Bluetooth = err,
    GPS = err,
    NFC = err,
    Radio = err,
    USB = err,
    WLAN = err,
  } = { ...mobile.others };

  const detailsArray = [
    "Announced",
    "Display",
    "Cheapset",
    "Memory",
    "Storage",
    "Sensors",
    "Others",
  ];

  const loadTable = document.getElementById("load-details");
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
      <p>Blutooth: ${Bluetooth}</p>
      <p>GPS: ${GPS}</p>
      <p>NFC: ${NFC}</p>
      <p>Radio: ${Radio}</p>
      <p>USB: ${USB}</p>
      <p>WLAN: ${WLAN}</p>
  `;
  document.getElementById("detail-main-section").classList.remove("hidden");
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", () => {
    document.getElementById("detail-main-section").classList.add("hidden");
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
