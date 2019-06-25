// we will use fetch api (not available in node.js)
//this js file is 'client side'

function getWeather(address) {
  fetch('http://localhost:3000/weather?address='+address).then((response)=>{
    let infoHtml = document.getElementById('weatherInfo')
    response.json().then((data) => {
      if (data.error) {
        infoHtml.innerHTML = data.error;
        return;
      } else {
        infoHtml.innerHTML = `The weather in ${data['Search Provided']} is: ${data.forecast}`
      }
    })
  });
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let location = search.value;
  let data = getWeather(location);
  search.value = '';
})
