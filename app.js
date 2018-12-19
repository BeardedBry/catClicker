//(function (){
  const wrapper = document.querySelector('#wrapper');
  const navDiv = document.querySelector('#catList');
  const hero = document.querySelector('#hero');
  const catArea = document.querySelector('.cat');
  const catImage = document.querySelector('.catImage')
  //const admin = document.querySelector('#adminMenu');

/* ====== MODEL ===== */

  const model = {
    cats: [
    {
      name: 'Henry',
      url: 'https://www.demilked.com/magazine/wp-content/uploads/2016/08/biggest-maine-coon-cat-photography-robert-sijka-thumb640.jpg',
      counter: 0
    },
    {
      name: 'Zuzu',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet5cHD_iUrmo3TSWo7rSlJgWbMGpRqtrCVhe281MgHRRx443MaA',
      counter: 0
    },
    {
      name: 'Tortie',
      url: 'https://img.thrfun.com/img/024/498/tortoiseshell_cats_l1.jpg',
      counter: 0
    },
    {
      name: 'Chubs',
      url: 'https://i2-prod.mirror.co.uk/incoming/article11515078.ece/ALTERNATES/s615/1_plus-sized-cutie.jpg',
      counter: 0
    },
    {
      name: 'Tiger',
      url: 'https://s.yimg.com/uu/api/res/1.2/9fi1nf4iWS6bfdyCyXmbBg--~B/aD0zMzk7dz01MDk7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-GB/homerun/newsweek_europe_news_328/296a853a5f736de51ee472ca1543153c',
      counter: 0
    }],
  }
  
/* ====== OCTOPUS ====== */
  const octopus = {
    
    getCats: function(){
      return model.cats;
    },
    
    showCat: function(cat){
      //console.log(e)
      Object.assign(octopus.active, cat); // Assigns current cat to Octopus.active
      catView.render(cat)
      adminView.render();
    },
    
    init: function(){
      catView.init();
      octopus.showCat(model.cats[0]);
      //catView.render(octopus.active); // Renders first object in the model.
      listView.init();
      adminView.render();
      adminView.init();
    },
    
    incrementCounter: function(cat){ // When image is clicked 
      //console.log(cat);
      octopus.active.counter++;
      octopus.showCat(octopus.active);
      octopus.active.update(cat);
      /* Calls the showCat function that renders everything.
         Could be modified to only update the counter by writing new
         view functions that seperate these concerns.
      */
    },

    active: {
      name: '',
      url: '',
      counter: 0,
      
      update: function(cat){ // Updates the model.
        let currentCat = model.cats.findIndex(function(n){  // Finds the index in the model for selected cat.
          return n.name == cat.name;
        })
        //console.log(cat);
        //console.log(currentCat);
        model.cats[currentCat].name = this.name;
        model.cats[currentCat].counter = this.counter;
        model.cats[currentCat].url = this.url;
      },

      adminUpdate: function(){
        let currentCat = model.cats.findIndex(function(n){  // Finds the index in the model for selected cat.
          return n.name == octopus.active.name;
        })
        //let newName = document.querySelector('.name').value;
        model.cats[currentCat].name = adminMenu.name.value
        model.cats[currentCat].alt = adminMenu.name.value
        model.cats[currentCat].url = adminMenu.url.value;
        model.cats[currentCat].counter = adminMenu.clicks.value;
        octopus.showCat(model.cats[currentCat]);
        listView.init();
      }
    },

  }

  /* ====== VIEWS ====== */
  const catView = {
    
    init: function(){ 
        catImage.addEventListener('click', (function(e){ // Event liustener for when image is clicked.
            return function(e){
              //let Obj = e.target.alt;  // If it works it works.
              let Obj = octopus.active;
              // console.log(e.target);
            octopus.incrementCounter(Obj);
          };
        })());
    },
    
    render: function(cat){
      catArea.children[0].innerHTML = cat.name;
      catArea.children[1].src = cat.url; // Fragile way to select elements.
      catArea.children[1].alt = cat.name; // Important for my image clicking event listener.
      catArea.children[2].innerHTML = `Counter: ${cat.counter}`;
    }
  }
  
  const listView = {
    init: function(){
      navDiv.innerHTML = '<ul></ul>';
       octopus.getCats().forEach(function(e){
         let catLi = document.createElement('li');
         catLi.innerHTML = `<h2>${e.name}</h2>`;
         catLi.addEventListener('click',function(){
           octopus.showCat(e);
         });
         navDiv.firstElementChild.appendChild(catLi);
       }
      )},

      update: function(){
        let catLi = document.querySelectorAll('li');
        octopus.getCats().forEach(function(e){
          catLi.innerHTML = `<h2>${e.name}</h2>`;
        });
      }
  }

  const adminView = {

    init: function(){
      adminMenu.save.addEventListener('click', (function(e){
        return function(e){
          e.preventDefault();
          octopus.active.adminUpdate();
        }
      })());
    },

    render: function(){
      adminMenu.name.value = octopus.active.name;
      adminMenu.url.value = octopus.active.url;
      adminMenu.clicks.value = octopus.active.counter;
    },
  }

    octopus.init();






    /*
    Visuals
The application should display

a list of cats by name
an area to display the selected cat
an admin button
an admin area with inputs for changing the cat's name, url, and number of clicks (hidden by default)
In the cat display area, the following should be displayed

the cat's name
a picture of the cat
text showing the number of clicks
The specifics of the layout do not matter, so style it however you'd like.
Interaction
When a cat name is clicked in the list, the cat display area should update to show the data for the selected cat.
The number of clicks in the cat area should be unique to each cat, and should increment when the cat's picture is clicked.
When the admin button is clicked, the admin area should appear with the inputs filled in for the currently-selected cat.
When the cancel button in the admin area is pressed, the admin area disappears.
When the save button in the admin area is pressed, the currently-selected cat's values update with the values in the admin area, and the admin area disappears.
*/