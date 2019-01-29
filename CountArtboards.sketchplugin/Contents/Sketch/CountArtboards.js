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
	// Page loop
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
    doc.showMessage('Page Count.  "' + pageCount + '"    |    Artboard Count.  "' + artboardCount + '"');
   
}