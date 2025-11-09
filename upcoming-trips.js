const trips = JSON.parse(localStorage.getItem("wishTrips") || "[]");
const el = document.getElementById('listTrips');

el.innerHTML = "<h1>Upcoming Trips</h1>";

if (!trips.length) {
  el.innerHTML += "<div>No trip plan yet.</div>";
} else {
  trips.forEach((t, index) => {
    const formatDateTime = (dateTimeStr) => {
      if (!dateTimeStr) return 'N/A';
      const date = new Date(dateTimeStr);
      return date.toLocaleString('en-MY', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };
    
    const formatDate = (dateStr) => {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-MY', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };

    el.innerHTML += `
      <div class="trip-card" style="display:inline-block;border:3px solid #3e3434ff;border-radius:16px;padding:20px 27px;margin:15px;max-width:500px;vertical-align:top;background:rgba(255,255,255,0.95);">
        <!-- Country Info -->
        <div style="text-align:center;margin-bottom:20px;padding-bottom:15px;border-bottom:2px solid #e0e0e0;">
          <img src="${t.flag}" width="60" style="margin-bottom:10px;"><br>
          <b style="font-size:1.3em;color:#333;">${t.name}</b>
        </div>
        
        <!-- Notes Section -->
        ${t.notes ? `
        <div style="margin-bottom:15px;">
          <b style="color:#667eea;">Notes:</b>
          <div style="margin-top:5px;padding:10px;background:#f5f5f5;border-radius:5px;color:#555;">
            ${t.notes}
          </div>
        </div>
        ` : ''}
        
        <!-- Flight Details Section -->
        <div style="margin-bottom:15px;padding:15px;background:#f9f9f9;border-radius:8px;border-left:4px solid #667eea;">
          <b style="color:#667eea;font-size:1.1em;display:block;margin-bottom:10px;">✈️ Flight Details</b>
          <div style="margin:5px 0;"><b>Flight No:</b> ${t.flightno || 'N/A'}</div>
          <div style="margin:5px 0;"><b>Depart:</b> ${formatDateTime(t.depart)}</div>
          <div style="margin:5px 0;"><b>Arrive:</b> ${formatDateTime(t.arrive)}</div>
          ${t.flightnotes ? `<div style="margin:5px 0;"><b>Flight Notes:</b> ${t.flightnotes}</div>` : ''}
        </div>
        
        <!-- Hotel & Lodging Section -->
        <div style="margin-bottom:15px;padding:15px;background:#f9f9f9;border-radius:8px;border-left:4px solid #48bb78;">
          <b style="color:#48bb78;font-size:1.1em;display:block;margin-bottom:10px;">🏨 Hotel & Lodging</b>
          <div style="margin:5px 0;"><b>Hotel Location:</b> ${t.hotel || 'N/A'}</div>
          <div style="margin:5px 0;"><b>Check-in:</b> ${formatDate(t.checkin)}</div>
          <div style="margin:5px 0;"><b>Check-out:</b> ${formatDate(t.checkout)}</div>
          <div style="margin:5px 0;"><b>Total Days:</b> ${t.days || 'N/A'} ${t.days ? 'day(s)' : ''}</div>
        </div>
        
        <!-- Action Buttons -->
        <div style="margin-top:15px;text-align:center;padding-top:15px;border-top:2px solid #e0e0e0;">
          <button onclick="editTrip(${index})" style="background:#667eea;color:white;border:none;border-radius:5px;padding:8px 20px;margin:2px;cursor:pointer;font-size:14px;">Edit</button>
          <button onclick="deleteTrip(${index})" style="background:#e53e3e;color:white;border:none;border-radius:5px;padding:8px 20px;margin:2px;cursor:pointer;font-size:14px;">Delete</button>
        </div>
      </div>
    `;
  });
}

// DELETE
function deleteTrip(index) {
  if (confirm("Are you sure you want to delete this trip?")) {
    const trips = JSON.parse(localStorage.getItem("wishTrips") || "[]");
    trips.splice(index, 1); 
    localStorage.setItem("wishTrips", JSON.stringify(trips));
    location.reload(); 
  }
}

// EDIT PAGE 
function editTrip(index) {
  window.location.href = `edit-trip.html?index=${index}`;
}