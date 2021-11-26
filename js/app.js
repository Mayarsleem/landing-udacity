/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
const navBarList = document.getElementById('navbar__list'); // storing navigation list in a global variable
const sections = document.querySelectorAll('section'); // storing all  section elements in a global variable  


/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
//  a function to generate ul items  dynamically and appending it to navBarList 
function navULItemGenerator() {
    let navList = ''; // a local variable to store navigation list generated innerhtml 
    // creating a for...of...loop over each section we have and add an avigation list item to navlist with an anchor ellement to its position in the page .  
    for (let section of sections) {
        let sectionLink = section.getAttribute('id'); // storing section id in a variable to link it with the coresponding list item
        let sectionMenuName = section.getAttribute('data-nav'); // storing section data-nav in a 
        navList = `${navList}<li><a class ='menu__link' href= '#${sectionLink}' >${sectionMenuName}</a></li>` //using template string

    };
    // appending using innerHTML
    //  navBarList.innerHTML = navList;
    // appending using afterbegin in insertAdjacentHTML instead of innerHTML
    navBarList.insertAdjacentHTML('afterbegin', navList);
};

// calling the navListGenerator function to build the nav
navULItemGenerator();

// Add class 'active' to section when near top of viewport
// determinding which section is in the viewport uesing  IntersectionObserver API
// options is apart of the syntax of IntersectionObserver API

let options = {
    threshold: 0.5,  // when 30 % of the element (section) we are observing is in the viewport the secObserver function wil work 
}

let secObserver = new IntersectionObserver(function (entries, secObserver) {
    entries.forEach(entry => {
        // console.log(entry)
        // toggling  the active class but for some reason it does not work properly
        // entry.target.classList.toggle("your-active-class") 
        /////////////////////////    /////////////////////  
        //so instead i used a conditional statment of entery.isintersecting we can also use entry.intersectionRatio
        /*if (entry.isIntersecting) {
            entry.target.classList.add("your-active-class") // adds active class if entery isintersecting
        } else {
            entry.target.classList.remove("your-active-class") //removes active class if it does not intersect any more
        }; */
        ///////////////////////// using entry.intersectionRation instead of entery.isintersecting ///////////////////// 
        if (entry.intersectionRatio > 0.5) {
            entry.target.classList.add('your-active-class')
        } else {
            entry.target.classList.remove('your-active-class')
        }
    });
}, options);
// wraping all sections in a for loop so that secObserer could go through them once the IntersectionObserver is obsering any of the sections
sections.forEach(section => {
    secObserver.observe(section);
});

// already added the smoothscroll behavior via css 
//  a function scrolling to each section using scrollIntoView 

function smoothScrolling() {
    let anchorLinks = document.querySelectorAll('.menu__link'); // storing all navbar anchor in alocal variable by class name
    anchorLinks.forEach((anchor) => { //looping over each anchorLink
        anchor.addEventListener('click', (event) => { //adding even listener on click
            event.preventDefault(); // preventing defel value for reaching to each section to allow scrollIntow view to work  
            let anchorHref = anchor.getAttribute('href'); // storingin  every anchor href atrribute in avariable 
            // console.log(anchorHref)
            let target = document.querySelector(anchorHref); // a var for the targeted section .
            // console.log(target)
            target.scrollIntoView({
                behavior: "smooth",
                block: 'start'
            });

        });
    });
};
//calling the function 
smoothScrolling();

/////////////////////////////// end of code //////////////////////////////////////
