let book_items=document.querySelector("#book_items")
let MainSection=document.querySelector(".MainSection")
let single_Book=document.querySelector(".single_Book")
let loader=document.querySelector(".loader")

async function fetchBooks(){
    loader.style.display="block"
    let data=await fetch(`https://books-backend.p.goit.global/books/top-books`)
    let JSONData=await data.json()
    
    // Sort the JSONData array alphabetically by the list_name property
    JSONData.sort((a, b) => a.list_name.localeCompare(b.list_name));

    // Get the ul element reference

    // Clear the ul contents
    book_items.innerHTML = "";

    // Iterate through the sorted data and append it to the ul
    JSONData.forEach(element => {
        let li=document.createElement("li")
        li.className="bookList"
        let h3=document.createElement("h3")
        h3.innerText=element.list_name;
        h3.className="category_Name"
        li.appendChild(h3)
        singleCategoryDetails(element.books,li)
        book_items.appendChild(li)
        let btn=document.createElement("button")
        btn.className="showMoreBtn";
        btn.textContent="Show more";
        book_items.appendChild(btn);

    });
    loader.style.display="none"
}
fetchBooks()

function singleCategoryDetails(books,li){
    let Single_Section_Book=document.createElement("div")
    Single_Section_Book.classList.add("Single_Section_Book_Items");
    books.forEach(element => {
        let a=document.createElement("a")
        a.className="single_Book"
        
        a.innerHTML=`
            <div class="book_img">
                <img src="${element.book_image}" alt="" class="single_book_img">
                <div class="hoverText animate__animated">
                    QuickView
                </div>
            </div>
            <div class="book_desc">
                <h3 class="book_title">${element.title}</h3>
                <p class="author_name">${element.author}</p>
                <span class="hideId">${element._id}</span>
            </div>
        `
        Single_Section_Book.appendChild(a)
        single_Book=document.querySelectorAll(".single_Book")

        SingleBook_Popup(single_Book)
    });
    li.appendChild(Single_Section_Book)
}
//Single Book Popup OnClick

function SingleBook_Popup(singleBook){
    singleBook.forEach((element)=>{
        element.addEventListener("click",element_pop)
    })
}
let body=document.querySelector("body")

async function element_pop(e){
    console.log(e.target.parentElement.parentElement.children[1].children[2].innerText);
    let span_id=e.target.parentElement.parentElement.children[1].children[2].innerText
    let link=await fetch(`https://books-backend.p.goit.global/books/${span_id}`)
    let data=await link.json()
    let lightBox=document.createElement("div")
    lightBox.className="lightbox"
    body.appendChild(lightBox)
    let wrapper=document.createElement("div")
    wrapper.className="wrapper"
    lightBox.appendChild(wrapper)
    // console.log(e.target.parentNode.parentNode);
    wrapper.innerHTML=`
            <i class="fa-solid fa-xmark fa-xl closeBtn popup_Close"></i>
            <div class="popup_head">
                <div class="Popup_Book_Img">
                    <img src=${data.book_image}>
                </div>
                <div class="Popop_Bookinfo">
                    <h3 class="popup_BookName">
                        ${data.title}
                    </h3>
                    <p class="popup_authorName">
                        ${data.author}
                    </p>
                    <p class="card_description">
                        ${data.description}there is no Description:${data.description}
                    </p>
                    <div class="social_links">
                        <div class="single_anchor_link">
                            <a href="${data.buy_links[0].url}">                            <img src="./images/amazon.png">
                            </a>

                        </div>
                        <div class="single_anchor_link">
                            <a href="${data.buy_links[1].url}"><img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Apple_Books_%28macOS%29.svg"></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="preview-img">
                <button>ADD TO SHOPPING LIST</button>
            </div>
    `
    let iconCross=document.querySelector(".popup_Close")
    iconCross.addEventListener("click",()=>{
        document.querySelector(".lightbox").remove();
    })
    // console.log(lightBox);
    lightBox.style.display="block"
}

// Single BookPopupEnd

// Categories Left Side Section Start
let singleCat
async function categoriesList(){
    const response = await fetch('https://books-backend.p.goit.global/books/category-list')
    const data=await response.json()

    let categories=document.querySelector(".Categories")
    
    data.forEach(element=>{
        var categoryItem=document.createElement("li")
        categoryItem.innerText=element.list_name
        categoryItem.className="category_item"
        categories.appendChild(categoryItem)
    })
    categories.addEventListener("click",function (event){
        if(event.target.nodeName=="LI"){
            // console.log(event.target.nodeName);
            event.preventDefault()
            singleCat=event.target.textContent;
            // console.log(event.target);
            getCategoryBooks(singleCat)
        }
    })
}
categoriesList()

