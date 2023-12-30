// const themeChanger = document.querySelector(".light-dark-mode");
// const themeName = document.querySelector("[data-modeDescription]");
// const themeDark = document.querySelector("[data-darkIcon ]");
// const themeLight = document.querySelector("[data-light]");
// const swapTheme = document.body;


// // set Default theme 
// swapTheme.classList.add("dark");


// themeName.innerText ="Light";
// themeLight.classList.add("active");

// let currentTheme = swapTheme;
// themeChanger.addEventListener('click',() => {
//     if (themeName.innerText === "Light") {

//         themeName.innerText ="Dark";
//         themeLight.classList.remove("active");
//         themeDark.classList.add("active");
//         currentTheme.classList.remove("dark");
//         currentTheme.classList.add("light");

//     }else{

//         themeName.innerText ="Light";
//         themeDark.classList.remove("active");
//         themeLight.classList.add("active");
//         currentTheme.classList.remove("light");
//         currentTheme.classList.add("dark");


//     }

// });


// the above code will change mode while refresh page 

// new codw is keep ir same
const themeChanger = document.querySelector(".light-dark-mode");
const themeName = document.querySelector("[data-modeDescription]");
const themeDark = document.querySelector("[data-darkIcon]");
const themeLight = document.querySelector("[data-light]");
const swapTheme = document.body;


// If a theme is stored in local storage, use it; otherwise, default to 'dark'
let currentTheme = localStorage.getItem('theme') || 'dark';
swapTheme.classList.add(currentTheme);
themeName.innerText = currentTheme === 'light' ? 'dark' : 'light';

if (currentTheme === 'dark') {
    themeDark.classList.remove("active");
    themeLight.classList.add("active");
} else {
    themeLight.classList.remove("active");
    themeDark.classList.add("active");
}

themeChanger.addEventListener('click', () => {
    if (themeName.innerText === "dark") {
        themeName.innerText = "light";
        themeLight.classList.add("active");
        themeDark.classList.remove("active");
        swapTheme.classList.remove("light");
        swapTheme.classList.add("dark");
    } else {
        themeName.innerText = "dark";
        themeDark.classList.add("active");
        themeLight.classList.remove("active");
        swapTheme.classList.remove("dark");
        swapTheme.classList.add("light");
    }

    // Store the selected theme in local storage
    localStorage.setItem('theme', swapTheme.classList.contains('light') ? 'light' : 'dark');
});




// let's start the main game to render information of user 


fetchInformation("github");



//  let fetch the API
async function fetchInformation(name) {
    var result;
    try {
        USERNAME = name;
        const data = await fetch(`https://api.github.com/users/${USERNAME}`);
        result = await data.json();
        // console.log(result);

    } catch (error) {
        console.log("Error Found:", error);
    }

    renderInformation(result);
}



//  user data inporting function
const errorPage = document.querySelector(".error-page");
function renderInformation(UserData) {


    if (UserData?.message === "Not Found") {
        errorPage.classList.add("error-visible");
        setTimeout(() => {
            errorPage.classList.remove("error-visible");
        }, 3000);

    }
    else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const userImage = document.querySelector("[data-getImage]");
        const userName = document.querySelector("[data-name]");
        const UserIDLink = document.querySelector("[data-userIDLink]");
        const JoinDate = document.querySelector("[data-joinDate]");
        const aboutUser = document.querySelector("[data-aboutUser]");
        const repos = document.querySelector("[data-repos]");
        const followers = document.querySelector("[data-followers]");
        const following = document.querySelector("[data-following]");
        const location = document.querySelector("[data-location]");
        const BlogLink = document.querySelector("[data-bloglink]");
        const twitter = document.querySelector("[data-twitter]");
        const company = document.querySelector("[data-company]");

        userImage.src = UserData?.avatar_url;
        userName.innerText = UserData?.name;
        UserIDLink.href = UserData?.html_url;
        UserIDLink.innerText = UserData?.login;
        datesegments = UserData.created_at.split("T").shift().split("-");
        JoinDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        aboutUser.innerText = UserData?.bio;
        repos.innerText = UserData?.public_repos;
        followers.innerText = UserData?.followers;
        following.innerText = UserData?.following;
        location.innerHTML = UserData?.location;
        twitter.innerHTML = UserData?.twitter_username;
        company.innerHTML = UserData?.company;
        BlogLink.innerHTML = UserData?.blog;

        // check that they have that particular link or not
        if (UserData?.twitter_username === null) {
            twitter.innerHTML = " Not Avaliable";
        }
        if (UserData?.company === null) {
            company.innerHTML = " Not Avaliable";
        }
        if (UserData?.blog === "") {
            BlogLink.innerHTML = " Not Avaliable";
        }
        if (UserData?.location === null) {
            location.innerHTML = " Not Avaliable";
        }

        searchInput.value="";
    }
    

}


// get the user Name from the Search input
const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector("[data-SearchInput]");
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = searchInput.value;
    //check the validity of userName using  checkValidUser() functiom 
    if (userName === "") {
        return;
        
    } else {
        fetchInformation(userName);
        
    }
});




