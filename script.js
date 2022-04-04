const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})


/*

const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const main = document.getElementById('main');
const search = document.getElementById('search');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
    }
    catch (error) {
        console.log(error);
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
    <div>
      <img
        class="user-dp"
        src="https://randomuser.me/api/portraits/women/43.jpg"
        alt=""
      />
    </div>
    <div class="bio">
      <h2>John Doe</h2>
      <p class="bio-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
        architecto, nobis aperiam inventore dolores recusandae nemo saepe
        deleniti fugit consequuntur ad culpa iure magni sunt itaque fuga,
        autem adipisci. Rerum.
      </p>
    </div>
    <ul class="user-stats">
      <li><strong>300</strong> Followers</li>
      <li><strong>78</strong> Following</li>
      <li><strong>48</strong> Repositories</li>
    </ul>
    <div class="repo-area">
      <a href="#" class="repo-link">Repo 1</a>
      <a href="#" class="repo-link">Repo 2</a>
      <a href="#" class="repo-link">Repo 3</a>
    </div>
  </div>
    `
    main.innerHTML = cardHTML

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);

        search.value = ' '
    }
})

*/