async function getCategoryBooks(singleCategory){
    let data=await fetch(`https://books-backend.p.goit.global/books/category?category=${singleCategory}`)
    let jsonFormat=await data.json()
    console.log(jsonFormat);
    let li=document.createElement("li")
    li.classList.add("bookList")
    // let h1=document.createElement("h1")
    // h1.className="book_title"
    // h1.innerText=jsonFormat[0].list_name
    // li.appendChild(h1)
    li.innerHTML=`
        <h2 class="booksMainTitle">
            ${jsonFormat[0].list_name}
            <span class="title_Seller">

            </span>
        </h2>
    `
    let div1=document.createElement("div")
    div1.className="Single_Section_Book_Items"
    li.appendChild(div1)
    book_items.innerHTML=""
    for(let i=0;i<jsonFormat.length;i++){
        // console.log(jsonFormat[i]);
        createSingleBookCard(jsonFormat[i],div1,li)
    }
    let booksMainTitle=document.querySelector(".booksMainTitle")
    booksMainTitle.style.display="none"
}

function createSingleBookCard(singleCatBook,div1,li){
    // Create Card
    // 
    
    // let div=document.createElement("div")
    // div.classList.add("Single_Section_Book_Items")
    let anch=document.createElement("a")
    anch.className="single_Book"
    anch.innerHTML=`
                
                    <div class="book_img">
                        <img src="${singleCatBook.book_image}" class="single_book_img" alt="">
                    </div>
                    <div class="book_desc">
                        <h3>${singleCatBook.title}</h3>
                        <p>${singleCatBook.author}</p>
                    </div>
                
        
    `
    div1.appendChild(anch)
    li.appendChild(div1)
    // console.log(li);
    book_items.appendChild(li)
}
// Categories Right Side Section Ends

//SignUp Start
let signUpBtn=document.querySelector(".signUp")
let SignUpSection=document.querySelector(".SignUpSection")
signUpBtn.addEventListener("click",(event)=>{
    MainSection.style.display="none"
    SignUpSection.style.display="block"
})

let closeBtn=document.querySelector(".closeBtn")
// console.log(closeBtn);
closeBtn.addEventListener("click",()=>{
    MainSection.style.display="flex"
    SignUpSection.style.display="none"
    
})
//SignUp End

let signUpForm=document.querySelector(".signupForm")
let Registerbtn=document.querySelector(".register_Btn")
Registerbtn.addEventListener("click",(event)=>{
    event.preventDefault()
    validateForm()
})
// Form Validation
function validateForm(){
    let name=document.forms["SIGNUP"]["name"]
    let email=document.forms["SIGNUP"]["email"]
    let password=document.forms["SIGNUP"]["password"]
    // console.log(name.value);
    // console.log(email);
    // console.log(password);

    if(name.value==""){
        window.alert("Please enter your name")
        return false;
    }
    
    if(password.value==""){
        window.alert("Please enter your password")
        return false;
    }

    if(email.value==""){
        window.alert("Please enter your email")
        return false; 
    }
    else {
        const registrationStatus = register();
        if (registrationStatus === 'registered') {
            window.alert("This email is already registered");
            return false;
        } else if (registrationStatus === 'success') {
            window.alert("Successfully Registered");
            return true;
        }
    }
}

let arr=JSON.parse(localStorage.getItem("users")) || []
console.log(arr);
function register(){
    let name=document.forms["SIGNUP"]["name"].value
    let email=document.forms["SIGNUP"]["email"].value
    let password=document.forms["SIGNUP"]["password"].value


    // console.log(name);
    // console.log(email);
    // console.log(password);
    var NewUser={
        id:Number(new Date),
        "Name":name,
        "Email":email,
        "Password":password
    }
    // console.log(NewUser);
    // console.log(arr);
    // var json=JSON.stringify(NewUser)
    // localStorage.setItem(email,json)
    // console.log("user added");
    
    let UserExists=arr.find(users=> users.Email===NewUser.Email)
    console.log(UserExists);
    if(UserExists){
        // return new Error({error: "User Exists"})
        return "registered"
    }
    else{
        arr.push(NewUser)
        let userString=JSON.stringify(arr)
        localStorage.setItem('users',userString)
        return "success" 
    }
    
}
// Registration End


// SignIn starts
let signInForm=document.querySelector(".signInForm")
let signIn_Btn=document.querySelector(".signIn_Btn")
signIn_Btn.addEventListener("click",(event)=>{
    event.preventDefault();
    Validate_signIn()
})
function Validate_signIn(){
    let email=document.forms["signInForms"]["email"]
    let password=document.forms["signInForms"]["password"]

    if(password.value=="" || email.value==""){
        window.alert("Please enter your details")
        return false;
    }
    else{
        const registrationStatus = signIn();
        if (registrationStatus === 'notRegistered') {
            window.alert("Wrong Details entered");
            return false;
        } else if (registrationStatus === 'success') {
            window.alert("Successfully Registered");
            return true;
        }
        // const SignInStatus=signIn()
        
    }
}

