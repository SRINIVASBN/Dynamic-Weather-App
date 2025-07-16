const apikey = "403326fdd62364ad6706aac4cd1eddb9"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

card.classList.add("before-search");

async function checkWeather(city) {
    // Reset card and background before every search
    document.querySelector(".weather").style.display = "none"; // Hide weather details
    document.querySelector(".error").style.display = "none";   // Hide error message
    card.classList.remove("error", "after-search"); // Reset card class state
    card.classList.add("before-search"); // Ensure card is in 'before-search' state

    // Reset background to default before each search
    document.body.style.backgroundImage = "url('images/default-background.jpg')"; // Default background

    // Check if the input is empty
    if (!city) {
        searchBox.placeholder = "Please enter a city name!";
        return;
    }

    try {
        // Make API request to get weather data
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);

        // If response is not ok (invalid city)
        if (!response.ok) {
            throw new Error("Invalid city");
        }

        // If the city is valid, display the weather information
        const data = await response.json();

        // Update weather details
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon and background
        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.body.style.backgroundImage = "url('images/clouds-b.png')";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "images/rain.png";
            document.body.style.backgroundImage = "url('images/rain-b.jpg')";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "images/clear.png";
            document.body.style.backgroundImage = "url('images/clear-b.jpg')";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            document.body.style.backgroundImage = "url('images/drizzle-b.png')";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "images/mist.png";
            document.body.style.backgroundImage = "url('images/mist-b.jpg')";
        }

        // Show weather details and hide error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Update card state to 'after-search'
        card.classList.remove("before-search", "error");
        card.classList.add("after-search");
    } catch (error) {
        // Show error state and update the card
        document.querySelector(".weather").style.display = "none"; // Hide weather details
        document.querySelector(".error").style.display = "block";  // Show error message
        weatherIcon.src = "images/error.jpg";
        document.body.style.backgroundImage = "url('images/error-b.png')"; // Error background
        card.classList.remove("before-search", "after-search");
        card.classList.add("error");

        searchBox.value = "";
        searchBox.placeholder = "Invalid city. Try again ...";
    } finally {
        // Ensure the card remains visible
        card.style.display = "block";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    checkWeather(city);
});

