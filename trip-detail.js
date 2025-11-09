const country = new URLSearchParams(location.search).get('country');
fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(res => res.json()).then(([data])=>{
    document.getElementById('countryInfo').innerHTML = `
      <img src="${data.flags.png}" width="80"><h2>${data.name.common}</h2>
      <div><b>Location:</b> ${data.region}, ${data.subregion}</div>
    `;

  });


function validateForm(form) {
    const requiredFields = {
        flightno: 'Flight Number',
        depart: 'Departure Date & Time',
        arrive: 'Arrival Date & Time',
        hotel: 'Hotel Location',
        checkin: 'Check-in Date',
        checkout: 'Check-out Date'
    };

    const missingFields = [];
    
    for (const [field, label] of Object.entries(requiredFields)) {
        const value = form[field].value.trim();
        if (!value) {
            missingFields.push(label);
        }
    }


    if (form.checkin.value && form.checkout.value && !form.days.value) {
        missingFields.push('Total Days (please check your dates)');
    }

    return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
    };
}


function showPopup(popupId, message = '') {
    const popup = document.getElementById(popupId);
    if (message && popupId === 'failurePopup') {
        document.getElementById('failureMessage').innerHTML = message;
    }
    popup.style.display = 'block';
}


function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
}


window.onclick = function(event) {
    const successPopup = document.getElementById('successPopup');
    const failurePopup = document.getElementById('failurePopup');
    
    if (event.target === successPopup) {
        closePopup('successPopup');
    }
    if (event.target === failurePopup) {
        closePopup('failurePopup');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  
    const tripForm = document.getElementById('tripForm');
    if (tripForm) {
        tripForm.addEventListener('submit', function(e){
            e.preventDefault();

            const form = e.target;
            
  
            const validation = validateForm(form);
            
            if (!validation.isValid) {
       
                let message = 'Please fill in all required fields:<br><br>';
                message += '<ul>';
                validation.missingFields.forEach(field => {
                    message += `<li>${field}</li>`;
                });
                message += '</ul>';
                showPopup('failurePopup', message);
                return;
            }

   
            const obj = {
                country,
                flag: document.querySelector('#countryInfo img').src,
                name: document.querySelector('#countryInfo h2').innerText,
                notes: form.notes.value,
                flightno: form.flightno.value,
                depart: form.depart.value,
                arrive: form.arrive.value,
                flightnotes: form.flightnotes.value,
                hotel: form.hotel.value,
                checkin: form.checkin.value,
                checkout: form.checkout.value,
                days: form.days.value
            };
            
            // SAVE AT LOCAL STORAGE
            const arr = JSON.parse(localStorage.getItem("wishTrips")||"[]");
            arr.push(obj);
            localStorage.setItem("wishTrips", JSON.stringify(arr));
            
            showPopup('successPopup');
            
            setTimeout(() => {
                window.location.href = "upcoming-trips.html";
            }, 2000);
        });
    }

    const checkinInput = document.querySelector('input[name="checkin"]');
    const checkoutInput = document.querySelector('input[name="checkout"]');
    
    if (checkinInput) {
        checkinInput.addEventListener('change', calcDays);
    }
    if (checkoutInput) {
        checkoutInput.addEventListener('change', calcDays);
    }
});

function calcDays(){
    let ci = document.querySelector('input[name="checkin"]').value;
    let co = document.querySelector('input[name="checkout"]').value;
    if(ci && co){
        let d1= new Date(ci), d2= new Date(co);
        let days = Math.ceil((d2-d1)/86400000);
        document.querySelector('input[name="days"]').value = days>0?days:'';
    }
}