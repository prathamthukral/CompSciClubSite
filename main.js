var announcements=[];
//everytime button is clicked, add 1 or loop to first element
var click = -1;
var refreshed = false;

$( "document" ).ready(function() {
});

function loader(){
	var ifrm = $("#announcement-frame").contents();
	var aud = ifrm.find(".aud");
	for (i=0; i=aud.length;i++){
		var p = $(aud[i]).find("p");
		console.log(p);
	}
}

function annLoad(){
	var ifrm = $("#announcement-frame").contents();
	ifrm.find(".main").css("width","100%");
	var aud = ifrm.find(".aud");
	for(i=0;i<aud.length;i++){
		var p = $(aud[i]).find("p");
		for(j=0;j<p.length;j++){
			var h = $(p[j]).html();
			if(h !== "None today"){
					
				var title = $(p[j]).find("b").html();
				var desc = $(p[j]).html().split("<br>")[1];
				var ann = {
					title:title,
					desc:desc
				}

				announcements.push(ann);
			}
		}	
	};
	myLoop();
}

//main loop
function myLoop () {
	period();
	if(click==announcements.length-1){
		click=-1;
	}
	transition(++click);
	console.log(click);
	$("#ann-pages").fadeIn(2000).delay(8000).fadeOut(2000,
		function(){
			myLoop();
		}
	);
}  



//loops through the announcements
function nextAnnouncement(){
	click++;
	if(click==announcements.length-1){
		click=0;
	}
	transition(click);
}

//displays announcement
function transition(i){
	var title = announcements[i].title;
	var desc = announcements[i].desc;
	$('#ann-pages').html("<b><h1 style='font-size:320%;'>"+title+"</h1></b><br><p>"+desc+"</p>");
}

//outputs which period it is (or before/after school)
function period(){
	var d = new Date();
	var h = d.getHours();
	var min = d.getMinutes();

	var period = "";

	//periods
    if(h>=0 && h<8){
    	period = "Before School";
    	refreshed = (h===7 && min >= 45)?false:true;  		
    }
    else if ((h==8 && min<=59) || (h==9 && min<=24)) {
    	period = "Period 1";
    	refreshed = false;
    }
    else if((h==9 && min<=59 && min>24) || (h==10 && min<=43)){
    	period = "Period 2";
    	refreshed = false;
    }
    else if((h==10 && min<=59 && min>43) || (h==11 && min<=59) || (h===12 && min<=2)){
    	period = "Period 3";
    	refreshed = false;
    }
    else if((h==12 && min<=59 && min>2) || (h==13 && min<=24)){
    	period = "Period 4";
    	refreshed = false;
    }
    else if((h==13 && min<=59 && min>24) || (h==14 && min<=40)){
    	period = "Period 5";
    	refreshed = false;
    }
    else{
    	period = "After School";
    	refreshed = false;
    }

    //formatting hour
    if (h>12) {
    	h-=12;
    }

    //formatting min
	if(min<10){
    	var m = "0"+min.toString(); 
    }
    else{
    	var m = min.toString();
    }

    $("#datepicker").html(h.toString()+":"+m+"<br />"+period);
    // refreshPg();
}

function refreshPg(){
	console.log(refreshed);
	if(!refreshed) {
	 location.reload();
	}
}

//debugger
function dbg(msg){
  console.log(msg);
}