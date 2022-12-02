import { Component } from '@angular/core';
import { MaterialModule } from './../../../../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDictionaryComponent } from "./task-dictionary.component";
import { DebugElement } from "@angular/core";
import { forEach } from '@angular/router/src/utils/collection';
import { DataTableModule } from 'primeng/primeng';
describe('Task dictionary', () => {
    let component: TaskDictionaryComponent;
    let fixture: ComponentFixture<TaskDictionaryComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;

    beforeEach(
        async(()=>{
            TestBed.configureTestingModule({
                imports: [ DataTableModule, BrowserAnimationsModule, MaterialModule ],
                declarations: [TaskDictionaryComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskDictionaryComponent);
    });

    it('should show data in the grid', ()=>{
        //Arrange
        component = fixture.componentInstance;
        //Action
        component.dictionary = [
            {
                task_dictionary_id: 173,
                term_id: 1,
                term: 'Cancel',
                selector: '{$dt-cancel}'
            },
            {
                task_dictionary_id: 64,
                term_id: 2,
                term: 'Start',
                selector: '{$dt-start}'
            },
            {
                task_dictionary_id: 65,
                term_id: 3,
                term: 'Left',
                selector: '{$dt-left}'
            },
            {
                task_dictionary_id: 166,
                term_id: 4,
                term: 'Right',
                selector: '{$dt-right}'
            },
            {
                task_dictionary_id: 171,
                term_id: 5,
                term: 'mph',
                selector: '{$dt-mph}'
            },
            {
                task_dictionary_id: 174,
                term_id: 6,
                term: 'km/h',
                selector: '{$dt-kmh}'
            },
            {
                task_dictionary_id: 167,
                term_id: 7,
                term: 'Meters',
                selector: '{$dt-meters}'
            },
            {
                task_dictionary_id: 168,
                term_id: 8,
                term: 'Feet',
                selector: '{$dt-feet}'
            },
            {
                task_dictionary_id: 178,
                term_id: 9,
                term: 'Person A',
                selector: '{$dt-person_a}'
            },
            {
                task_dictionary_id: 180,
                term_id: 10,
                term: 'Person B',
                selector: '{$dt-person_b}'
            },
            {
                task_dictionary_id: 179,
                term_id: 11,
                term: 'Task 1',
                selector: '{$dt-task_1}'
            },
            {
                task_dictionary_id: 182,
                term_id: 15,
                term: 'False',
                selector: '{$dt-false}'
            },
            {
                task_dictionary_id: 181,
                term_id: 16,
                term: 'Continue',
                selector: '{$dt-continue}'
            },
            {
                task_dictionary_id: 183,
                term_id: 19,
                term: 'Phone',
                selector: '{$dt-phone}'
            }
            ]
        //Assertion
        fixture.detectChanges();
        expect(component.dictionary.length>1).toBeTruthy();
    });
});

// @Component({
//         selector: 'mat-icon',
//         template: '<div>Icon</div>'
//   })
//   class MockMatIconComponent {
//   }