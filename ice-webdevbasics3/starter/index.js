// This is where your JS goes!

fetch('https://cs571.org/rest/s25/ice/chili', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);

    // 5 star reviews
    const reviews_5star = data.reviews.filter(review => review["rating"] == 5).map(review => review.txt);
    console.log("5 star reviews are " + JSON.stringify(reviews_5star));

    // main instruct
    const main_inst = data.recipe.map(inst => {return inst.split(":")[0]});
    console.log("main instruct are " + JSON.stringify(main_inst));

    // ingredients
    const ingredients = Object.keys(data.ingredients);
    console.log("ingredients are " + JSON.stringify(ingredients));
    
})
// .catch(err => {
//     alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
// })