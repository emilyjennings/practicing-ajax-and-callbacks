function displayError(){
  $('#errors').html("Sorry something went wrong")
}

function searchRepositories(){
  const searchTerms = $('#searchTerms').val()

    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
      $('#results').html(data.items.map(result => repoNames(result)))

    }).fail(error => {
    displayError()
  })
}

function repoNames(result){
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="displayDetails(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
    `
}

function displayDetails(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data){
      $("#details").html(detailsRender(data))
  }).fail(error => {
  displayError()
})

function detailsRender(data){
  let commits = data.map((commit)=>detailRender(commit))
  return `${commits}`
}



}

function detailRender(commit){

  return `
    <h3>Commit</h3>
    <p>Author: ${commit.commit.author.name}, Message: ${commit.commit.message}, Date: ${commit.commit.author.date}</p>
  `
  // `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}




$(document).ready(function (){
});
