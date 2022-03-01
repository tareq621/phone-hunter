document.getElementById('error-message').style.display = 'none';
const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(datas => displayPhones(datas.data))
        .catch(error => displayError(error))
}
const displayError = (error) => {
    document.getElementById('error-message').style.display = 'block';

}

const displayPhones = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    document.getElementById('error-message').style.display = 'none';
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class = shadow rounded mb-2>
        <img class = p-5 src="${phone.image}">
        <h5 class = p-3>${phone.phone_name}</h5>
        <h5 class = p-3>Brand: ${phone.brand}</h5>
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
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class = shadow rounded mb-2 my-2 p-2>
    <img src="${phones.image}" class="card-img-top alt="...">
  <div class="card-body">
    <h5 class="card-title">${phones.name}</h5>
    <h6>${phones.releaseDate}</h6>
    
  </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    console.log(phones);
}
