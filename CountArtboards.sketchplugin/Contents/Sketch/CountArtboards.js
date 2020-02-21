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
	let pages = context.document.pages();
	var names = []
	// Filter layers using NSPredicate
	for(var i = 0; i < pages.length; i++) {
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
		   artboardCount = artboardCount + 1;
		}		
	}
	
		
	//------------------------------
	// debug
	//------------------------------
	var average = artboardCount / pageCount;
	var instructions = '. Current page artboard count: ' + curpageArtboardCount  + '\r\n. Total sketch file artboard count: ' + artboardCount + '\r\n. Total page Count: ' + pageCount  + '\r\n. Approx average: ' + average + ' artboards per page.';
	alertMsg("📟 Page/Artboard Counter", instructions)
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
