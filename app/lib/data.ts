export async function getCities(city: string) {
  if (!city) {
    const cities = await fetch("http://127.0.0.1:4000/cities");
    return cities.json();
  } else {
    const cities = await fetch(`http://127.0.0.1:4000/cities/${city}`)
    return cities.json();
  }
}