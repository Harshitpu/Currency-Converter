const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const ddselect=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("#btn");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

window.addEventListener("load",()=>
{
    updateexchange();
})

for (let select of ddselect)
{
    for (currcode in countryList)
      {
        let nop=document.createElement("option");
        nop.innerText=currcode;
        nop.value=currcode;
        if(select.name==="From"&&currcode==="USD")
        {
            nop.selected="selected";
        }
        else
        {
            if(select.name==="to"&&currcode==="INR")
                {
                   nop.selected="selected";
                 }
        }
        select.append(nop);
      }   
      
      select.addEventListener("change",(evt)=>
      {
          updateflag(evt.target);
      })
}

const updateflag =(ele)=>
{
    let currcode=ele.value;
    let ccode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${ccode}/flat/64.png`;
       let img=ele.parentElement.querySelector("img"); 
       img.src=newsrc;
};


btn.addEventListener("click", (evt)=>
{
    evt.preventDefault();
    updateexchange();
    
});

const updateexchange=async ()=>
{
    let amt=document.querySelector(".amount input");
    let amtv=amt.value;
    if(amtv===""||amtv<1)
    {
           amtv=1;
           amt.value="1";
    }
    //console.log(fromcurr.value,tocurr.value);
    const Url=`${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response= await fetch(Url);
    let data = await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let famt=amtv*rate;
    msg.innerText=`${amtv} ${fromcurr.value} = ${famt} ${tocurr.value}`;

}





