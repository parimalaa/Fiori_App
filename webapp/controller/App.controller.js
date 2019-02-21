sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	'sap/f/library'
], function (JSONModel, Controller, fioriLibrary) {
	"use strict";

	return Controller.extend("NCProgrammingBasket.krones.s4.controller.App", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		},
		

		onBeforeRouteMatched: function(oEvent) {
			var oModel = this.oOwnerComponent.getModel(),
				sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		},

		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			// Save the current route name
			this.currentRouteName = sRouteName;
			this.currentProduct = oArguments.product;
		},

		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct}, true);
			}
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		}
	});
});


// sap.ui.define([
//     "krones/SAPKmarkService/controller/BaseController",
//     "krones/SAPKmarkService/model/formatter"
// ], function (BaseController, formatter) {
// 	"use strict";

//     return BaseController.extend("krones.SAPKmarkService.controller.App", {
//         onInit: function () {

//             document.title = formatter.getText("App.Title");

//             this.hookKeydown();
//         }
// 	});
// }); 
 
