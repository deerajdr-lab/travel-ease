// Run this as soon as the page loads
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const navContainer = document.querySelector('nav');

    if (isLoggedIn === 'true') {
        // Change the Login button to a Logout button + User Email
        navContainer.innerHTML = `
            <span style="color: white; margin-right: 15px;">Welcome, ${userEmail}</span>
            <button onclick="logout()" style="background: #ff4d4d; padding: 5px 15px; border-radius: 20px; border:none; color:white; cursor:pointer;">Logout</button>
        `;
    }
};

function logout() {
    localStorage.clear(); // Clear the login data
    window.location.reload(); // Refresh the page to show the Login button again
}
// 1. DATA: Our mini-database
// This acts as your project's local database
const travelData = {
    "delhi": {
        places: [
            { name: "Red Fort", img: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400", desc: "Historic fort from the Mughal era." },
            { name: "Qutub Minar", img: "https://images.unsplash.com/photo-1523544545175-92e04b96d26b?w=400", desc: "World's tallest brick minaret." }
        ],
        hotels: [
            { name: "The Taj Palace", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", price: "₹12,000/night" },
            { name: "Radisson Blu", img: "https://images.unsplash.com/photo-1551882547-ff43c63faf76?w=400", price: "₹6,500/night" }
        ]
    },
    "paris": {
        places: [
            { name: "Eiffel Tower", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400", desc: "The iconic symbol of France." },
            { name: "Louvre Museum", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400", desc: "The world's largest art museum." }
        ],
        hotels: [
            { name: "Hotel Ritz", img: "https://images.unsplash.com/photo-1551882547-ff43c63faf76?w=400", price: "€450/night" },
            { name: "Paris Marriot", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400", price: "€280/night" }
        ]
    },
    "mumbai": {
        places: [
            { name: "Gateway of India", img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400", desc: "Iconic arch monument built during the 20th century." },
            { name: "Marine Drive", img: "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=400", desc: "A scenic 3-kilometre-long promenade along the coast." }
        ],
        hotels: [
            { name: "The Taj Mahal Palace", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400", price: "₹15,000/night" },
            { name: "Trident Nariman Point", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400", price: "₹9,000/night" }
        ]
    },
    "goa": {
        places: [
            { name: "Calangute Beach", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400", desc: "The largest and most famous beach in North Goa." },
            { name: "Basilica of Bom Jesus", img: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?w=400", desc: "UNESCO World Heritage site holding the mortal remains of St. Francis Xavier." }
        ],
        hotels: [
            { name: "Taj Exotica Resort", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400", price: "₹11,500/night" },
            { name: "Goa Marriott Resort", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400", price: "₹8,000/night" }
        ]
    }
};

// 2. SEARCH LOGIC
function searchDestinations() {
    const city = document.getElementById('cityInput').value.toLowerCase().trim();
    const placesGrid = document.getElementById('placesGrid');
    const hotelsGrid = document.getElementById('hotelsGrid');

    placesGrid.innerHTML = '';
    hotelsGrid.innerHTML = '';

    if (travelData[city]) {
        travelData[city].places.forEach(item => {
            placesGrid.innerHTML += createCard(item.name, item.img, item.desc);
        });

        travelData[city].hotels.forEach(hotel => {
            hotelsGrid.innerHTML += createCard(hotel.name, hotel.img, `Price: ${hotel.price}`, true);
        });
    } else {
        alert("Please try searching for 'Delhi' or 'Paris'.");
    }
}

// 3. CARD GENERATOR (Crucial Fix Here)
function createCard(title, img, detail, isHotel = false) {
    let buttonHTML = '';
    
    // If it's a hotel, we add the button with the openBooking function
    if (isHotel) {
        buttonHTML = `<button onclick="openBooking()" style="width:100%; border-radius:5px; margin-top:10px; padding:10px; background-color:#28a745;">Book Now</button>`;
    }

    return `
        <div class="card">
            <img src="${img}" alt="${title}">
            <div class="card-info">
                <h3>${title}</h3>
                <p>${detail}</p>
                ${buttonHTML}
            </div>
        </div>
    `;
}

// 4. BOOKING MODAL LOGIC
function openBooking() {
    console.log("Opening modal..."); // Helps us debug
    document.getElementById('bookingModal').style.display = 'block';
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Close when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Booking Successful! Check your email for details.");
    closeBooking();
});