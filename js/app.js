// Phone detail url:
// URL Format: 

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
const loadPhoneDataSearches = (searchPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.slice(0, 20)));
};
const loadOneMobile=(modelNumber) => {
    const url = `https://openapi.programming-hero.com/api/phone/${modelNumber}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>mobileDetails(data));
}

const loadSearch = () => {
  document.getElementById("phone-result").textContent = "";
  const searchValue = document.getElementById("search-phone");
  const searchResult= document.getElementById("search-result");
  searchResult.innerText=searchValue.value;
  loadPhoneDataSearches(searchValue.value);
  searchValue.value = "";
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

const showDetails =(id)=> {
    loadOneMobile(id);
}
const mobileDetails =(mobile)=> {
    console.log(mobile);
}