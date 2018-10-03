var UserInfo = {};

function create() {
		
		UserInfo.name = ""; 
		UserInfo.name = UserInfo.name.concat(document.getElementById("name").value);
		UserInfo.grpname = "";
		UserInfo.grpname = UserInfo.grpname.concat(document.getElementById("grpname").value);
		console.log("Name:"+UserInfo.name+"	GRP:"+UserInfo.grpname);
		window.location= "Chatting.html?grpname="+UserInfo.grpname+"&name="+UserInfo.name;
	}
	
function getParameterByName(name) {
    var  url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var config1 = {
		apiKey: "AIzaSyBrFnBH7Uwf_2YgqsvU7y0mSJAq1ECw2a4",
		authDomain: "web-example-13f47.firebaseapp.com",
		databaseURL: "https://web-example-13f47.firebaseio.com",
		projectId: "web-example-13f47",
		storageBucket: "web-example-13f47.appspot.com",
		messagingSenderId: "674263071934"
		};
		firebase.initializeApp(config1);

function save() {
	
		var grpname = getParameterByName("grpname")
		var name = getParameterByName("name");
		var txt = document.getElementById("t").value;
		var ulList = document.getElementById("list");
		console.log("GRP: " + grpname + "  NAME: " + name + "  TXT: " + txt);
		
		// var config1 = {
		// apiKey: "AIzaSyBrFnBH7Uwf_2YgqsvU7y0mSJAq1ECw2a4",
		// authDomain: "web-example-13f47.firebaseapp.com",
		// databaseURL: "https://web-example-13f47.firebaseio.com",
		// projectId: "web-example-13f47",
		// storageBucket: "web-example-13f47.appspot.com",
		// messagingSenderId: "674263071934"
		// };
		// firebase.initializeApp(config1);
		
		var database = firebase.database();
		var messagesRef = database.ref("messages");
		var nameRef = messagesRef.child(grpname);
		
		console.log("grp: " + grpname + " name: " + name + " txt: " + txt);
				
		nameRef.push().set({
			message:txt,
			from:name
		});
		
		nameRef.on("value", snap => {
		ulList.innerHTML = "";
		snap.forEach(function(value) {
			const li = document.createElement("li");
			li.innerText =  (value.val().from + ":				"+value.val().message);//snap.val().message;
		    li.id = value.key;
	     	ulList.appendChild(li);	
			console.log(value.val());
		});
	   //document.write(snap.val().from + ":		"+snap.val().message+"<br>");
		});
		
		
		document.getElementById("t").value = "";
		document.getElementById("t").focus();
		document.getElementById("grp").innerHTML = "Current Group:  " + grpname;
		var elem = document.getElementById("box");
		elem.scrollTop = elem.scrollHeight;
		
		//nameRef.on("child_added" , snap => {
	    
		//ulList.innerHTML = "";
		//const li = document.createElement("li");
	    //li.innerText =  (snap.val().from + ":		"+snap.val().message);//snap.val().message;
		//li.id = snap.key;
		//ulList.appendChild(li);	
	   //document.write(snap.val().from + ":		"+snap.val().message+"<br>");
		//});
		
}