document.getElementById('error-message').style.display = 'none';

const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(datas => displayPhones(datas.data))
        .catch(error => displayError(error))
}
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';

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
        <img class = p-5 text-center src="${phone.image}">
        <h5 class = p-3 text-center>${phone.phone_name}</h5>
        <h5 class = p-3 text-center>Brand: ${phone.brand}</h5>
        <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary ms-3">Details</button>
        </div>
        `;
        searchResult.appendChild(div);
        document.getElementById('error-message').style.display = 'none';


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
    <div class = shadow mb-2 my-2 p-2>
    <img src="${phones.image}" class="card-img-top alt="...">
  <div class="card-body">
    <h6 class="card-title">${phones.name}</h6>
    <p>Release Date: ${phones.releaseDate}</p>
    <h6 class = fw-bold>Main Features</h6>
<table>
<tr>
<td class = fw-bold>Chipset: </td>
<td>${phones.mainFeatures.chipSet}</td>
</tr>
<tr>
<td class = fw-bold>Display:</td>
<td>${phones.mainFeatures.displaySize}</td>
</tr>
<tr>
<td class = fw-bold>Memory:</td>
<td>${phones.mainFeatures.memory}</td>
</tr>
<tr>
<td class = fw-bold>storage:</td>
<td>${phones.mainFeatures.storage}</td>
</tr>
</table><br>

<h6 class = fw-bold>Other Features</h6>
<table>
<tr>
<td class = fw-bold>Bluetooth: </td>
<td>${phones.others.Bluetooth}</td>
</tr>
<tr>
<td class = fw-bold>GPS:</td>
<td>${phones.others.GPS}</td>
</tr>
<tr>
<td class = fw-bold>NFC:</td>
<td>${phones.others.NFC}</td>
</tr>
<tr>
<td class = fw-bold>Radio:</td>
<td>${phones.others.Radio}</td>
</tr>
<tr>
<td class = fw-bold>USB</td>
<td>${phones.others.USB}</td>
</tr>
<tr>
<td class = fw-bold>WLAN:</td>
<td>${phones.others.WLAN}</td>
</tr>
</table>
  </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    console.log(phones);
}