function signIn(){
    // let NewUser={
    //     Email : document.forms['signInForms']['email'].value,
    //     Password : document.forms['signInForms']['password'].value
    //     }
    //     var users=[];
    // var data=localStorage.getItem('users');
    // if(data){
    //     users= JSON.parse(data);
    // }
    // for(var i in users){
    //     if(NewUser.Email===users[i].Email && NewUser.Password===users[i].Password){
    //         localStorage.setItem('user',JSON.stringify({'Name':users[i].Name,'Email':users[i].Email}))
    //         return "success";
    //     }
    // }
    // users.push(NewUser)
    // localStorage.setItem('users',JSON.stringify(users))
    // return "notRegistered"

    let email=document.forms["signInForms"]["email"].value;
    let password=document.forms["signInForms"]["password"].value;
    let UserLogin={
        "Email":email,
        "Password":password
    }
    let users=[];
    users=JSON.parse(localStorage.getItem("users")) || []
    console.log(users);
    
    for(let i in users){
        if(UserLogin.Email==users[i].Email && UserLogin.Password==users[i].Password){
            
            let signupbtnNavBar=document.querySelector(".signupbtnNavBar")
            signupbtnNavBar.innerHTML=`
                <button class="userNameNav">
                    <span>${users[i].Name}</span>
                    <i class="fa-solid fa-caret-down" onclick="logOut_dropdown()"></i>
                </button>
                <button class="signUp LogOut">
                    <span>Log Out</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            `
            localStorage.setItem('user',JSON.stringify({'Name':users[i].Name,'Email':users[i].Email}))

            MainSection.style.display="flex"
            SignUpSection.style.display="none"
            // console.log(book_items);
            return 'success'
        }
    }
}
document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("LogOut")) {
        localStorage.removeItem("user");
        let signupbtnNavBar = document.querySelector(".signupbtnNavBar");
        // console.log(signupbtnNavBar);
        signupbtnNavBar.innerHTML=`
            <button class="signUp">
                <span>SignUp</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        `
        let signUpBtn=document.querySelector(".signUp")
// let SignUpSection=document.querySelector(".SignUpSection")
        signUpBtn.addEventListener("click",(event)=>{
            MainSection.style.display="none"
            SignUpSection.style.display="block"
        })

        // location.reload();
        
    }
});

function displayUserData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let signupbtnNavBar = document.querySelector(".signupbtnNavBar");

    if (users.length > 0) {
        let loggedInUser = users[0]; 
        signupbtnNavBar.innerHTML = `
            <button class="userNameNav">
                <span>${loggedInUser.Name}</span>
                <i class="fa-solid fa-caret-down" onclick="logOut_dropdown()"></i>
            </button>
            <button class="signUp LogOut">
                <span>Log Out</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayUserData();
});

// let logOut=document.querySelector(".LogOut")
// console.log(logOut);
// logOut.onclick=()=>{
//     localStorage.removeItem("user")
//     location.reload()
// }

function logOut_dropdown(){
    let userNameNav=document.querySelector(".userNameNav");
    userNameNav.style.marginTop="3.6rem"
    let logOut=document.querySelector(".LogOut")
    console.log(logOut);    
    logOut.style.display="flex"
    logOut.style.marginTop = "5px";
}

// SignIn Ends



let signUp_link=document.querySelector(".signUp_link")
let signIn_link=document.querySelector(".signIn_link")
let SignUp_form_div=document.querySelector(".SignUp_form_div")
let signIn_Form_div=document.querySelector(".signIn_Form_div")
signUp_link.addEventListener("click",()=>{
    signIn_link.classList.add('active')
    signUp_link.classList.remove('active')
    SignUp_form_div.style.display="flex"
    signIn_Form_div.style.display="none"
})
signIn_link.addEventListener("click",()=>{
    signUp_link.classList.add('active')
    signIn_link.classList.remove('active')
    signIn_Form_div.style.display="flex"
    SignUp_form_div.style.display="none"
})











// async function Categories_section(){
//     let url="https://books-backend.p.goit.global/books/category?category=${newFetch}"
// }






// Dark and Light Mode
let header=document.querySelector("header")
let logoName=document.querySelector(".logoName")
let MainContainer=document.querySelector(".MainContainer")
// let categories=document.querySelector(".Categories")
let cards=document.querySelector(".cards")
let showMoreBtn=document.getElementsByClassName("showMoreBtn")
// console.log(showMoreBtn);
let category_item=document.getElementsByClassName("category_item")
// console.log(category_item);
// console.log(categories.childNodes);
toggle.addEventListener("click",()=>{
    toggle.classList.toggle('active')
    header.classList.toggle('active')
    logoName.classList.toggle('active')
    MainContainer.classList.toggle('active')
    // category_item.classList.toggle('active')
    cards.classList.toggle('active')
    Array.from(category_item).forEach(item => {
        item.classList.toggle('active');
    });
    Array.from(showMoreBtn).forEach(item => {
        item.classList.toggle('active');
    });

})


// Show More 

