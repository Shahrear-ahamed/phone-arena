// Phone Search
// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone

// Phone detail url:
// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
const loadPhoneDataSearches = (searchPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data));
};

const loadSearch = () => {
  const searchValue = document.getElementById("search-phone");
  loadPhoneDataSearches(searchValue.value);
  // searchValue.value ="";
};

const showData = (phones) => {
  phones.forEach((phone) => {
    console.log(phone);
  });
};
