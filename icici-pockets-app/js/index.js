function onDeviceReady()
{
    document.addEventListener("backbutton", onBackClickEvent, false);
}

function onBackClickEvent()
{
   // alert(location.pathname)
	console.log(location.pathname)
	console.log(" path = " + window.location.href)
	if(location.pathname==="/android_asset/www/main.html"){
		 //navigator.app.exitApp();
		 window.location.href="main.html";
	}
	
}