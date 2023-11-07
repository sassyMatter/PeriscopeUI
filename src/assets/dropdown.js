function test(){
    let profileDropDownList = document.querySelector(".profile-dropdown-list");
    let btn = document.querySelector(".profile-dropdown-btn");
    profileDropDownList.classList.toggle('active');
    window.addEventListener("click", function(e) {
        if(!btn.contains(e.target)) {
            profileDropDownList.classList.remove("active");
        }
    });
}