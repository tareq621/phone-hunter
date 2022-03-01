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
}
const displayPhones = phones => {
    // show error message 
    if (phones.length === 0) {
        document.getElementById('error-message').classList.remove('d-none');
    }
    else {
        document.getElementById('error-message').classList.add('d-none');
    }
    // all phone search results
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const twentycard = phones.slice(0, 20);
    twentycard.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class = shadow rounded mb-2>
            <img class =w-75 ms-2 src="${phone.image}">
                <h5 class = text-center>${phone.phone_name}</h5>
                <h5 class = text-center>Brand: ${phone.brand}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary mx-auto w-25 ms-2 mb-2">Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    });
}
// phone search details
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
        .then(res => res.json())
        .then(datas => displayLoadphoneDetail(datas.data))
}

const displayLoadphoneDetail = phones => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add();
    div.innerHTML = `
            <div class= d-flex flex-column>
            <img class= w-50 mx-auto" src="${phones.image}" class="card-img-top alt="...">
            <div class="ms-2">
            <div>
        <table class="col-12 col-lg-12 d-flex flex-column">
              <tr>
                  <td class = fw-bold>${phones.name}</td>
              </tr>
              <tr>
                  <td class = fw-bold>${phones.brand}</td>
              </tr>
              <tr>
                  <td>${phones.releaseDate || "Releas date not found"}</td>
              </tr>
              <tr>
                  <td class=fw-bold>Main Feature</td>
              </tr>
              <tr>
                  <td class = fw-bold>Chipset: </td>
                  <td>${phones.mainFeatures.chipSet}</td>
              </tr>
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
                  <td class = fw-bold>Storage:</td>
                  <td>${phones.mainFeatures.storage}</td>
              </tr>
              <tr>
                  <td class = fw-bold>Sensors:</td>
                  <td>${phones.mainFeatures.sensors}</td>
              </tr>
            </table><br>

           <h6 class = fw-bold>Other Features</h6>
        <table>
            <tr>
                  <td class = fw-bold>Bluetooth:</td>
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
            </div>
    `;
    phoneDetails.appendChild(div);
}
