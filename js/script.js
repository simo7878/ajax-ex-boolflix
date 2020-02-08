//Creare un layout base con una searchbar (una input e un button)
//in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il  bottone, cercare sull’API tutti i film
// che contengono ciò che ha scritto l’utente.
//Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori
//per ogni film trovato:
// -Titolo
// -Titolo Originale
// -Lingua
// - Voto



// API key 2a2c79fd61e1298f64644ca23a969bd0

//"title": "La leggenda dei 7 vampiri d'oro",
//"original_title": "The Legend of the 7 Golden Vampires",
//"original_language": "zh",
//"vote_average": 6,

//{
//            "popularity": 5.049,
//            "vote_count": 51,
//            "video": false,
//            "poster_path": "/8JDs9GUeYEPf1Lbycm6Zx1mIozM.jpg",
//            "id": 26480,
//            "adult": false,
//            "backdrop_path": "/lGjrTjjxtzioyPcTJztZUiPejAu.jpg",
//            "original_language": "zh",
//            "original_title": "The Legend of the 7 Golden Vampires",
//            "genre_ids": [
//                28,
//                27
//            ],
//            "title": "La leggenda dei 7 vampiri d'oro",
//            "vote_average": 6,
//            "overview": "Un cinese, certo Kan, recatosi in Transilvania nel 1804, riesce a incarnare nelle proprie spoglie mortali l'animo del Re dei Vampiri, il Conte Dracula, e a trasferirne le sue losche imprese nel remoto villaggio di Pin Qwei dove terrorizza gli abitanti e vampirizza le giovani donne con l'aiuto di 7 vampiri coperti d'oro e di un esercito di \"vampirizzati\" che al momento opportuno escono dalle tombe...",
//            "release_date": "1974-07-11"
//        }



//alert('ciao');
$(document).ready(function() {
  //click button
  $('#button_research').click(function() {
    var query = $('#query').val();
    ricercaFilms(query);
    resetRicerca();
  });
});









//-----------FUNZIONI-------------

//FUNZIONE RICERCA FILMS
function ricercaFilms(string) {
  //effettuo chiamata ajax
  var api_key = '2a2c79fd61e1298f64644ca23a969bd0';
  var url = 'https://api.themoviedb.org/3/search/movie';
  $.ajax(
    {
      url : url,
      method : 'GET',
      data : {
      api_key : api_key,
      query : string,
      language : 'it-IT'
      },
      succes : function(data) {
        if (total_results > 0 ) {
          var films = data.results;
          stampaFilms(films);
        } else {
          resetRicerca();
          stampaNessunRisultato();
        }

      },
      error : function(request, state, errors) {
        console.log(errors);
      }

  });
}

//FUNZIONE RESET RICERCA
function resetRicerca() {
  $('.covers').html('');
  $('#query').val('');
}

//FUNZIONE STAMPA FILMS
function stampaFilms(films) {
  var source = $("#films-template").html();
  var template = Handlebars.compile(source);

for (var i = 0; i < films.length; i++) {
  var thisFilm = films[i];
  console.log(thisFilm);

  var context = {
    titolo : thisFilm.title,
    titolo_originale : thisFilm.original_title,
    lingua_originale : thisFilm.original_language,
    voto : thisFilm.vote_average
  };
}

  var html = template(context);
  $('.covers').append(html);
}
//FUNZIONE CHE STAMPA NESSUN RISULTATO
function stampaNessunRisultato() {
  var source = $("nessun-risultato-template").html();
  var template = Handlebars.compile(source);
  var html = template();
    $('.covers').append(html);
}
