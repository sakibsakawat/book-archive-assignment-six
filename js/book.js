const searchInput = document.getElementById('search-value')

const search = document.getElementById('search-btn')

const bookContainer = document.getElementById('book-container')

const errorHandling =  document.getElementById('error-handle')

const totalResult = document.getElementById('total-result')



search.addEventListener('click', function(){
   const searchText = searchInput.value;
   if(search === "") {
       errorHandling.innerText="Search Field is Empty";
       
   }
// clearing DOM after new search----------------------------------
   bookContainer.innerHTML = " "; 
   totalResult.innerText = "";
   searchInput.value = "";
//   fetch section-------------------------------------------------
   const url = `http://openlibrary.org/search.json?q=${searchText}`;
   fetch(url)
   .then (res => res.json())
   .then (data => {
        if(data.status === 404){
           errorHandling.innerText = " No Data Found"
        } else{
           errorHandling.innerText = "";
        }
       
       data.docs.forEach(item => {
          totalResult.innerText=`Total Result Found (${data.q}): ${data.numFound}`
          const div = document.createElement('div') 
          div.classList.add('col-md-4')
          div.classList.add('mb-4')
          div.innerHTML=`
            <!-- image section -->
            <div class="rounded overflow-hidden h-100  border p-5 ">
            <img
               src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"
               alt="Image Not Found" class="img-fluid align-items-center" />
               <div>
                    <h4><span class="text-success fw-bold">Book Name:</span> ${item.title}</h4>

                    <h5><span class="text-success fw-bold">Author Name:</span> ${item.author_name}</h5>

                    <p><span class="text-success text-wrap fw-bold">Publish Year:</span> ${item.publish_year} </p>

                    <p><span class="text-success text-wrap fw-bold">Publisher:</span> ${item.publisher} </p>

               </div>
            </div>
            <!-- body section -->
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
         
         
         
            
            </div>
          `;
          bookContainer.appendChild(div)
       })
    
   })
    
})




















// const displayBooks = docs =>{
//     const container = document.getElementById('container-div');
//     docs.forEach(doc =>{
//         const div = document.createElement('div');
//         div.innerHTML = `
//          <h1>${docs.title}</h1>
//         `;
//         container.appendChild(div);
//     })
// }