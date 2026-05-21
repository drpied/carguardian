exports.handler = async function(event) {
  const params = event.queryStringParameters || {};
  const {
    latitude = "46.6565",
    longitude = "-71.9228",
    radius = "100",
    make = "Ford",
    condition = "",
    price_max = "",
    rows = "20",
    start = "0",
    sort_by = "first_seen_at_mc",
    sort_order = "desc"
  } = params;

  const apiKey = process.env.MARKETCHECK_API_KEY;

  let url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${apiKey}&latitude=${latitude}&longitude=${longitude}&radius=${radius}&country=ca&make=${make}&rows=${rows}&start=${start}&sort_by=${sort_by}&sort_order=${sort_order}`;

  if (condition) url += `&car_type=${condition}`;
  if (price_max) url += `&price_max=${price_max}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
