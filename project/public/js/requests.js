let myHeaders = new Headers();
myHeaders.append('Accept','application/json');


let init = {
    method: 'GET',
    headers: myHeaders
}

window.onload = function(){
    
    document.getElementById("button").onclick = function(){fetchbooks()};
}

function fetchbooks(){

    
    //Search for specific user input
    let user_input = document.getElementById("search-box").value
    
    var div = document.querySelector('#display')
    //text to search for in the title of a work or the author's name
    let url = 'https://reststop.randomhouse.com/resources/works?search='+user_input
    

    //empty previous list content
    clearValues(div)
    
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        console.log('Received object',data)
        console.log(data)
        user_input.value = "";
        //Search returns only one book
        if (data.work.length === undefined ){
            let node = document.createElement("div");
            let button = document.createElement("button")
            button.innerHTML = 'Add book'
            button.id = "mybutton"
            node.innerHTML = data.work.titleAuth
            div.appendChild(node)
            div.appendChild(button)
            
        }
        else{//Search returns multiple books

            var buttons = new Array(data.work.length)
            
            for(var i = 0; i < data.work.length; i++){
                
                let node = document.createElement("div");
                let button = document.createElement("button")
                button.innerHTML = 'Add book'
                button.id = i
                buttons[i] = data.work[i]
                node.innerHTML = data.work[i].titleAuth
                div.appendChild(node)
                div.appendChild(button)
                
            }
            
        }
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener("click", function(){
            
                addedfave(btn,data,buttons)

            });
        });

    })
    
    
    .catch(error => console.log('ERROR',error))
    
}



function addedfave(btn,data,buttons){
    
    if (btn.innerHTML == 'Add book'){
        if(btn.id == "mybutton"){
                        
            data = data.work

        }else{
            data = buttons[btn.id]
        }
        
        let myHeader = new Headers();
        myHeader.append('Content-Type','application/json');
        let init2 = {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(data)
        }
        let server = 'http://localhost:8080/addbook'

        fetch(server,init2)
        .then(response => response.json())
        .catch(error => console.log('ERROR'))
        btn.innerHTML = "Undo"
    }else{ //Undo your action
        if(btn.id == "mybutton"){
                        
            data = data.work

        }else{
            data = buttons[btn.id]
        }
        let myHeader = new Headers();
        myHeader.append('Content-Type','application/json');
        let init2 = {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(data)
        }
        let server = 'http://localhost:8080/remove'

        fetch(server,init2)
        .then(response => response.json())
        .catch(error => console.log('ERROR',error))
        
        btn.innerHTML = "Add book"

    }
    
}


function clearValues(div) {
    div.innerHTML = "";
}