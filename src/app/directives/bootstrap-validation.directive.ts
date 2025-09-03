import { Directive, ElementRef, HostBinding, Optional, Self, ViewContainerRef } from '@angular/core';
import { AbstractControl, AbstractControlDirective, ControlContainer, NgControl } from "@angular/forms";
import { ValidationErrorComponent } from "../components/item-edit/validation-error/validation-error.component";

@Directive({
  selector: '[formControlName],[ngModel],[formControl],[formArray],[formArrayName]'
})
/**
 * BootstrapValidationDirective is an Angular directive that applies Bootstrap validation classes to form controls.
 * It binds the `is-invalid` class to a form control based on its validation state.
 *
 * The directive checks if the form control is invalid and has been touched. If both conditions are met,
 * the `is-invalid` class is dynamically applied, which aligns with Bootstrap's styling conventions for invalid inputs.
 *
 * This directive works with Angular's `formControlName`, `ngModel`, and `formControl` directives.
 *
 * Dependencies:
 * - NgControl: Injected to access the form control associated with the directive.
 */
export class BootstrapValidationDirective {


  constructor(@Self() @Optional() private cd: NgControl, @Self() @Optional() private cont: ControlContainer, private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {



    //const msg = document.createElement("<div class='pure-invalid'>Automatic validation directive</div>");
    //elementRef.nativeElement.parent.appendChild(msg);

  }

  ngOnInit() {
    console.log(this.cont?.name);
    const errorCompRef = this.viewContainerRef.createComponent(ValidationErrorComponent);
    if(this.cd?.control) {
      errorCompRef.instance.control = this.cd.control;
    }
    else if (this.cont?.control) {
      errorCompRef.instance.control = this.cont.control;
    }

  }

  @HostBinding('class.is-invalid')
  get isInvalid(): boolean {
    console.log("Check BootstrapValidation Directive");
    const control = this.cd?.control || this.cont?.control;
    return control ? control.invalid : false;
  }

}
