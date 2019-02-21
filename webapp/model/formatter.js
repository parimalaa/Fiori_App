sap.ui.define([], function () {
    "use strict";
    return {
        
        getText: function (sText, aParams) {
            var i18nModel;
            if (document.location.href.indexOf("webapp/test") > -1) {
                i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleName: "krones.SAPKmarkService.i18n.i18n",
                    bundleLocale: "en"
                });
            }
            else {
                i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleName: "krones.SAPKmarkService.i18n.i18n"
                });
            }
            return i18nModel.getResourceBundle().getText(sText, aParams);
        },

        // titlePrinterModel: function (bIsSelected) {
        //     if (bIsSelected === true) {
        //         return this.getText("CreateUpdatePrinterModel.fragment.UpdateTitle");
        //     }
        //     return this.getText("CreateUpdatePrinterModel.fragment.NewTitle");
        // },

        // getTitleForCreateUpdateMaterialFragment: function (bIsUpdate) {
        //     if (bIsUpdate === true) {
        //         return this.getText("CreateUpdateMaterial.fragment.UpdateTitle");
        //     }
        //     return this.getText("CreateUpdateMaterial.fragment.CreateTitle");
        // },

        // getTitleForCreateUpdateLabelIdentifierFragment: function (bIsUpdate) {
        //     if (bIsUpdate === true) {
        //         return this.getText("CreateUpdateLabelIdentifier.fragment.UpdateTitle");
        //     }
        //     return this.getText("CreateUpdateLabelIdentifier.fragment.CreateTitle");
        // },

        createRandomString: function (iStringLength) {
            var sText = "";
            var sPossibleCharacters = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

            for (var i = 0; i < iStringLength; i++) {
                sText += sPossibleCharacters.charAt(Math.floor(Math.random() * sPossibleCharacters.length));
            }

            return sText;
        },

        // rgbToHexColor: function (cHex) {
        //     var hexColor = Number(cHex).toString(16);
        //     return hexColor.length < 2 ? "0" + hexColor : hexColor;
        // },

        // hexValueToColor: function (r, g, b) {
        //     return this.rgbToHexColor(r) + this.rgbToHexColor(g) + this.rgbToHexColor(b);
        // },

        bitToBool: function (iBit) {
            switch (true) {
                case iBit === 1:
                    return true;
                case iBit === 0:
                    return false;
                default:
                    return iBit;
            }
        }
    };
}); 
 
