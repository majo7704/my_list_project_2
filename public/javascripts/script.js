let addGoal = document.getElementsByClassName('add')


for(let i = 0; i < addGoal.length; i++) {
  addGoal[i].addEventListener('click', event => {
    addGoal[i].removeAttribute('class', add)
    addGoal[i].addAttribute('class', remove)
    console.log('button clicked')
  })
}
let removeGoal = document.getElementsByClassName('remove')



// function create () {
//   let listContainer = document.getElementById('listContainer');
//   let listItem = document.createElement('li');
//   listItem.setAttribute('class', "card");
//   let listLink = document.createElement('a')
//   listLink.setAttribute('href', "/views/home.hbs");
//   listLink.setAttribute('class', "card__thumb")
//   let listImg = document.createElement('img');
//   listImg.setAttribute('src', "(/images/northern-lights-small.jpg)");
//   let listTitle = document.createElement('div');
//   listTitle.setAttribute('class', 'card__intro')
//   let listH = document.createElement('h3');
//   listH.setAttribute = ('class', 'card__title');
//   let listSpan = document.createElement('span');
//   listSpan.innerHTML = "1254 people are doing this";
//   listTitle.appendChild(listH);
//   listTitle.appendChild(listSpan);
//   listLink.appendChild(listImg);
//   listLink.appendChild(listTitle);
//   let listForm = document.createElement('form');
//   listForm.setAttribute('action', 'idea');
//   listForm.setAttribute('method',"POST");
//   listForm.setAttribute('class', 'card__footer')
//   let likeButton = document.createElement('button')
//   likeButton.innerHTML = "LIKE"
//   likeButton.setAttribute('type','submit');
//   likeButton.setAttribute('name', "action");
//   likeButton.setAttribute('value',"like");
//   likeButton.setAttribute('class', 'btn btn--like')
//   let addButton = document.createElement('button');
//   addButton.innerHTML = 'ADD GOAL'
//   addButton.setAttribute('type','submit');
//   addButton.setAttribute('name', "action");
//   addButton.setAttribute('value', "add");
//   addButton.setAttribute('class', 'btn btn--add')
//   listForm.appendChild(likeButton);
//   listForm.appendChild(addButton);
//   listItem.appendChild(listLink);
//   listItem.appendChild(listForm);
//   listContainer.appendChild(listItem);
// }
// create();
// create();
// create();
// create();