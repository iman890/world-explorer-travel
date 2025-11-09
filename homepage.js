const motivationalMessages = [
    "Sometimes you need to go far away but not to escape life, but to find yourself again.",
    "Travel not to escape life, but to let life find you again.",
    "Don't listen to what they say. Go see!",
    "It's okay to pause for a while because rest is also part of the journey",
    "Even the darkest night will end, and the sun will rise again",
    "Wherever you go, go with all your heart."
];


document.addEventListener('DOMContentLoaded', function() {
    showMotivationPopup();
});

function showMotivationPopup() {
    const popup = document.getElementById('motivationPopup');
    const motivationText = document.getElementById('motivationText');
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    motivationText.textContent = randomMessage;
    
    popup.style.display = 'block';
}


document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('motivationPopup').style.display = 'none';
});


function searchCountry() {
    const countryInput = document.getElementById('countryInput').value.trim();
    
    if (!countryInput) {
        alert('Please enter a country name!');
        return;
    }
    

    window.location.href = `pages/country-detail.html?country=${encodeURIComponent(countryInput)}`;
}


function quickSearch(countryName) {
    const apiCountryNames = {
        'malaysia': 'malaysia',
        'japan': 'japan', 
        'france': 'france',
        'usa': 'united states',
        'singapore': 'singapore',
        'thailand': 'thailand'
    };
    
    const apiName = apiCountryNames[countryName] || countryName;
    window.location.href = `pages/country-detail.html?country=${encodeURIComponent(apiName)}`;
}


document.getElementById('countryInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCountry();
    }
});