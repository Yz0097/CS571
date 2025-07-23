function buildStudents(studs) {
  // TODO This function is just a suggestion! I would suggest calling it after
  //      fetching the data or performing a search. It should populate the
  //      index.html with student data by using createElement and appendChild.
  const stud_outer_div = document.getElementById("students");
  stud_outer_div.innerHTML = "";
  
  document.getElementById("num-results").innerText = studs.length;
  for (let stud of studs) {
    let stud_div = document.createElement("div");
    stud_div.classList.add(
      "col-xs-12",
      "col-sm-12",
      "col-md-6",
      "col-lg-4",
      "col-xl-3"
    );
    // 0:  fromWisconsin: true
    //     interests: (3) ['Archery', 'Brewing', 'Magic']
    //     major: "Mathematics"
    //     name: {first: 'Noah', last: 'Jackson'}
    //     numCredits: 17
    //     [[Prototype]]: Object
    // 1: {name: {…}, fromWisconsin: true, numCredits: 13, major: 'History', interests: Array(4)}

    //name
    let stud_name = document.createElement("h2");
    stud_name.innerText = stud.name.first + " " + stud.name.last;
    stud_div.appendChild(stud_name);

    //major
    let stud_major = document.createElement("p");
    stud_major.appendChild(
      Object.assign(document.createElement("strong"), { innerText: stud.major })
    );
    stud_div.appendChild(stud_major);

    //credits & fromWisconsin
    let stud_credits = document.createElement("p");
    stud_credits.innerText =
      `${stud.name.first} is taking ${stud.numCredits} credits and ` +
      (stud.fromWisconsin ? "is" : "is not") +
      " from Wisconsin.";
    stud_div.appendChild(stud_credits);

    //interests
    let stud_interest_num = Object.assign(document.createElement("p"), {
      innerText: `He(She) has ${stud.interests.length} interests including...`,
    });
    let stud_interests = document.createElement("ul");

    for (let interest of stud.interests) {
      let interestChild = document.createElement("li");
      interestChild.innerText = interest;
      interestChild.addEventListener("click", searchInterest);

      stud_interests.appendChild(
        // Object.assign(document.createElement("li"), { innerText: interest })
        interestChild
      );
    }
    stud_div.appendChild(stud_interest_num);
    stud_div.appendChild(stud_interests);

    //adjust style
    stud_major.classList.add("student-info");
    stud_credits.classList.add("student-info");
    stud_interest_num.classList.add("student-info");

    //insert div
    stud_outer_div.appendChild(stud_div);
  }
}

function handleSearch(e) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!

  // TODO Implement the search
  //get search condition
  const nameValue = document.getElementById("search-name").value;
  const majorValue = document.getElementById("search-major").value;
  const interestValue = document.getElementById("search-interest").value;

  //deal search
  let resStuds = allStuds;
  if(nameValue){
    resStuds = resStuds.filter(stud =>{
      studName = `${stud.name.first} ${stud.name.last}`.toLowerCase();
      return nameValue.toLowerCase().includes(studName);
    })
  }
  if(majorValue){
    resStuds = resStuds.filter(stud=>{
      return stud.major.toLowerCase().includes(majorValue.toLowerCase());
    })
  }
  if(interestValue){
    resStuds = resStuds.filter(stud => {
      return JSON.stringify(stud.interests).toLowerCase().includes(interestValue.toLowerCase());
    })
  }

  //build students infomation
  buildStudents(resStuds);
}

function searchInterest(e){
  let interest = e.target.innerText;
  document.getElementById("search-name").value = "";
  document.getElementById("search-major").value = "";
  document.getElementById("search-interest").value = interest;
  handleSearch();
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

//load website for 1st time
const allStuds = [];
fetch("https://cs571.org/rest/s25/hw2/students", {
  headers: {
    "X-CS571-ID": CS571.getBadgerId(),
  },
})
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    allStuds.push(...data);
    console.log(data);
    buildStudents(allStuds);
  })
  .catch((err) => {
    console.error("Could not get the featured item. " + err);
  });
