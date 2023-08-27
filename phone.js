
const loadPhone = async (searchText, isShowAll)=>{
  const res = await  window.fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll)
}

// loadPhone();


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById(`phone-container`);
    phoneContainer.innerHTML = ``;

    const showAllContainer = document.getElementById(`show-all-container`);
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove(`hidden`);
    }else{
        showAllContainer.classList.add(`hidden`);
    }

   if(!isShowAll){
    phones = phones.slice(0, 12);
   }

    phones.forEach(phone => {
        const phoneCard = document.createElement(`div`);
        phoneCard.className = `card w-96 bg-zinc-200 shadow-sm pt-5`;

        phoneCard.innerHTML =` <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title"> ${phone.phone_name} </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>`;
        phoneContainer.appendChild(phoneCard)
    });
    showSpinner(false);
}



const handleShowDetails = async (id) => {
  const res = await window.fetch(`https://openapi.programming-hero.com/api/phones/${id}`);
  const data = await res.json();
  console.log(data)
}





const handleSearch = (isShowAll) => {
  showSpinner(true);
    const searchField = document.getElementById(`search-field`);
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}


const showSpinner = (bool) =>{
  const spinner = document.getElementById(`spinner-div`);
  if(bool){
    spinner.classList.remove(`hidden`);
  }else{
    spinner.classList.add(`hidden`);
  }
}


const handleShowAll = () => {
  handleSearch(true);
}