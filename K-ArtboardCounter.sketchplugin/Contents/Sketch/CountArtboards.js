function onRun(context) {
	//------------------------------
	// Var
	//------------------------------
    var pageCount = 0;
    var artboardCount = 0;
    var artboardCount_S_Pages = 0;
	//var selection = context.selection;
	//var selectionCount = selection.count();
	var doc = context.document;

     
	//------------------------------
	// Current Sketch Page loop
	//------------------------------
    var curpageArtboardCount = 0;
    var curpageArtboardCount_S_Pages = 0;
	var curpageDocument = context.document.currentPage();
	var curpageArtboards = curpageDocument.artboards();
	var curpageLoop = curpageArtboards.objectEnumerator();
   	while (artboard = curpageLoop.nextObject()) {
		//if using "Auto-PDF-Exporter-nSlicer" plugin
		if (artboard.name().startsWith("[S]") && isArtboard(artboard)) { 
	   	 	curpageArtboardCount_S_Pages = curpageArtboardCount_S_Pages + 1;
		//Standard Sketch file
		}else{
	   	 	curpageArtboardCount = curpageArtboardCount + 1;
   		}
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
		cur_artboardCount = 0;
		cur_artboardCount_S_Pages = 0;
		
		//------------------------------
		// Artboard loop 
		//------------------------------
		//var artboards_for_export = []
		//var artboards_for_export_debug = "";
	   	var artboards = currentPage.artboards();
	   	var loop = artboards.objectEnumerator();
	   	while (artboard = loop.nextObject()) {
			if(currentPage.name() != "Symbols"){ //ignore symbols page
				//if using "Auto-PDF-Exporter-nSlicer" plugin
				if (artboard.name().startsWith("[S]") && isArtboard(artboard)) { 
	 		   		artboardCount_S_Pages = artboardCount_S_Pages + 1;
	 		   		cur_artboardCount_S_Pages = cur_artboardCount_S_Pages + 1;
				//Standard Sketch file
				}else{
					artboardCount = artboardCount + 1;
					cur_artboardCount = cur_artboardCount + 1;
   				}
			}
		}

		//------------------------------
		// Detailed status breakdown
		//------------------------------
		if(currentPage.name() != "Symbols"){ //ignore symbols page
			var pageStatus = numberWithCommas(cur_artboardCount);
			if (cur_artboardCount_S_Pages > 0) {
				pageStatus = numberWithCommas(cur_artboardCount) + "  |  [S] Artboards: " +cur_artboardCount_S_Pages;
			}
			currentPageBreakdown = "[" + currentPageNumber + "] " + currentPage.name() + ": " + pageStatus; 
			detailedBreakdown = detailedBreakdown + "\r\n" + currentPageBreakdown;
		}else{
			currentPageBreakdown = "[" + currentPageNumber + "] " + currentPage.name() + ": " + numberWithCommas(artboards.count()) + " //Not counted in total";
			detailedBreakdown = detailedBreakdown + "\r\n" + currentPageBreakdown;
		}
	}
	
		
	//------------------------------
	// debug
	//------------------------------
	var pageCount2 = pageCount;
	if(pageCount > 1){pageCount2 = pageCount -1}//dont count symbols page
	var average = Math.round(artboardCount / pageCount2);
	var instructions = '\r\nArtboard status:\r\n. Sketch file page count: ' + numberWithCommas(pageCount)  + '\r\n. Current page Artboard count: ' + numberWithCommas(curpageArtboardCount)  + '\r\n. Current file total Artboard count: ' + numberWithCommas(artboardCount) + '\r\n. Approx average: ' + average + ' artboards per page' + '\r\n\r\n' + detailedBreakdown + "\r\n______________________________\r\nTotal Artboards: " + numberWithCommas(artboardCount) + "\r\n\r\n";
	var instructions_S_Pages = '\r\nArtboard status:\r\n. Sketch file page count: ' + numberWithCommas(pageCount)  + '\r\n. Current page Artboard count: ' + numberWithCommas(curpageArtboardCount)  + '\r\n. Current page [S] Artboard count: ' + curpageArtboardCount_S_Pages + '\r\n. Current file total Artboard count: ' + numberWithCommas(artboardCount) + '\r\n. Approx average: ' + average + ' artboards per page' + '\r\n\r\n' + detailedBreakdown + "\r\n>[S] Artboard Count: " + artboardCount_S_Pages + " //Not counted in total\r\n______________________________\r\nTotal Artboards: " + numberWithCommas(artboardCount) + "\r\n\r\n";

	//if using "Auto-PDF-Exporter-nSlicer" plugin
	if (curpageArtboardCount_S_Pages > 0) {
		alertMsg("📟 Artboard & Page Counter", instructions_S_Pages)
	//Standard Sketch file
	}else{
		alertMsg("📟 Artboard & Page Counter", instructions)
	}
    //doc.showMessage(instructions);
	
   
}

//-------------------------------------------------------------------------------
// Returns true if the given layer is an artboard-like object (i.e. an artboard
// or a symbol master).
//-------------------------------------------------------------------------------
function isArtboard(layer) {
  return layer instanceof MSArtboardGroup || layer instanceof MSSymbolMaster;
}

//-------------------------------------------------------------------------------
// Show an alert
//-------------------------------------------------------------------------------
function alertMsg(title, message) {
  //var textField = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, 400, 1)];
  //NSTextView *accessory = [[NSTextField alloc] initWithFrame:NSMakeRect(0,0,200,15)];

  var alert = NSAlert.alloc().init()
  alert.setMessageText(title)
  alert.setInformativeText(message)
  alert.addButtonWithTitle("Done")

  //alert.setAccessoryView(accessory);
  //[accessory setEditable:NO];
	
  return alert.runModal()
}

//-------------------------------------------------------------------------------
// numberWithCommas
//-------------------------------------------------------------------------------
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
