/**
 * @PVCONTEXT {PVEDITOR}
 * @PVLABEL {Change Type}
 * @PVMENUID {}
 *   Possible menu identifiers (see also IMenuInfo):
 *     com.ps.consul.eclipse.ui.editors.fm.contextmenu
 *     com.ps.consul.eclipse.ui.editors.ccfm.contextmenu
 *     com.ps.consul.eclipse.ui.editors.vdm.contextmenu
 *     com.ps.consul.eclipse.ui.editors.fm.contextmenu.refactor
 *     com.ps.consul.eclipse.ui.editors.ccfm.contextmenu.refactor
 * @PVSECTIONID {}
 *   Possible section identifiers (see also IMenuInfo):
 *     edit
 *     refactor
 */

//context object of pure::variants
var pv_context = pure_variants();

//check if the calling context is correct
if (pv_context.isEditorContext() == false) throw new java.lang.Exception("Invalid invocation context!" +
"\n\nInvocation context must be a pure::variants editor.\n\n");

//get context model
var model = pv_context.getContextModel();
//create model operation in order to chnage the model
var operation = pv_context.changeModel(model);

//iterate all elements of the model
var idx = model.getElementList().iterator();
var filename = "console.java";
var fo = new java.io.FileWriter(new java.io.File(pv_module.getOutput(), filename));
while (idx.hasNext() == true) {
	var element = idx.next();
	var elementType = element.getType();
	if (elementType === "ps:pvscltext") {
		var toChange = new Element(operation.change(element));
		toChange.setType("js:raul");
	}

}

//apply all changes to the model
pv_context.updateModel(operation);
//save the model
pv_context.saveModel(model);