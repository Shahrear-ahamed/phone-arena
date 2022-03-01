const loadPhoneDataSearches = (searchPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.slice(0, 20)));
};
const loadOneMobile = (modelNumber) => {
  const url = `https://openapi.programming-hero.com/api/phone/${modelNumber}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => mobileDetails(data.data));
};

const loadSearch = () => {
  document.getElementById("phone-result").textContent = "";
  const searchValue = document.getElementById("search-phone");
  const searchResult = document.getElementById("search-result");
  searchResult.innerText = searchValue.value;
  loadPhoneDataSearches(searchValue.value);
  searchValue.value = "";
document.getElementById("detail-main-section").classList.add("hidden");
};

const showData = (phones) => {
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

// load details menual seciton are here
/* const mobileDetails = (mobile) => {
  console.log(mobile);
  // sensor details
  const [face, acce, gyro, proxi, comp, baro] = mobile.mainFeatures.sensors;
  // other details
  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = mobile.others;
  document.getElementById("model-title").innerText = `${mobile.brand} ${mobile.name}`;
  document.getElementById("details-img").src =`${mobile.image}`;
  document.getElementById("brand-title").innerText = `${mobile.brand}`;
  document.getElementById("announced").innerText = `${mobile.releaseDate}`;
  document.getElementById("display").innerText = `${mobile.mainFeatures.displaySize}`;
  document.getElementById("cheapset").innerText = `${mobile.mainFeatures.chipSet}`;
  document.getElementById("memory").innerText = `${mobile.mainFeatures.memory}`;
  document.getElementById("storage").innerText = `${mobile.mainFeatures.storage}`;
  document.getElementById("sensors").innerText = `${face}, ${acce}, ${gyro}, ${proxi}, ${comp}, ${baro}`;
  document.getElementById("others").innerHTML = `
            <p>Blutooth: ${Bluetooth}</p> 
            <p>GPS: ${GPS}</p> 
            <p>NFC: ${NFC}</p> 
            <p>Radio: ${Radio}</p> 
            <p>USB: ${USB}</p> 
            <p>WLAN: ${WLAN}</p>`;
document.getElementById("detail-main-section").classList.remove("hidden");
}; */


// load details auto seciton are here
const mobileDetails = (mobile) => {
  console.log(mobile);
  // sensor details
  const [face, acce, gyro, proxi, comp, baro] = mobile.mainFeatures.sensors;
  // other details
  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = mobile.others;
  const detailsArray =["Announced", "Display", "Cheapset", "Storage", "Sensors", "Others"]
  const loadTable = document.getElementById("load-details");
  detailsArray.forEach(elem => {
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
  document.getElementById("detail-main-section").classList.remove("hidden");
};