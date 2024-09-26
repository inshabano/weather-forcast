const city = document.getElementById('city')
const region = document.getElementById('region')
const country = document.getElementById('country')
const temp = document.getElementById('temp')
const humidity = document.getElementById('humidity')



const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('click',async () => {
    const value = searchInput.value;
    const response = await SearchtWeatherData(value)

    const city = response.location.name;
    const region = response.location.region;
    const country = response.location.country;
    const temp = response.current.temp_c;
    const humidity = response.current.humidity;
    updateDom({city, region, country, temp, humidity})         
})
searchInput.addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
        const value = searchInput.value;
        const response = await SearchtWeatherData(value)
    
        const city = response.location.name;
        const region = response.location.region;
        const country = response.location.country;
        const temp = response.current.temp_c;
        const humidity = response.current.humidity;
        updateDom({city, region, country, temp, humidity}) 
    }
});
function updateDom(data) {
    city.innerText = data.city;
    region.innerText = data.region;
    country.innerText = data.country;
    temp.innerText = data.temp;
    humidity.innerText = data.humidity;
}

async function SearchtWeatherData(search){
    const url = `http://api.weatherapi.com/v1/current.json?key=4bd7842037d74633898212141242509&q=${search}&aqi=yes`
    const response = await fetch(url)
    const result = await response.json()
    return result
  }

function requestCurrentLocation(){
    return new Promise((resolve,reject) => {
        window.navigator.geolocation.getCurrentPosition(
            ({coords}) => {
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            resolve({lat: latitude, long: longitude})
            },
            ({message}) => {
                reject(message)
            }
        )
    })
    
}

async function getWeatherDataByLocation(lat,long){
  const url = `http://api.weatherapi.com/v1/current.json?key=4bd7842037d74633898212141242509&q=${lat},${long}&aqi=yes`
  const response = await fetch(url)
  const result = await response.json()
  return result
}

function updateData(data){
    city.innerText = data.city;
    region.innerText = data.region;
    country.innerText = data.country;
    temp.innerText = data.temp;
    humidity.innerText = data.humidity;
}

window.addEventListener('load', () => {
    requestCurrentLocation()
            .then(({lat,long}) => getWeatherDataByLocation(lat,long))
            // console.log(`lat:${latitude}, long: ${longitude}`)
            .then(response => {
            console.log(response)
            const city = response.location.name;
            const region = response.location.region;
            const country = response.location.country;
            const temp = response.current.temp_c;
            const humidity = response.current.humidity;
             
            updateData({city, region, country, temp, humidity})
            
        })
            .catch(err => console.log(err))
})