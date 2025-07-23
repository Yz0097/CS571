// This is where your JS goes!

// You can fetch data from https://cs571.org/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571.org/rest/s25/ice/pasta
//  https://cs571.org/rest/s25/ice/pizza

let recipe=
{
    "name": "7-Ingredient Chili",
    "author": "OpenAI",
    "img": {
        "location": "https://raw.githubusercontent.com/CS571-f24/ice-api-static-content/main/chili.png",
        "description": "A delicious bowl of chili!"
    },
    "keywords": [
        "hearty",
        "flavorful",
        "simple",
        "comforting"
    ],
    "reviews": [
        {
            "txt": "A burst of warmth and flavor in every spoonful; simple yet irresistible!",
            "rating": 5
        },
        {
            "txt": "The perfect blend of spice and comfort, an easy go-to chili recipe.",
            "rating": 4
        },
        {
            "txt": "Loved the hearty texture and rich taste - a new family favorite!",
            "rating": 5
        },
        {
            "txt": "Quick, flavorful, and satisfying - this chili hits all the right notes!",
            "rating": 5
        }
    ],
    "ingredients": {
        "ground beef": {
            "amount": 1,
            "unit": "lb"
        },
        "kidney beans": {
            "amount": 15,
            "unit": "oz",
            "misc": "drained and rinsed"
        },
        "diced tomatoes": {
            "amount": 14.5,
            "unit": "oz",
            "misc": "with juice"
        },
        "chili powder": {
            "amount": 2,
            "unit": "tablespoon"
        },
        "onion": {
            "amount": 1,
            "misc": "diced"
        },
        "bell pepper": {
            "amount": 1,
            "misc": "diced"
        },
        "ground cumin": {
            "amount": 1,
            "unit": "teaspoon"
        }
    },
    "recipe": [
        "Cook Meat with Vegetables: In a large pot, cook the ground beef, diced onion, and diced bell pepper over medium heat until the meat is no longer pink and the vegetables are softened.",
        "Add Remaining Ingredients: To the pot, add the kidney beans, diced tomatoes (with their juice), chili powder, ground cumin, and salt to taste. If the chili is too thick, add a little water to reach your desired consistency.",
        "Simmer: Bring the mixture to a boil, then reduce the heat and simmer for about 20-30 minutes to allow the flavors to meld. Stir occasionally.",
        "Serve: Enjoy your chili as is, or with toppings like shredded cheese or sour cream."
    ]
};
let amounts = [1, 15, 14.5, 2, 1, 1, 1];

function updateRecipe(){
  let select_recipe = document.getElementById("recipe-selector").value;
  fetch("https://cs571.org/rest/s25/ice/"+select_recipe,
        {headers: {"X-CS571-ID": CS571.getBadgerId()}})
    .then(res=>{
      console.log(res.status);
      return res.json();
    })
    .then(changeRecipeText);
}

function changeRecipeText(data){
  recipe = data;
  console.log(data);
  //img
  set_img(data);

  //h1
  set_heading(data);

  //table
  set_table(data);

  //ol
  set_ol(data);

  return;
}

function set_img(data){
  let img_html = document.getElementById("recipe-img");
  img_html.src = data.img.location;
  img_html.alt = data.img.description;
}

function set_heading(data){
  let head_html = document.getElementById("recipe-name");
  head_html.innerText = data.name;
}

function set_table(data){
  amounts = [];
  let tbody_html = document.getElementById("ingredients-body");
  tbody_html.innerHTML = "";
  let ingr_names = Object.keys(data.ingredients)
  for(let ingr_name of ingr_names){
    const ingr = data.ingredients[ingr_name];
    let tr_html = document.createElement("tr");
    let td_amount_html = document.createElement("td");
    let td_unit_html = document.createElement("td");
    let td_item_html = document.createElement("td");
    td_amount_html.innerText = ingr['amount'];
    amounts.push(ingr['amount']);
    if(ingr.unit){
      td_unit_html.innerText = ingr.unit;
    }
    if(ingr.misc){
      td_item_html.innerText = ingr_name + "(" + ingr.misc + ")";
    }else{
      td_item_html.innerText = ingr_name;
    }

    tr_html.appendChild(td_amount_html);
    tr_html.appendChild(td_unit_html);
    tr_html.appendChild(td_item_html);
    tbody_html.appendChild(tr_html);
  }
  updateYield();
}

function set_ol(data){
  let ol_html = document.getElementById("instructions");
  ol_html.innerHTML = "";
  for(let str_inst of data.recipe){
    let inst = document.createElement("li");
    inst.innerText = str_inst;
    ol_html.appendChild(inst);
  }
}

function updateYield(){
  let selector_value = document.getElementById("serving-selector").value;
  if(recipe){
    let table_rows = document.getElementById("ingredients-body").getElementsByTagName("tr");
    for(let i = 0; i < table_rows.length; i++){
      table_rows[i].getElementsByTagName("td")[0].innerText = amounts[i] * selector_value;
    }
  }
}


// const reviewNum = 0;
// const REVIEWS = [
//     "A burst of warmth and flavor in every spoonful; simple yet irresistible!",
//     "The perfect blend of spice and comfort, an easy go-to chili recipe.",
//     "Loved the hearty texture and rich taste - a new family favorite!",
//     "Quick, flavorful, and satisfying - this chili hits all the right notes!"
// ];

// // Gathers the original amounts of each ingredient.
// let ingrs = document.getElementById("ingredients-body").getElementsByTagName("tr");
// let originalAmounts = [];
// for (let ingr of ingrs) {
//     let amn = ingr.getElementsByTagName("td")[0].innerText;
//     let amnNum = parseFloat(amn);
//     originalAmounts.push(amnNum);
// }

// // TODO Implement the update yield!
// function updateYield() {
//     alert("I should update the yield!");
// }

// // TODO Implement the display review!
// let cnt = 0;
// function displayReview() {
//     //alert("I should display a review!");
//     let review = REVIEWS[cnt];
//     alert(review);
//     cnt = (cnt+1)%REVIEWS.length
// }

// function tryfetch() {
//     fetch("https://cs571.org/rest/s25/ice/chili" , {
//         headers: {
//             "X-CS571-ID": "bid_43f0fa03b1344b265fc5f550eb326db74e22b750301805fccce43e669b39115d" // you may hardcode your bid_
//         }
//     }).then(res => res.json())
//     .then(data => {
//         recipe = data; // make recipe available everywhere. this is a reference to the SAME object.
//         console.log(data);})
// }