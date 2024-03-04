// const limit = 8;
// export async function getCities(city: string, page:number) {
//   if (!city) {
//     const cities = await fetch(`http://127.0.0.1:4000/cities?page=${page}&limit=${limit}`);
//     return cities.json();
//   } else {
//     const cities = await fetch(`http://127.0.0.1:4000/cities/${city}?page=${page}&limit=${limit}`)
//     return cities.json();
//   }
// }