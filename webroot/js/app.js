//Write your javascript here, or roll your own. It's up to you.
//Make your ajax call to http://localhost:8765/api/index.php here

function submitForm(){
    const form = new FormData(document.getElementById('searchForm'));
    var resp=fetch('/api/',{
        method: 'POST',
        body: form
    }).then( (response) => {
            return response.json();
        })
      .then((data)=>{
        console.log(data);
      })
}