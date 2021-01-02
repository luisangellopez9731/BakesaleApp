const apiHost = 'https://bakesaleforgood.com';

export async function fetchInitialDeals() {
  try {
    const response = await fetch(`${apiHost}/api/deals`);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return new Error(err);
  }
}

export async function fetchDealDetail(dealId) {
  try {
    const response = await fetch(`${apiHost}/api/deals/${dealId}`);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return new Error(err);
  }
}


export async function fetchDealsSearchResults(searchTerm) {
  try {
    const response = await fetch(`${apiHost}/api/deals?searchTerm=${searchTerm}`);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return new Error(err);
  }
}