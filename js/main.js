//Show WOrdpress Tab be default (Can switch with other tabs)
function myScript(){
	var x = document.getElementById("WordPress");
	x.style.display="block";
	}
//Highlights the button link and shows the related content
function openWork(evt, workType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(workType).style.display = "block";
    evt.currentTarget.className += " active";
}