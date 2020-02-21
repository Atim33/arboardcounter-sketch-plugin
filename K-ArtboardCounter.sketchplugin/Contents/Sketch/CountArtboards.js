function onRun(context) {
	//------------------------------
	// Var
	//------------------------------
    var pageCount = 0;
    var artboardCount = 0;
	//var selection = context.selection;
	//var selectionCount = selection.count();
	var doc = context.document;
   
     
	//------------------------------
	// Current Sketch Page loop
	//------------------------------
    var curpageArtboardCount = 0;
	var curpageDocument = context.document.currentPage();
	var curpageArtboards = curpageDocument.artboards();
	var curpageLoop = curpageArtboards.objectEnumerator();
   	while (artboard = curpageLoop.nextObject()) {
	   curpageArtboardCount = curpageArtboardCount + 1;
	}		
	   
     
	//------------------------------
	// All Sketch Pages loop
	//------------------------------
	var detailedBreakdown = "Detailed breakdown by page:";
	let pages = context.document.pages();
	var names = []
	// Filter layers using NSPredicate
	for(var i = 0; i < pages.length; i++) {
		var currentPageNumber = i + 1;
		var currentPageBreakdown = "";
		var currentPage = pages[i];
		pageCount = pageCount + 1;
		
		//------------------------------
		// Artboard loop 
		//------------------------------
		//var artboards_for_export = []
		//var artboards_for_export_debug = "";
	   	var artboards = currentPage.artboards();
	   	var loop = artboards.objectEnumerator();
	   	while (artboard = loop.nextObject()) {
			if(currentPage.name() != "Symbols"){ //ignore symbols page
	 		   artboardCount = artboardCount + 1;
			}
		}

		//------------------------------
		// Detailed status breakdown
		//------------------------------
		if(currentPage.name() != "Symbols"){ //ignore symbols page
			currentPageBreakdown = "[" + currentPageNumber + "] " + currentPage.name() + ": " + numberWithCommas(artboards.count());
			detailedBreakdown = detailedBreakdown + "\r\n" + currentPageBreakdown;
		}else{
			currentPageBreakdown = "[" + currentPageNumber + "] " + currentPage.name() + ": " + numberWithCommas(artboards.count()) + " //Not counted in total";
			detailedBreakdown = detailedBreakdown + "\r\n" + currentPageBreakdown;
		}
	}
	
		
	//------------------------------
	// debug
	//------------------------------
	var average = Math.round(artboardCount / pageCount);
	var instructions = '\r\nArtboard status:\r\n. Sketch file page count: ' + numberWithCommas(pageCount)  + '\r\n. Current page Artboard count: ' + numberWithCommas(curpageArtboardCount)  + '\r\n. Current file total Artboard count: ' + numberWithCommas(artboardCount) + '\r\n. Approx average: ' + average + ' artboards per page' + '\r\n\r\n' + detailedBreakdown + "\r\n______________________________\r\nTotal Artboards: " + numberWithCommas(artboardCount) + "\r\n\r\n";
	alertMsg("📟 Artboard & Page Counter", instructions)
    //doc.showMessage(instructions);
   
}


//-------------------------------------------------------------------------------
// Show an alert
//-------------------------------------------------------------------------------
function alertMsg(title, message) {
  var alert = NSAlert.alloc().init()
  alert.setMessageText(title)
  alert.setInformativeText(message)
  alert.addButtonWithTitle("Done")
  return alert.runModal()
}

//-------------------------------------------------------------------------------
// numberWithCommas
//-------------------------------------------------------------------------------
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
