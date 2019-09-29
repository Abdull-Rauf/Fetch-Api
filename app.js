const repoEndpoint = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
const contributorsEndpoint = 'https://api.github.com/repos/HackYourFuture/';
const ul = document.getElementById('cont-info');

const start = async url => {
  const response = await fetch(url);
  const repoList = await response.json();
  repoList.sort((a, b) => a.name.localeCompare(b.name));
  repoList.forEach(createListItem);
};

const createListItem = repo => {
  const rep = document.getElementById('list');
  const ul = document.getElementById('ul');
  const li = document.createElement('li');
  const nameEl = document.createElement('span');
  const descEl = document.createElement('span');
  const Namelabel = document.createElement('b');
  const repoName = repo.name;
  Namelabel.innerHTML = 'Name: ';
  nameEl.innerHTML = '<a href=#>' + repo.name + '</a>';
  const desclabel = document.createElement('b');
  desclabel.innerHTML = 'Desc: ';
  descEl.innerHTML = repo.description;
  const nameText = document.createElement('p');
  const descText = document.createElement('p');
  descText.appendChild(desclabel);
  nameText.appendChild(nameEl);
  descText.appendChild(descEl);
  li.appendChild(nameText);
  ul.appendChild(li);
  rep.appendChild(ul);

  nameEl.addEventListener('click', () =>
    showRepoDetails(
      contributorsEndpoint + repoName,
      contributorsEndpoint + repoName + '/contributors',
    ),
  );
};

function showRepoDetails(url1, url2) {
  const desDiv = document.getElementById('repo-details');
  while (desDiv.firstChild) desDiv.removeChild(desDiv.firstChild);
  while (ul.firstChild) ul.removeChild(ul.firstChild);
  document.querySelector('#description').classList.add('active');
  document.querySelector('#contributors').classList.add('active');

  fetch(url1)
    .then(res => res.json())
    .then(repository => {
      const name = document.createElement('P');
      const description = document.createElement('P');
      const forks = document.createElement('P');
      const updated = document.createElement('P');
      name.innerHTML = '<b>Name:</b> ' + repository.name;
      description.innerHTML = '<b>Description: </b>' + repository.description;
      forks.innerHTML = '<b>Forks:</b>' + repository.forks;
      updated.innerHTML = '<b>Updated: </b>' + repository.updated_at;

      desDiv.appendChild(name);
      desDiv.appendChild(description);
      desDiv.appendChild(forks);
      desDiv.appendChild(updated);
    });

  fetch(url2)
    .then(resp => resp.json())
    .then(contributors => {
      contributors.forEach(contributor => {
        const li = document.createElement('li');
        const contBadge = document.createElement('div');
        contBadge.id = 'contbadge';
        const avatar = '<img src="' + contributor.avatar_url + '" class="avatar">';
        li.innerHTML = avatar + ' ' + contributor.login;
        contBadge.innerHTML = contributor.contributions;
        li.appendChild(contBadge);
        ul.appendChild(li);
      });
    });
}

function btn_reload() {
  while (ul.firstChild) ul.removeChild(ul.firstChild);
}

//Run application
document.getElementById('start').addEventListener('click', () => start(repoEndpoint));
// start(repoEndpoint + 'repos?per_page=100');
