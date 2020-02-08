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



$(document).ready(function() {
//click button
  $('#button_research').click(function() {
    var research = $('input').val();
    resetRicerca();
    ricercaFilms();


function ricercaFilms(string) {
  //chiamata ajax
    $.ajax(
      {
        url : 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
        api_key: '2a2c79fd61e1298f64644ca23a969bd0',
        query: string,
        language: 'it-IT'
      },
        success: function(data){
          if (data.total_results > 0) {
            var films = data.results;
            stampaFilms(films);
          } else {
            resetRicerca();
            ricercaFilms();
 
          }

      },
        error: function(request, state, errors){
        console.log(errors);
      }
    });






//---------FUNZIONI-----------

//funzione reset ricerca
function resetRicerca() {
  $('.covers').html('');
  $('#research').val();
}

//funzione stampa nessun risultato
function nessunRisultato() {
  var source = $("films-template").html();
  var template = Handlebars.compile(source);
  var html = template();
}

//funzione stampa films
function stampaFilms(films) {

  var source = $("films-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < listaFilms.length; i++) {
    var selezioneFilms = listaFilms[i];
    console.log(selezioneFilms);

    var context = {
      titolo : selezioneFilms.title,
      titolo_originale : selezioneFilms.original_title,
      lingua_originale : selezioneFilms.original_language,
      voti : selezioneFilms.vote_average

    };
    var html = template(context);
   $('.cover').append(html);
  }
}
