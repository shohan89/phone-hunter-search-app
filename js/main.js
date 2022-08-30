const loadData = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data, dataLimit));
}

const displayData = (phones, dataLimit) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerText = '';
  //display 10 search result only
  const showAll = document.getElementById('show-all');
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none');
  }
  else {
    showAll.classList.add('d-none');
  }
  

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
      <p class = "card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, sunt? Consequatur recusandae suscipit perspiciatis impedit quos, nostrum cupiditate aliquid nobis.</p>
      <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // stop spinner
  toggleSpinner(false);

}

//process search
const processSearch = (dataLimit) => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadData(searchText, dataLimit);
}

// Search Button functionality
document.getElementById('search-btn').addEventListener('click', () => {
  // start spinner
  toggleSpinner(true);

  processSearch(10);
})

// search button by pressing enter
document.getElementById('search-field').addEventListener('keypress', (e) => {
  if (e.key === 'Enter'){
    processSearch(10);
    
  }
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


// load show all data when button clicked
document.getElementById('btn-show-all').addEventListener('click', () => {

  processSearch();

})


// detail view 
const loadPhoneDetails = slug => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.data));
}


// loadData();