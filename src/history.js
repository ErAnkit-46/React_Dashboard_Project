function searchHistory(){
	var recentSearch = []
	recentSearch.push($('#search').val());

	$.each(recentSearch, function(index, value){
		const p = document.createElement("p");
		p.innerHTML = value;
		document.getElementById("historyLine").appebdChild(p);
	})

}


<script src="https://code.jquery.com/jquery-3.5.0.js"> </script>


