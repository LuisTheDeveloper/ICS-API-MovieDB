var button = document.querySelector('#btnSearch');
var txtinput = document.querySelector('#searchText');

button.addEventListener("click", listMovies, false);

function listMovies(){
    let searchText = txtinput.value;
    if (searchText !== "" ) {
        getMovies(searchText);
    } 
}

function getMovies(movieStr){
    var host = 'https://www.omdbapi.com/?s=' + movieStr + '&apikey=6a07c858';
    let output = '';
    $.getJSON( host, function( data ) {
        var items = data.Search;
        console.log(data.Search);
        try {
            for (i=0; i < items.length; i++) {
                output += `
                <div class="col-md-3">
                  <div class="well text-center">
                    <img src="${items[i].Poster}">
                    <h5>${items[i].Title}</h5>
                    <a onclick="movieSelected('${items[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div>
              `;

            }
            $('#movies').html(output);
        }
        catch(err) {
            //alert("No results!")
            Swal.fire(
                'Invalid Movie!',
                'Please type the movie name again.',
                'question'
              )
        }
        }); 

  }

  function movieSelected(id){
    // Stores the movie ID
    sessionStorage.setItem('movieId', id);
    window.location = 'details.html';
    return false;
  }
  