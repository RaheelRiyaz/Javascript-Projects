const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "92cd359028msh3ab9df791d17a7dp1b425bjsn9c0c81fc4634",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};
const getWeather = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
getWeather()
