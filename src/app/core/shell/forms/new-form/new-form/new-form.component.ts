import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
 selector: 'new-form',
 templateUrl: './new-form.component.html'
})
export class NewFormComponent implements OnInit {
   @Input()
     inputArray //: ArrayType[];
     
   myForm: FormGroup;

   constructor(private fb: FormBuilder) {}

   get formData() {
        return <FormArray> this.myForm.get('formArray');
   }

   ngOnInit(): void {
       let newForm = this.fb.group({
           appearsOnce: ['InitialValue', [Validators.required, Validators.maxLength(25)]],
           formArray: this.fb.array([])
       });

       const arrayControl = <FormArray>newForm.controls['formArray'];
       this.inputArray.forEach(item => {

           let newGroup = this.fb.group({
               itemPropertyOne: ['InitialValue', [Validators.required]],
               itemPropertyTwo: ['InitialValue', [Validators.minLength(5), Validators.maxLength(20)]]
           });

           arrayControl.push(newGroup);
       });

       this.myForm = newForm;
   }
   addInput(): void {
       const arrayControl = <FormArray>this.myForm.controls['formArray'];
       let newGroup = this.fb.group({
          appearsOnce: ['InitialValue', [Validators.required, Validators.maxLength(25)]],
          formArray: this.fb.array([])
           /* Fill this in identically to the one in ngOnInit */
       });
       arrayControl.push(newGroup);
   }
   delInput(index: number): void {
       const arrayControl = <FormArray>this.myForm.controls['formArray'];
       arrayControl.removeAt(index);
   }
   onSubmit(): void {
       //console.log(this.myForm.value);
       // Your form value is outputted as a JavaScript object.
       // Parse it as JSON or take the values necessary to use as you like
   }
}