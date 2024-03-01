const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    
    

    //1. id initialize
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.textContent = ''; 

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is Show All ', isShowAll)
    // display only first 10 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    


    phones.forEach(phone => {
        // console.log(phone);

        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;

        // set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-outline btn-secondary">Show Details</button>
                        </div>
                    </div>
        `;

        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// Button Onclick
const handleShowDetail = async (id) =>{
    // console.log('Clicked Show Details',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // Load Data

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName =  document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img class="mt-4 mx-auto " src="${phone.image}" alt="" />
        
        <p class="mt-4"><span><b>Storage: </b></span>${phone?.mainFeatures?.storage}</p>
        <p class=""><span><b>Display Size </b></span>${phone?.mainFeatures?.displaySize}</p>
        <p class=""><span><b>ChipSet: </b></span>${phone?.mainFeatures?.chipSet}</p>
        <p class=""><span><b>Release Date: </b></span>${phone?.releaseDate}</p>
    `

    // show the model
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// handle search recap

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();