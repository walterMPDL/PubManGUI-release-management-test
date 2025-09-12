import {
  afterNextRender,
  ContentChild, ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Optional, QueryList, Renderer2,
  Self,
  ViewChild, ViewChildren,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import { AbstractControl, AbstractControlDirective, ControlContainer, NgControl } from "@angular/forms";
import { ValidationErrorComponent } from "../components/item-edit/validation-error/validation-error.component";

/**
 * Directive to automatically handle bootstrap-styled validation for form controls.
 * It observes the validation state of a form control or group and dynamically appends validation error messages
 * as a sibling element, either above or below the form control, based on the specified configuration.
 *
 * This directive works with Angular forms, including reactive forms and template-driven forms. It supports
 * validation state detection for individual controls as well as grouped controls.
 *
 * The directive also manages the DOM structure by inserting or appending validation error messages
 * at the appropriate position relative to the input element, taking into account Bootstrap's input-group structure.
 *
 * The validation error messages are rendered using the `ValidationErrorComponent`, which is dynamically created
 * and positioned within the DOM using Angular's rendering utilities.
 *
 * The directive can be used with the following selectors:
 * - formControlName
 * - ngModel
 * - formControl
 * - formArray
 * - formArrayName
 * - formGroup
 * - formGroupName
 *
 * The `validationMessagePosition` property determines the placement of the validation error message and can
 * take the following values:
 * - 'top': The error message is displayed above the form control.
 * - 'bottom': The error message is displayed below the form control (default).
 * - 'ignore': Suppresses the rendering of validation error messages.
 *
 * Host element's invalid state is dynamically tracked, and the `is-invalid` class is applied to the form control
 * when it is in an invalid state.
 */
@Directive({
  selector: '.accordion-item'

})

export class AccordionGroupValidationDirective {

  /*
  @ContentChildren(NgControl, {descendants: true}) controlChildren!: QueryList<NgControl>;
  @ContentChildren(ControlContainer, {descendants: true}) containerChildren!: QueryList<ControlContainer>;
  @ContentChildren(ValidationErrorComponent, {descendants: true}) errorChildren!: QueryList<ValidationErrorComponent>;
*/
  private accordionButtonElement?: Element;


  constructor(private elementRef: ElementRef
  ) {
  }

  ngAfterViewInit() {
    this.accordionButtonElement = this.elementRef?.nativeElement.querySelector('.accordion-button');

  }

  ngAfterViewChecked() {
    this.addRemoveValidationInfoToHeader();
  }


  private addRemoveValidationInfoToHeader() {
    const invalid = this.elementRef.nativeElement.querySelector('.ng-invalid') !== null;
    /*
    const invalid = this.controlChildren?.some(c => c.invalid || false) ||
      this.containerChildren?.some(c => c.invalid || false) ||
      this.errorChildren?.some(ve => ve.errorMessages && ve.errorMessages.length > 0);
    */
    const symbol = this.accordionButtonElement?.querySelector(".bi");
    //console.log("symbol", validationSymbol);
    if (invalid) {
      if (!symbol) {
        console.log("Append")
        this.accordionButtonElement?.insertAdjacentHTML('beforeend', '<span class="bi bi-exclamation-circle-fill ms-1"></span>');
      }
    }
    else {
      symbol?.remove();
    }
  }
  /*

  private findAccordionHeader(htmlElement: HTMLElement | null | undefined): Element | null {
    if (htmlElement) {

      if (htmlElement?.classList?.contains('accordion-item')) {
        const heading = htmlElement.querySelector('h2 button');
        //console.log("Heading found", heading);
        //console.log(heading);
        return heading;
      } else {
        return this.findAccordionHeader(htmlElement?.parentElement);
      }
    }
    return null;
  }

   */

}
