books = []

window.onload = function(){
    let url = 'http://localhost:8080/list'
    let myHeaders = new Headers();
    myHeaders.append('Accept','application/json');  
    let init = {
        method: 'GET',
        headers: myHeaders
    }
    
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        
        var div = document.querySelector('#fave-list')
        initialize()
        for(var i =0;i <data.length;i++){
            
            var par = document.createElement('p')
            var node = document.createElement('div')
            var button = document.createElement('button')
            var a = document.createElement('a')
            var img = document.createElement('img')
            
            img.src = 'edit.png'
            button.innerHTML = 'Delete Book'
            img.className = 'edit'
            button.id = i
            img.id = i
            books.push(data[i])
            par.innerHTML = data[i].titleAuth
            a.href = "edit.html"; 
            //a.href = "#"; 
            div.appendChild(node)
            node.appendChild(par)
            node.appendChild(a)
            node.appendChild(button)
            a.appendChild(img)
            
            

            
        }
        
        
        document.querySelectorAll('button').forEach(btn => {
                btn.addEventListener("click", function(){
                console.log('About to delete a book')
                removeBook(btn,data)
            })
        })
        
        document.getElementById('search-box').onkeyup = function(){search()}


        document.querySelectorAll('img').forEach(a =>{
            a.addEventListener("click",function(){
                data = books[a.id]
                console.log(data)
                let url2 = 'http://localhost:8080/edit'
                let myHeader = new Headers();
                myHeader.append('Content-Type','application/json');  
                let init3 = {
                    method: 'POST',
                    headers: myHeader,
                    body: JSON.stringify(data)
                }
    
                fetch(url2,init3)
                .then(response => response.json())
                .catch(error => console.log('ERROR',error))
            })
        })
    })
    .catch(error => console.log('ERROR'))

}

//Create Search Bar and search button
function initialize(){
    console.log('Initializing List...')
    var div = document.querySelector('#fave-list')
    var search_bar = document.querySelector('#search-bar')
    var search_button = document.createElement('input')
    search_button.type = 'submit'
    search_button.id = 'button'

    div.innerHTML = ""

    var searcher = document.createElement('input')
    searcher.id = 'search-box'
    searcher.placeholder = 'Search in list...'
    search_bar.appendChild(searcher)
    search_bar.appendChild(search_button)

}

function removeBook(button,data){
    data = data[button.id]
    
    let myHeader = new Headers();
        myHeader.append('Content-Type','application/json');
        let init2 = {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(data)
        }
        var server = 'http://localhost:8080/remove'

        fetch(server,init2)
        .then(response => response.json())
        .catch(error => console.log('ERROR',error))
}

function search(){
    var input = document.getElementById('search-box').value
    
    keyword = input.toLowerCase()
    let div = document.querySelector('#fave-list')
    var text = div.getElementsByTagName('p')
    var button = div.getElementsByTagName('button')
    var edit = div.getElementsByTagName('a')
    for(var i = 0; i <text.length;i++){
        
        
        
        if(text[i].innerHTML.toLowerCase().indexOf(keyword) > -1){
          text[i].style.display = ''
          button[i].style.display = ''
          edit[i].style.display = ''
        }else{
            text[i].style.display = 'none'
            button[i].style.display = 'none'
            edit[i].style.display = 'none'
        }
    }
    
}

function edit(a,books){
    
    data = books[a.id]
    
    let url2 = 'http://localhost:8080/edit'
    let myHeaders2 = new Headers();
    myHeader.append('Content-Type','application/json');  
    let init3 = {
        method: 'POST',
        headers: myHeaders2,
        body: JSON.stringify(data)
    }
    
    fetch(url2,init3)
    .then(response => response.json())
    .catch(error => console.log('ERROR',error))

}