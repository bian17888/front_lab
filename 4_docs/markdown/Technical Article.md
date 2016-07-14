# Custom directive to conditionally render wrapper element

## The Problem

Using AngularJS, I want to be able to conditionally render a HTML element with contents or just the contents of that HTML element. For example, I either want to render an `<a>` tag around some text or just the text based on some condition:

*[Language: HTML]*

    <!-- If model.hasMoreInfo (a bool value) is true,
    render link and text -->
    <a href="/moreinfo">{{model.label}}</a>
    <!-- otherwise just render text -->
    {{model.label}}    

## The Solution
The solution I have come up with is a custom directive that uses the **[ng-if][1]** type of logic/pattern under the hood that I can apply as an attribute to an element (within an immediately invoked function):

**AngularJs Directive**

*[Language: Javascript]*

    (function () {

        var directiveId = 'renderWrapIf';
        var directive = function() {
            return {
                link: function($scope, element, attributes) {
                    $scope.$watch(attributes[directiveId], 
						function ngIfWatchAction(value) {
                        if (!value) {
                            element.replaceWith(
								element.contents());
                        }
                    });
                }
            };
        };

        angular.module('app').directive(directiveId, directive);
    })();
   
  [1]: https://github.com/angular/angular.js/blob/master/src/ng/directive/ngIf.js#L3