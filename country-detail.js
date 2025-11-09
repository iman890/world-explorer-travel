
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country'); 


const content = document.getElementById('country-detail-content');
const heroSection = document.getElementById('main-section');
const countryNameElement = document.getElementById('country-name');

(async function() {

  if (!countryName) {
    content.innerHTML = '<div class="error-message"><h2>No country specified</h2><p>Please search for a country from the home page.</p></div>';
    return;
  }

  try {
    // FETCH DATA
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);
    
    if (!response.ok) {
      throw new Error(`Country not found: ${countryName}`);
    }
    
    const result = await response.json();
    
    if (!result || result.length === 0) {
      throw new Error(`Country not found: ${countryName}`);
    }
    
    const data = result[0];


    const flag = data.flags?.png;
    const officialName = data.name?.official;
    const commonName = data.name?.common;
    const region = data.region;
    const subregion = data.subregion;
    const timezone = (data.timezones || []).join(", ");
    const languages = data.languages ? Object.values(data.languages).join(", ") : "N/A";
    const currencies = data.currencies ? Object.values(data.currencies).map(c => `${c.name} (${c.symbol || '-'})`).join(', ') : "N/A";
    const population = data.population?.toLocaleString();
    const capital = data.capital ? data.capital[0] : "N/A";
    const area = data.area ? `${data.area.toLocaleString()} km²` : "N/A";
    const latlng = data.latlng ? data.latlng.join(", ") : "N/A";
    const mapUrl = data.maps?.googleMaps;
    const coatOfArms = data.coatOfArms?.png;

    heroSection.style.backgroundImage = `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`;
    countryNameElement.textContent = commonName;

    content.innerHTML = `
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon-box">
            <img src="${flag}" class="flag-icon" alt="flag">
          </div>
          <h3 class="info-title">Flag</h3>
          <p class="info-description">${commonName}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">👤</span>
          </div>
          <h3 class="info-title">Population</h3>
          <p class="info-description">${population}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">🌍</span>
          </div>
          <h3 class="info-title">Area</h3>
          <p class="info-description">${area}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">🏛️</span>
          </div>
          <h3 class="info-title">Capital</h3>
          <p class="info-description">${capital}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">💬</span>
          </div>
          <h3 class="info-title">Languages</h3>
          <p class="info-description">${languages}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">💰</span>
          </div>
          <h3 class="info-title">Currency</h3>
          <p class="info-description">${currencies}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">🌎</span>
          </div>
          <h3 class="info-title">Region</h3>
          <p class="info-description">${region}, ${subregion}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">🕐</span>
          </div>
          <h3 class="info-title">Timezone</h3>
          <p class="info-description">${timezone}</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">📍</span>
          </div>
          <h3 class="info-title">Location</h3>
          <p class="info-description">${latlng} ${mapUrl ? `<br><a href="${mapUrl}" target="_blank">View on Maps</a>` : ''}</p>
        </div>
      </div>
      
      ${coatOfArms ? `
        <div class="info-card">
          <div class="info-icon-box">
            <span class="icon-symbol">🛡️</span>
          </div>
          <h3 class="info-title">Coat of Arms</h3>
          <img src="${coatOfArms}" alt="Coat of Arms" class="coat-of-arms-img">
        </div>
      ` : ""}
    `;
  } catch (error) {

    // HANDL ERROR
    content.innerHTML = `
      <div class="error-message">
        <h2>⚠️ Error Loading Country Information</h2>
        <p>${error.message}</p>
        <p>Please try searching for a different country name or check your internet connection.</p>
        <button onclick="window.history.back()" class="back-button">← Go Back</button>
      </div>
    `;
    console.error('Error fetching country data:', error);
  }
})();