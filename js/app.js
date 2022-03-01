const loadPhoneDataSearches = (searchPhone, slice) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.slice(0, slice)));
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

const loadSearch = () => {
  document.getElementById("phone-result").textContent = "";
  const searchValue = document.getElementById("search-phone");
  const searchResult = document.getElementById("search-result");
  searchResult.innerText = searchValue.value;
  loadPhoneDataSearches(searchValue.value, 20);
  searchValue.value = "";
  document.getElementById("detail-main-section").classList.add("hidden");
};
const errorTitle = document.getElementById("error-title");
const errorMessage = document.getElementById("error-msg");

const showData = (phones) => {
  // error handling
  if (phones.length === 0) {
    errorTitle.classList.remove("hidden");
    errorMessage.classList.remove("hidden");
  } else {
    errorTitle.classList.add("hidden");
    errorMessage.classList.add("hidden");
  }
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
  document.getElementById("result-title").classList.remove("hidden");
};

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

  const allFeatures = `
      <p>Blutooth: ${Bluetooth}</p>
      <p>GPS: ${GPS}</p>
      <p>NFC: ${NFC}</p>
      <p>Radio: ${Radio}</p>
      <p>USB: ${USB}</p>
      <p>WLAN: ${WLAN}</p>`;

  loadDetailsData("Others", allFeatures);

  document.getElementById("detail-main-section").classList.remove("hidden");
};

const loadDetailsData = (id, mobileData) => {
  const loadElement = document.getElementById(id);
  if (mobileData === undefined || mobileData === "" || mobileData === null) {
    loadElement.innerText = "No authorized data found";
  } else {
    if (id === "Others") {
      loadElement.innerHTML = mobileData;
    } else {
      loadElement.innerText = mobileData;
    }
  }
};
