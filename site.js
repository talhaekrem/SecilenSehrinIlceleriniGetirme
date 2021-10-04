//il ve ilçe selectlerinin tanımlanması
const citiesSelect = document.querySelector('#cities');
const districtsSelect = document.querySelector('#districts');

//sayfadaki her şey yüklendikten sonra illeri getirecek metodun çağırılması
$(function () {
    //illeri getir
    GetCities();
});

//şehirleri getir. sayfa yüklendikten sonra 1 kere çalışır
GetCities = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Turkey Cities and Districts.json', true);
    xhr.onload = function () {
        if (this.status === 200) {
            let file = JSON.parse(this.responseText).cities;
            let html = "";
            file.forEach(c => {
                html += `
                <option value="${c.Id}">${c.name}</option>
                `;
            });
            citiesSelect.innerHTML = html;
        }
    }
    xhr.send();
}

//ilçeleri getir. il seçtiğimizde çalışır. parametre olarak seçilen ilin Idsi alınır. 
GetDistricts = (cityNumberPlate) => {
    var xhr = new XMLHttpRequest();
    xhr.open("Get", "Turkey Cities and Districts.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let file = JSON.parse(this.responseText).districts.filter(d => d.cityId == cityNumberPlate);
            let html = "";
            file.forEach(e => {
                html += `
                <option>${e.name}</option>
                `;
            });
            districtsSelect.innerHTML = html;
            districtsSelect.removeAttribute("disabled");
        }
    }
    xhr.send();
}

//il seçildiğinde ilçe getirme işleminin başlatılması
citiesSelect.addEventListener("change", function () {
    GetDistricts(this.value);
});

//selectlerde seçilen il ve ilçe verilerine nasıl ulaşırızın örneği.(opsiyonel)
districtsSelect.addEventListener("change", function () {
    document.querySelector('#location').innerHTML = citiesSelect.children[citiesSelect.value-1].textContent+ " "+ this.value;
});