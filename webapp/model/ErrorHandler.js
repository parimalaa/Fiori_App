sap.ui.define(["krones/SAPKmarkService/model/formatter"], function (formatter) {
    "use strict";
    return {

        _hasModelError: function (oModel) {
            switch (true) {
                //recieved undefined model
                case oModel === undefined:
                    return true;
                    break;
                //recieved model without data
                case oModel.getJSON() === "{}":
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        },

        showError: function (oError) {
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.error(
                oError.message, {
                    id: "id_ErrorMessage",
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: oError.name,
                    actions: [sap.m.MessageBox.Action.OK]
                }
            );
        },

        showModelError: function (oModel) {
            if (this._hasModelError(oModel)) {
                var sErrorMsg = "";
                var sErrorName = "";

                switch (true) {
                    case oModel === undefined:
                        sErrorMsg = formatter.getText("ErrorHandler.showModelError.modelUndefinedMessage");
                        sErrorName = formatter.getText("ErrorHandler.showModelError.modelUndefinedName");
                        break;
                    case oModel.getJSON() === "{}":
                        sErrorMsg = formatter.getText("ErrorHandler.showModelError.noDataErrorMessage");
                        sErrorName = formatter.getText("ErrorHandler.showModelError.noDataErrorName");
                        break;
                    default:
                        break;
                }

                this.showError({
                    "name": sErrorName,
                    "message": sErrorMsg
                });

                return true;
            }
            return false;
        }
    };
}); 
 
