//(function (){
  const wrapper = document.querySelector('#wrapper');
  const navDiv = document.querySelector('#catList');
  const hero = document.querySelector('#hero');
  const catArea = document.querySelector('.cat');
  const catImage = document.querySelector('.catImage')

/* ====== Model ===== */

  const model = {
     Henry: {
      name: 'Henry',
      url: 'https://www.demilked.com/magazine/wp-content/uploads/2016/08/biggest-maine-coon-cat-photography-robert-sijka-thumb640.jpg',
      counter: 0
    },
     Zuzu: {
      name: 'Zuzu',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRet5cHD_iUrmo3TSWo7rSlJgWbMGpRqtrCVhe281MgHRRx443MaA',
      counter: 0
    },
     Tortie: {
      name: 'Tortie',
      url: 'https://img.thrfun.com/img/024/498/tortoiseshell_cats_l1.jpg',
      counter: 0
    },
     Chubs: {
      name: 'Chubs',
      url: 'https://i2-prod.mirror.co.uk/incoming/article11515078.ece/ALTERNATES/s615/1_plus-sized-cutie.jpg',
      counter: 0
    },
     Tiger: {
      name: 'Tiger',
      url: 'https://s.yimg.com/uu/api/res/1.2/9fi1nf4iWS6bfdyCyXmbBg--~B/aD0zMzk7dz01MDk7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-GB/homerun/newsweek_europe_news_328/296a853a5f736de51ee472ca1543153c',
      counter: 0
       }
    }
  

/* ====== Octopus ====== */

  const octopus = {
    
    getCats: function(){
      return Object.values(model);
    },
    
    showCat: function(cat){
      //console.log(e)
      catView.render(cat)
    },
    
    init: function(){
      catView.init();
      catView.render(model['Henry']);
      listView.init();
    },
    
    incrementCounter: function(cat){
      model[cat].counter++;
      catView.render(model[cat])
    },

  }

  /* ====== VIEW ====== */


  const catView = {
    
    init: function(){ 
        catImage.addEventListener('click', function(e){
            let targetObj = e.target.alt;  // If it works it works.
            octopus.incrementCounter(targetObj);
        });
    },
    
    render: function(cat){
      catArea.children[0].innerHTML = cat.name;
      catArea.children[1].src = cat.url; // Fragile way to select elements.
      catArea.children[1].alt = cat.name;
      catArea.children[2].innerHTML = `Counter: ${cat.counter}`;
    }
  }
  
  const listView = {
    init: function(){
       octopus.getCats().forEach(function(e){
         let catLi = document.createElement('li');
         catLi.innerHTML = `<h2>${e.name}</h2>`;
         catLi.addEventListener('click',function(){
           octopus.showCat(e);
         });
         navDiv.firstElementChild.appendChild(catLi);
       }
      )}
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