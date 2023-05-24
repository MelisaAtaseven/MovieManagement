function Storage(){

}
// addFilmToStorage: yerel depolamaya yeni bir film eklemek için kullanılır
Storage.prototype.addFilmToStorage= function(newFilm){

    //mevcut film listesi
    let films= this.getFilmsFromStorage();
    // yeni filmi bu listeye ekliyor
    films.push(newFilm);

    //array'ı string'e çevirme
    localStorage.setItem("films",JSON.stringify(films)); 
  
}
//getFilmsFromStorage: yerel depolamadan film listesini almak için kullanılır.
Storage.prototype.getFilmsFromStorage= function(){
    let films;
    if(localStorage.getItem("films")=== null){ 
        films= [];
    }
    else{
       
        films= JSON.parse(localStorage.getItem("films")); //film listesini döndürür.
    }
    return films;

}
//belirtilen filmi yerel depodan silmek için kullanılır
Storage.prototype.deleteFilmFromStorage= function(filmTitle){
    let films= this.getFilmsFromStorage();
    films.forEach(function(film,index){
        if(film.title=== filmTitle){
            films.splice(index,1);
        }
    });
    localStorage.setItem("films",JSON.stringify(films));  //herhangi bir film silindikten sonra  güncellenen film listesini json formatına dönüştürerek films anahtarına kaydediyor
}

Storage.prototype.clearAllFilmsFromStorage= function(){  //tüm film verilerini yerel depolamadan temizlemek için kullanılır.
    localStorage.removeItem("films");  //films anahtarını siliyor
}