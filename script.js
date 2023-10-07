const input = document.getElementById('input');
const submitBtn = document.getElementById('submit-btn');
const user = document.getElementById('user')


submitBtn.addEventListener('click', () => {
    if (input.value == "") {
        console.log("Username is empty");
    } else {
        findUser(input.value)
    }
})


const findUser = async (username) => {
    const url = `https://api.github.com/users/${username}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    const inputDate = data.created_at;
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("in", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    let bio = data.bio
    if(bio==null){
        bio="This profile has no bio"
    }
   let tName;
   let lName;
   let link;
    if(data.twitter_username==null){
        tName="Not Available"
    }else{
        tName=data.twitter_username;
    }
    if(data.location==null){
        lName="Not Available"
    }else{
        lName=data.location;
    }
    if(data.blog==""){
        link="Not Available"
    }else{
        link=data.blog
    }

    user.innerHTML = `

    <img src=${data.avatar_url} alt="" class="img-fluid rounded-circle" width="100px">
    <h2 class="mt-2">${data.name}</h2>
    <a href=${data.html_url} class="text-decoration-none" target="_blank">@${data.login}</a>
    
    <p class="mt-2">${bio}</p>
    <p>Joined: ${formattedDate}</p>
    <div class="d-flex gap-2 flex-wrap align-items-center justify-content-center">
        <p>Repo: ${data.public_repos}</p>
        <p>followers: ${data.followers}</p>
        <p>following: ${data.following}</p>
    </div>
    <div class="d-flex flex-column">
        <p><i class="fa-solid fa-location-dot"></i> ${lName}</p>
        <p><i class="fa-brands fa-twitter"></i> ${tName}</p>
        <p><i class="fa-solid fa-link"></i> ${link}</p>
      
    </div>
    
    
    `
}

findUser("ankitjhagithub21")



