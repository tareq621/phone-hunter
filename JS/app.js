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
    if (twentycard === 0) {
        const errror = 'Info will provide soon';
        return errror;
    }
    else {
        twentycard.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class = shadow rounded mb-2>
                <img width=250px src="${phone.image}" class ='ms-3 mt-3 mb-3'>
                    <h5 class = text-center>${phone.phone_name}</h5>
                    <h5 class = text-center>Brand: ${phone.brand}</h5>
                <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary mx-auto w-25 ms-3 mb-2 fw-bold">More info</button>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
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
    div.innerHTML = `
    <div class="card mb-3 border-0" style="max-width: 500px max-height: 600px;">
    <div class="row g-0">
    <div class="col-md-4">
        <img width=400px src="${phones.image}" class="img-fluid rounded-start mt-4 ms-5" alt="...">
    </div>
    <div class="col-12 col-lg-6">
        <div class="card-body">
        <table class="table caption-top">     
        <tbody>
          <tr>
            <td class =fw-bold>Name:</td>
            <td>${phones.name}</td>
          </tr>
          <tr>
            <td class =fw-bold>Brand:</td>
            <td>${phones.brand}</td>
          </tr>
          <tr>
            <td class =fw-bold>Realease:</td>
            <td>${phones.releaseDate}</td>
          </tr>
          <tr>
            <td class =fw-bold>Display Size:</td>
            <td>${phones.mainFeatures.displaySize}</td>
          </tr>
          <tr>
            <td class =fw-bold>Memory:</td>
            <td>${phones.mainFeatures.memory}</td>
          </tr>
          <tr>
            <td class =fw-bold>Sensors:</td>
            <td>${phones.mainFeatures.sensors}</td>
          </tr>
          <tr>
            <td class =fw-bold>Storage:</td>
            <td>${phones.mainFeatures.storage}</td>
          </tr>
          <tr>
            <td class =fw-bold>Blutooth:</td>
            <td>${phones.others.Bluetooth}</td>
          </tr>
          <tr>
            <td class =fw-bold>GPS:</td>
            <td>${phones.others.GPS}</td>
          </tr>
          <tr>
            <td class =fw-bold>NFC:</td>
            <td>${phones.others.NFC}</td>
          </tr>
          <tr>
            <td class =fw-bold>Radio:</td>
            <td>${phones.others.Radio}</td>
          </tr>
          <tr>
            <td class =fw-bold>USB:</td>
            <td>${phones.others.USB}</td>
          </tr>
          <tr>
            <td class =fw-bold>WLAN:</td>
            <td>${phones.others.WLAN}</td>
          </tr>
        </tbody>
      </table>
        </div>
    </div>
</div>
</div>

    `;
    phoneDetails.appendChild(div);
}
