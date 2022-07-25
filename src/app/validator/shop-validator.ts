import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidator {

  static notOnlyWhiteSpace(control: FormControl){
    //check if string only contains whitespace

    return ((control.value != null) && (control.value.trim().length === 0))?  {'notOnlyWhiteSpace': true}: null
  }
}
