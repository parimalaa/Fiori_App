sap.ui.define([
    "krones/SAPKmarkService/controller/BaseController",
    "krones/SAPKmarkService/model/ErrorHandler"
], function (BaseController, ErrorHandler) {
    "use strict";

    return BaseController.extend("krones.SAPKmarkService.controller.ErrorHandler", {

        onDisplayNotFound: function (oEvent) {
            // display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("notFound", {
                fromTarget: "ErrorHandler"
            });
        },

        onInit: function () {
            var oModel;
            var oData = {
                "HasChanges": false,
                "IsBusy": false,
                "NewValueHolder": {}
            };
            oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel, "viewmodel");

            var oRouter = this.getRouter();
            oRouter.getRoute("errorHandler").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {

        },
        _resetAll: function (oEvent) {
            this.setModelProperty(false, "viewmodel", "/HasChanges", false);
            this.setModelProperty(false, "viewmodel", "/IsBusy", false);
            this._clearAllFilters();
        },

        onViewRefresh: function (oEvent) {
            this._resetAll(oEvent);
        },
        onViewSave: function (oEvent) {
            //3. Show property not available in model dialog
            this.setModelProperty(false, "viewmodel", "/HasChange", false);
        },
        onViewCreate: function (oEvent) {
            //1. Set viewmodel HasChanges to enable buttons
            this.setModelProperty(false, "viewmodel", "/HasChanges", true);
        },
        onViewDelete: function (oEvent) {
            //2. Show model not available dialog
            this.setModelProperty(false, "viewmode", "/HasChanges", true);
        },

        onViewTestUndefinedModel: function (oEvent) {
            var oModel;
            ErrorHandler.showModelError(oModel);
        },

        onViewTestEmptyModel: function (oEvent) {
            var oModel = new sap.ui.model.json.JSONModel({});
            ErrorHandler.showModelError(oModel);
        }
    });
}); 
 
