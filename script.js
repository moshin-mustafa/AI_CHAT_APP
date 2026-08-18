let div_chat=document.getElementsByClassName("main-body-chat")
let input=document.getElementsByClassName("input-box") 
let send=document.getElementsByClassName("send")

let chathistory=[]
async function sendm() {
   let message
      if (input[0].value=="") {
   return;
} else {
   
   let newelement=document.createElement("p")
   newelement.setAttribute("class","chat")
   div_chat[0].appendChild(newelement)
   div_chat[0].scrollTop = div_chat[0].scrollHeight;
   message= input[0].value
newelement.innerText= message
  input[0].value=""
   

}
let thinking=document.createElement("p")
thinking.setAttribute("class","ai-message")
div_chat[0].appendChild(thinking)
div_chat[0].scrollTop = div_chat[0].scrollHeight;
thinking.innerText="thinking"
send[0].disabled=true
let dot=1
let interval =setInterval(() => {
   if (dot==1){
      thinking.innerText="thinking"+"."
      dot=2
   }
   else if(dot==2){
       thinking.innerText="thinking"+".."
       dot=3
   }
   else if (dot==3) {
        thinking.innerText="thinking"+"..."
       dot=1
   }

},300 );
chathistory.push({
    role: "user",
    parts: [
        {
            text:message
        }

    ]

});


// chathistory.push
// 

let url = "http://localhost:3000/chat";
try {
   console.log(JSON.stringify(chathistory, null, 2));
   let response = await fetch(url, {
   method: "POST",
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify({
      contents:chathistory
   })
   //let wait= await response
});
let wait = await response.json()
if(response.ok==false){
  throw new Error(wait.error.message);;
   
}

      console.log(wait);
   console.log(wait.response)
   thinking.innerText=wait.candidates[0].content.parts[0].text
   chathistory.push({
    role: "model",
    parts: [
        {
            text:wait.candidates[0].content.parts[0].text
        }

    ]

});
   console.log(response.status);
} catch (Error) {
    let fail=document.createElement("p")
   fail.setAttribute("class","fail")
   div_chat[0].appendChild(fail)
  
   fail.innerText=Error.message


}
finally{
   clearInterval(interval)
     div_chat[0].scrollTop = div_chat[0].scrollHeight;
 send[0].disabled=false
}



}

send[0].addEventListener("click",()=>{

   sendm()
})
input[0].addEventListener("keydown", (event) => {
   if(event.key=="Enter"){
      sendm()
   }
});