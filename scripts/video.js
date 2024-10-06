// console.log('Video.js added')

// Conver Second 
function getTimeString(time){
    const hour= parseInt(time / 3600);

    let remainingSecond = time % 3600;

    const minute = parseInt(remainingSecond / 60);

    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second`;
}


// create loadCategories 
const loadCategories =()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => (error, console.log(error)))
}

// Create Load Videos
const loadVideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data)=> displayVideos(data.videos))
    .catch((error) =>(error, console.error(error)))
}

// Load Categories Videos 
const loadCategoriesVidoes = (id) => {
    //  alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => (error, console.error(error)))
}

// Display Categories 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {

       const buttonContainer = document.createElement('div');
       buttonContainer.innerHTML = `
         <button class="btn" onclick="loadCategoriesVidoes(${item.category_id})">${item.category}</button>
       `;

        categoryContainer.append(buttonContainer);

    });
}


// Display Videos 
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML =  `
            <div class="flex justify-center">
                <diV>     
                    <img src="assets/Icon.png" alt="">
                    <h2>Oops!! Sorry, There is no content here</h2>
                </div>
            </div>
        `;
        return;
    } else{
        videoContainer.classList.add("grid")
    }

    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = "card card-compact bg-base-100 w-96 shadow-xl"
        card.innerHTML = `
            <figure class="h-[250px] relative">
                <img
                class="h-full w-full object-cover" 
                src="${video.thumbnail}"
                alt="Shoes" />

                ${video.others.posted_date?.length == 0 ? "" : `
                        <span class="absolute text-xs right-2 bottom-2 bg-black text-white p-1 rounded">${ getTimeString(video.others.posted_date)}</span>
                    `}
            </figure>
            <div class="flex gap-2 px-0 py-2">
                <div>
                    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
                </div>
                <div>
                    <h2>${video.title} </h2>
                    <div class="flex items-center gap-2"> 
                        <p>${video.authors[0].profile_name} </p>
                        ${
                            video.authors[0].verified == true ? `<img src="https://img.icons8.com/?size=32&id=2AuMnRFVB9b1&format=png" />` : '' 
                        }
                    </div>
                   
                    <p> </p>
                </div>
            </div>
        `
        videoContainer.append(card);
    })
}

loadCategories();
loadVideos();

