if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
if (typeof __param !== "function") __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
/**
 * A domain model we are binding the form controls to.
 */
var CheckoutModel = (function () {
    function CheckoutModel() {
        this.country = "Canada";
    }
    return CheckoutModel;
})();
/**
 * This is a component that displays an error message.
 *
 * For instance,
 *
 * <show-error control="creditCard" [errors]="['required', 'invalidCreditCard']"></show-error>
 *
 * Will display the "is required" error if the control is empty, and "invalid credit card" if the
 * control is not empty
 * but not valid.
 *
 * In a real application, this component would receive a service that would map an error code to an
 * actual error message.
 * To make it simple, we are using a simple map here.
 */
var ShowError = (function () {
    function ShowError(formDir) {
        this.formDir = formDir;
    }
    Object.defineProperty(ShowError.prototype, "errorMessage", {
        get: function () {
            var c = this.formDir.form.find(this.controlPath);
            for (var i = 0; i < this.errorTypes.length; ++i) {
                if (c && c.touched && c.hasError(this.errorTypes[i])) {
                    return this._errorMessage(this.errorTypes[i]);
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ShowError.prototype._errorMessage = function (code) {
        var config = { 'required': 'is required', 'invalidCreditCard': 'is invalid credit card number' };
        return config[code];
    };
    ShowError = __decorate([
        angular2_1.Component({ selector: 'show-error', properties: ['controlPath: control', 'errorTypes: errors'] }),
        angular2_1.View({
            template: "\n    <span *ng-if=\"errorMessage !== null\">{{errorMessage}}</span>\n  ",
            directives: [angular2_1.NgIf]
        }),
        __param(0, angular2_1.Ancestor()), 
        __metadata('design:paramtypes', [angular2_1.NgForm])
    ], ShowError);
    return ShowError;
})();
var CheckOutController = (function () {
    function CheckOutController() {
        this.model = new CheckoutModel();
        this.countries = ['US', 'Canada'];
    }
    CheckOutController.prototype.onSubmit = function () {
        console.log("Submitting:");
        console.log(this.model);
    };
    CheckOutController = __decorate([
        angular2_1.Component({ selector: 'template-driven-forms' }),
        angular2_1.View({
            template: "\n    <h1>Checkout Form</h1>\n\n    <form (ng-submit)=\"onSubmit()\" #f=\"form\">\n      <p>\n        <label for=\"firstName\">First Name</label>\n        <input type=\"text\" id=\"firstName\" ng-control=\"firstName\" [(ng-model)]=\"model.firstName\" required>\n        <show-error control=\"firstName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"middleName\">Middle Name</label>\n        <input type=\"text\" id=\"middleName\" ng-control=\"middleName\" [(ng-model)]=\"model.middleName\">\n      </p>\n\n      <p>\n        <label for=\"lastName\">Last Name</label>\n        <input type=\"text\" id=\"lastName\" ng-control=\"lastName\" [(ng-model)]=\"model.lastName\" required>\n        <show-error control=\"lastName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"country\">Country</label>\n        <select id=\"country\" ng-control=\"country\" [(ng-model)]=\"model.country\">\n          <option *ng-for=\"#c of countries\" [value]=\"c\">{{c}}</option>\n        </select>\n      </p>\n\n      <p>\n        <label for=\"creditCard\">Credit Card</label>\n        <input type=\"text\" id=\"creditCard\" ng-control=\"creditCard\" [(ng-model)]=\"model.creditCard\" required>\n        <show-error control=\"creditCard\" [errors]=\"['required', 'invalidCreditCard']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"amount\">Amount</label>\n        <input type=\"number\" id=\"amount\" ng-control=\"amount\" [(ng-model)]=\"model.amount\" required>\n        <show-error control=\"amount\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"email\">Email</label>\n        <input type=\"email\" id=\"email\" ng-control=\"email\" [(ng-model)]=\"model.email\" required>\n        <show-error control=\"email\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"comments\">Comments</label>\n        <textarea id=\"comments\" ng-control=\"comments\" [(ng-model)]=\"model.comments\">\n        </textarea>\n      </p>\n\n      <button type=\"submit\" [disabled]=\"!f.form.valid\">Submit</button>\n    </form>\n  ",
            directives: [angular2_1.formDirectives, angular2_1.NgFor, ShowError]
        }), 
        __metadata('design:paramtypes', [])
    ], CheckOutController);
    return CheckOutController;
})();
angular2_1.bootstrap(CheckOutController);
