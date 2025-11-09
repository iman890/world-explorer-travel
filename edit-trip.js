// GET FROM INDEX
const urlParams = new URLSearchParams(window.location.search);
const tripIndex = parseInt(urlParams.get('index'));

// GET THE DATA FROM LOCAL STORAGE
const trips = JSON.parse(localStorage.getItem("wishTrips") || "[]");
const trip = trips[tripIndex];

// PLAN TRIP FORM
if (trip) {
    document.getElementById('countryInfo').innerHTML = `
        <img src="${trip.flag}" width="80"><h2>${trip.name}</h2>
    `;
    
    document.getElementById('notes').value = trip.notes || '';
    document.getElementById('flightno').value = trip.flightno || '';
    document.getElementById('depart').value = trip.depart || '';
    document.getElementById('arrive').value = trip.arrive || '';
    document.getElementById('flightnotes').value = trip.flightnotes || '';
    document.getElementById('hotel').value = trip.hotel || '';
    document.getElementById('checkin').value = trip.checkin || '';
    document.getElementById('checkout').value = trip.checkout || '';
    document.getElementById('days').value = trip.days || '';
}

// Function to validate form
function validateForm() {
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
        const value = document.getElementById(field).value.trim();
        if (!value) {
            missingFields.push(label);
        }
    }

    // Check if days is calculated (requires both checkin and checkout)
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const days = document.getElementById('days').value;
    if (checkin && checkout && !days) {
        missingFields.push('Total Days (please check your dates)');
    }

    return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
    };
}

// Function to show popup
function showPopup(popupId, message = '') {
    const popup = document.getElementById(popupId);
    if (message && popupId === 'failurePopup') {
        document.getElementById('failureMessage').innerHTML = message;
    }
    popup.style.display = 'block';
}

// Function to close popup
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
}

// Close popup when clicking outside
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

// FORM SUBMIT - Update trip
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm();
    
    if (!validation.isValid) {
        // Show failure popup with missing fields
        let message = 'Please fill in all required fields:<br><br>';
        message += '<ul>';
        validation.missingFields.forEach(field => {
            message += `<li>${field}</li>`;
        });
        message += '</ul>';
        showPopup('failurePopup', message);
        return;
    }
    
    // UPDATE DATA TRIP
    trips[tripIndex] = {
        ...trip, // IT WILL KEEP THE PREVIOUS DATA
        notes: document.getElementById('notes').value,
        flightno: document.getElementById('flightno').value,
        depart: document.getElementById('depart').value,
        arrive: document.getElementById('arrive').value,
        flightnotes: document.getElementById('flightnotes').value,
        hotel: document.getElementById('hotel').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        days: document.getElementById('days').value
    };
    
    // SAVE AT LOCAL STORAGE
    localStorage.setItem("wishTrips", JSON.stringify(trips));
    

    showPopup('successPopup');
    
    setTimeout(() => {
        window.location.href = "upcoming-trips.html";
    }, 2000);
});


document.getElementById('checkin').addEventListener('change', calcDays);
document.getElementById('checkout').addEventListener('change', calcDays);

function calcDays() {
    let ci = document.getElementById('checkin').value;
    let co = document.getElementById('checkout').value;
    if (ci && co) {
        let d1 = new Date(ci), d2 = new Date(co);
        let days = Math.ceil((d2 - d1) / 86400000);
        document.getElementById('days').value = days > 0 ? days : '';
    }
}