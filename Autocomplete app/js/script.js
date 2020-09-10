const search=document.getElementById("search");
const matchlist=document.getElementById("match-list");
// search and filter data
const searchstates=async searchtext=>{ //using fetch api to return promise with asyn function
    const res= await fetch("../data/data.json");
    const states=await res.json();
    //console.log(state);
    let matches=states.filter(state=>{
        let regex=new RegExp(`^${searchtext}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(searchtext.length===0){
        matches=[];
        matchlist.innerHTML=" ";
    }
    //console.log(matches);
    outputhtml(matches);
};
const outputhtml= matches=>{
    if(matches.length>0){
        const html=matches.map(match=>`
        <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr})
        <span class="text-primary">${match.capital}</span></h4>
        <small>latitude: ${match.lat} & longitude:${match.long}</small>
        </div>`)
        .join('');
        matchlist.innerHTML= html;
    }
};
search.addEventListener("input",()=>searchstates(search.value)); //arrow function passing actual value of the search
