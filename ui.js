function UI(){

}
//addFilmToUI: bir film nesnesini kullanıcı arayüzüne eklemek için kullanılır.  
// newFilm : parametresi olarak aldığı film nesnesini, HTML tablosuna bir satır olarak ekler. 
UI.prototype.addFilmToUI= function(newFilm){
    const filmList= document.querySelector("#films");
    filmList.innerHTML+= `
    
    <tr>

    <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
    <td>${newFilm.title}</td>
    <td>${newFilm.director}</td>
 
    <td><a href="#" id = "delete-film" class = "btn btn-danger">Delete Movie</a></td>
    </tr> 
    `
}

// eklenen satırda film resmi, adı ve yönetmeni html sayfasına eklenir
// eklenen filmi silmek için buton kullanılıyor

// kullanıcı tarfaından girilen giriş alanlarını temizlemek için 
UI.prototype.clearInput= function(element1, element2, element3){
    element1.value="";
    element2.value="";
    element3.value="";
}
// mesajı html sayfasındaki .card-body nesnesine aktarıyor
UI.prototype.displayMessages= function(message, type){
    const cardBody= document.querySelector(".card-body");

    //alert divi oluşturma
    const div= document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent= message;
    cardBody.appendChild(div);

    //alinan mesajın belli bir süre kaldırılması için 
    setTimeout(function(){
     div.remove();

    },7700);


}

//filmleri storage' ekleme
UI.prototype.loadAllFilms=function(films){
    const filmList=document.getElementById("films");
    films.forEach(function(film){
        filmList.innerHTML+= `
        <tr>
        <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
        <td>${film.title}</td>
        <td>${film.director}</td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Delete Movie</a></td>
        </tr> 
        `
    })
}

// kullanıcının seçtiği filmi silmek için
UI.prototype.deleteFilmFromUI= function(element){
    element.parentElement.parentElement.remove();
}

// tüm eklenen filmleri silmek için 
UI.prototype.clearAllFilmsFromUI= function(){
    const filmList= document.querySelector("#films");
    while(filmList.firstElementChild !==null){
        filmList.firstElementChild.remove();
    }
}