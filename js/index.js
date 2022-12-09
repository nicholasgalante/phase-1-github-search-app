const form = document.querySelector('#github-form');
// const userlist = document.querySelector('#user-list');

form.addEventListener('submit', e => {
    e.preventDefault();
    let input = document.querySelector('#search').value;
    console.log(input)
    form.reset();

    fetch(`https://api.github.com/search/users?q=${input}`,{
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json'
            }
    })
    .then((response) => response.json())
    .then((data) => {
        let items = data.items;
        console.log(data)

        items.forEach(element => {
            let userName = element.login;
            const div = document.createElement('div');
            const profileLink = document.createElement('a');
            const handle = document.createTextNode(userName);
            const reposLink = document.createElement('a');
            const reposText = document.createTextNode('View repos');
            const img = document.createElement('img');
            reposLink.addEventListener('click',() => fetchRepos(userName));
            profileLink.href = element.html_url
            profileLink.append(handle)
            reposLink.append(reposText);
            // reposLink.href = element.repos_url;
            img.setAttribute('src',element.avatar_url);
            img.setAttribute('class', 'avatar')
            div.append(profileLink);
            div.append(reposLink);
            div.append(img);
            document.querySelector('#user-list').append(div);
        });
    })

})

fetchRepos = (userName) => {
    fetch(`https://api.github.com/users/${userName}/repos`,{
        headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        let handle = data[0].owner.login;
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const view = document.createElement('a');

        h1.innerText = handle;
        div.append(h1)
        document.querySelector('#repos-list').append(div);

    })
}





