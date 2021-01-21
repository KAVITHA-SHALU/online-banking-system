  

function load() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/userlist',
        success: function(response) { 
         console.log(response);
         var data = JSON.parse(response);
         var html = '<table class="table table-striped">';
         html += '<tr style="background-color: #38ACEC">';
         html += '<th>Name</th>';
         html += '<th>Account Number</th>';
         html += '<th>From Account</th>';
         html += '<th>Amount</th>';
         html += '</tr>';
        for(var i=0; i<data.length; i++) {
            html += '<tr>';
            for (var key in data[i]) {
                html += '<td>'+data[i][key]+'</td>';
            }
            html += '</tr>';
        }
    
     $('#table').html(html);

         //$("#table").append(htmlTable(response));
        },
        error: function(xhr, status, err) {
          console.log(xhr.responseText);
        }
       });
}
