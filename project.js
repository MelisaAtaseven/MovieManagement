const form= document.querySelector("#film-form");
const titleElement= document.querySelector("#title");
const directorElement= document.querySelector("#director");
const urlElement= document.querySelector("#url");
const cardBody= document.querySelectorAll(".card-body")[1];
const clear= document.querySelector("#clear-films")

//ui objesini başlatma (kullanıcı arayüz işelmelerini gerçekleştirme)
const ui= new UI();

//storage objesi (film verilerini yerel depolamaya kaydetme)
const storage= new Storage();

//tüm eventler
// kullanıcının form aracılığıyla film ekleyebilmesini , filmlerin yerel depolamada tutulması ve UI üzerinde dinamik olarak güncellemeler yapar.
evenlisteners();
function evenlisteners(){
    form.addEventListener("submit", addFilm); 
    document.addEventListener("DOMContentLoaded",function(){  // ile sayfa yüklendiğinde çalışacak  işlev 
        let films= storage.getFilmsFromStorage();  //yerel depolamadan film verilerini alır
        ui.loadAllFilms(films); //filmleri UI'ya yükler
    }); 

    cardBody.addEventListener("click",deleteFilm);  // film sil butonunu izler ve tıklandığında deleteFilm fonksiyonunu çalıştırır
    clear.addEventListener("click", clearAllFilms);// tüm filmleri sil butonunu izler ve tıklandığında deleteFilm fonksiyonunu çalıştırır

}
//tüm eventler
evenlisteners();
function evenlisteners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films= storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);  // butona basıldığında silme işlemi yapar
    clear.addEventListener("click", clearAllFilms); // butona basıldığında tüm eklenen filmleri silme işlemi yapar

}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
  
    // Mevcut filmleri kontrol et
    const films = storage.getFilmsFromStorage();
    for (let i = 0; i < films.length; i++) {
      if (films[i].title === title && films[i].director === director) {
        ui.displayMessages("This film has already been added!", "danger");  // eklenen film tekrar eklenmeye çalışılırsa uyarı mesajı çıkar 
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle 
        return;// fonksiyondan çık
      }
    }
  
    if (title === "" || director === "" || url === "") { 
      // Hata
      ui.displayMessages("Please fill in all fields!", "danger"); // boş alan kaldıysa uyarı mesajı çıkar
    } else {
      // Yeni film
      const newFilm = new Film(title, director, url);
  
      // Arayüze film ekleme
      ui.addFilmToUI(newFilm);
  
      // Storage'a film ekleme
      storage.addFilmToStorage(newFilm);
      ui.displayMessages("Movie successfully added", "success"); // tüm şartlar sağlanıyorsa başarılı mesajı çıkar
    }
  
    ui.clearInput(titleElement, directorElement, urlElement);
  
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
  }

function isFilmAlreadyAdded(film) {
    const films = storage.getFilmsFromStorage();
    return films.some(existingFilm => existingFilm.title === film.title && existingFilm.director === film.director && existingFilm.url === film.url);
}

  
  
function deleteFilm(e){  // silinmek istenen film için 
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Deletion successful...","success");  

    }
}
function clearAllFilms(e){  //tüm filmleri silmek için
    if(confirm("Are you sure you want to delete all movies?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
   
}