const loadData = searchText => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data));
}

const displayData = phones => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerText = '';

  // Display Not Found Message If Search Result is Empty
  const notFound = document.getElementById('not-found-message');
  if (phones.length === 0) {
    notFound.classList.remove('d-none');
  }
  else {
    notFound.classList.add('d-none');
  }


  phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `

    <div class="card p-3">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
    </div>
  </div>

    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // stop spinner
  toggleSpinner(false);

}


// Search Button functionality
document.getElementById('search-btn').addEventListener('click', () => {
  // start spinner
  toggleSpinner(true);

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadData(searchText);
})


// Toggle Spinner visible and hide
const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');
  if (isLoading) {
    spinner.classList.remove('d-none');
  }
  else {
    spinner.classList.add('d-none');
  }
}



// loadData();