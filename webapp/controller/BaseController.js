
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "krones/SAPKmarkService/model/formatter",
    "krones/SAPKmarkService/model/ErrorHandler"
], function (Controller, History, Filter, FilterOperator, formatter, ErrorHandler) {
    "use strict";

    return Controller.extend("krones.SAPKmarkService.controller.BaseController", {
        formatter: formatter,

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        hookKeydown: function () {
            var that = this;
            //Add handler for keyinput
            jQuery(document).keydown(function (oEvent) { that.keyDownEvent(oEvent); });
        },

        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("mainpage", {}, true /*no history*/);
            }
        },

        setModelProperty: function (bIsGlobal, sModelName, sPropertyPath, sPropertyValue) {
            var oModel = this._getModel(bIsGlobal, sModelName);

            if (oModel !== undefined) {
                if (this._checkPropertyExists(oModel, sModelName, sPropertyPath) === true) {
                    oModel.setProperty(sPropertyPath, sPropertyValue);
                }
            }
        },

        getModelProperty: function (bIsGlobal, sModelName, sPropertyPath) {
            var oModel, oValue;
            oValue = "";
            oModel = this._getModel(bIsGlobal, sModelName);

            if (oModel !== undefined) {
                if (this._checkPropertyExists(oModel, sModelName, sPropertyPath) === true) {
                    oValue = oModel.getProperty(sPropertyPath);
                }
            }
            return oValue;
        },

        _getModel: function (bIsGlobal, sModelName) {
            var oModel;
            if (bIsGlobal === true) {
                oModel = sap.ui.getCore().getModel(sModelName);
            } else {
                oModel = this.getView().getModel(sModelName);
            }

            if (oModel === undefined) {
                ErrorHandler.showError({
                    "name": formatter.getText("BaseController.modelNotAvailable.error.name"),
                    "message": formatter.getText("BaseController.modelNotAvailable.error.message", [sModelName])
                });
            }
            return oModel;
        },

        _checkPropertyExists: function (oModel, sModelName, sPropertyPath) {
            var oValue;
            oValue = oModel.getProperty(sPropertyPath);
            if (oValue === null || oValue === undefined) {
                ErrorHandler.showError({
                    "name": formatter.getText("BaseController.propertyNotAvailable.error.name"),
                    "message": formatter.getText("BaseController.propertyNotAvailable.error.message", [sPropertyPath, sModelName])
                });
                return false;
            }
            return true;
        },

        //sap.ui.table helper to clear all filters of all tables
        _clearAllFilters: function () {
            var aTables = jQuery(".sapUiTable");
            if (aTables.length > 0) {
                var that = this;
                jQuery.each(aTables, function (index, obj) {
                    var sIdTable = obj.id.split("--")[1];
                    var oTable = that.getView().byId(sIdTable);
                    that._oFilter = null;
                    that._filter(sIdTable);
                    if (oTable !== undefined && oTable.filter !== undefined) {
                        var aColumns = oTable.getColumns();
                        for (var i = 0; i < aColumns.length; i++) {
                            try {
                                oTable.filter(aColumns[i], null);
                                aColumns[i].setFilterValue("");
                            } catch (err) {
                                sap.m.MessageToast.show(err.message);
                            }
                        }
                    }
                });
            }
        },

        //sap.ui.table helper to set filter
        _filter: function (sIdTable) {
            var oFilter = null;
            oFilter = this._oFilter;
            var oTbl = this.getView().byId(sIdTable);

            if (oTbl !== undefined && oTbl.getBinding("rows") !== undefined && oTbl.getBinding("rows").filter !== undefined) {
                oTbl.getBinding("rows").filter(oFilter, "Application");
            }
        },

        //sap.ui.table helper filter table
        onFilterData: function (oEvent) {
            var oColumn = oEvent.getParameter("column");
            var oTable = oEvent.getSource();
            var sIdTable = oTable.getId().split("--")[1];
            oEvent.preventDefault();
            var sValue = oEvent.getParameter("value");
            function clear() {
                this._oFilter = null;
                oColumn.setFiltered(false);
                this._filter(sIdTable);
            }
            if (!sValue) {
                clear.apply(this);
                return;
            }
            if (sValue.trim().length > 0) {
                this._oFilter = new Filter(oColumn.getFilterProperty(), FilterOperator.Contains, sValue);
                oColumn.setFiltered(true);
                this._filter(sIdTable);
            } else {
                clear.apply(this);
            }
        },

        keyDownEvent: function (oKeyEventArgs) {
            switch (true) {
                case oKeyEventArgs.keyCode === "116": //Prevent page reload F5 Key
                    this._cancelBubble(oKeyEventArgs);
                    break;
                case oKeyEventArgs.keyCode === "8": //Prevent navigating backwards when pressing backspace
                    if (this._getActive() === false) {
                        this._cancelBubble(oKeyEventArgs);
                    }
                    break;
                default:
                    break;
            }
        },

        _cancelBubble: function (oEvent) {
            var evt = oEvent ? oEvent : window.event;
            if (evt.preventDefault) { evt.preventDefault(); }
            if (evt.stopPropagation) { evt.stopPropagation(); }
            if (evt.cancelBubble !== null) { evt.cancelBubble = true; }
        },


        _getActive: function () {
            var activeObj = document.activeElement;
            var inFocus = false;
            if (activeObj.tagName === "INPUT" || activeObj.tagName === "TEXTAREA") {
                inFocus = true;
            }
            return inFocus;
        },

        getText: function (sText, aParams) {
            return formatter.getText(sText, aParams);
        }

    });

}); 
 
