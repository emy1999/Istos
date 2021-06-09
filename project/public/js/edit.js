let myHeader = new Headers();
myHeader.append('Accept','application/json');

let init = {
    method: 'GET',
    headers: myHeader
}

window.onload = function(){
    var url = 'http://localhost:8080/edit'
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        
        var title = document.getElementById('title')
        var author = document.getElementById('author')
        title.innerHTML = data.titleweb
        author.innerHTML = data.authorweb

    })
    .catch(error => console.log('ERROR'))
    
}