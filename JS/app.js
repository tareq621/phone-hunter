const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(datas => displayPhones(datas.data))
}

const displayPhones = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class = shadow rounded mb-2>
        <img class = p-3 src="${phone.image}">
        <h5 class = p-3>${phone.phone_name}</h5>
        <h5 class = p-3>${phone.brand}</h5>
        <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary ms-3 ">Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    });
}
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(datas => displayLoadphoneDetail(datas.data))
}
const displayLoadphoneDetail = phones => {
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div">
    <img src="${phones.image}" class="card-img-top alt="...">
  <div class="card-body">
    <h5 class="card-title">${phones.name}</h5>
    
  </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    console.log(phones);
}
