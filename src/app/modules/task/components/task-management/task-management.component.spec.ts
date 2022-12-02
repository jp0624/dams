import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TaskMgmtComponent } from './task-management.component';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { asyncData } from '../../../../../testing/async-observable-helpers';

class MockTaskService {
    emitUrlTaskIdChange(id) {
        console.log(id);
    }

    getTaskFullInfo(id: number): Observable<any> {
        let data: any = {
            task_id: 52,
            type_id: 13,
            status_id: 2,
            name: 'test new bala',
            description: 'test new bala',
            lock_type_id: 4,
            lock_time: 1002,
            heading: '',
            display_main: 1,
            display_next: 1,
            display_innav: 1,
            groups: [
              {
                group_id: 443,
                tagname: 'Headings with Content',
                icon: 'remove_from_queue',
                order: 0,
                content: [
                  {
                    id: 862,
                    attrid: 56,
                    label: 'Heading',
                    placeholder: 'Heading',
                    default_value: 'Heading',
                    value: 'Heading',
                    type: 'text',
                    element: 'input',
                    version: 1
                  },
                  {
                    id: 863,
                    attrid: 57,
                    label: 'Sub-Heading',
                    placeholder: 'Sub-Heading',
                    default_value: 'Sub-Heading',
                    value: 'Sub-Heading',
                    type: 'text',
                    element: 'input',
                    version: 1
                  },
                  {
                    id: 864,
                    attrid: 58,
                    label: 'Content',
                    placeholder: 'Content',
                    default_value: 'Content',
                    value: 'Content',
                    type: 'textarea',
                    element: 'textarea',
                    version: 1
                  }
                ]
              },
              {
                group_id: 444,
                tagname: 'Headings with Content',
                icon: 'remove_from_queue',
                order: 1,
                content: [
                  {
                    id: 865,
                    attrid: 56,
                    label: 'Heading',
                    placeholder: 'Heading',
                    default_value: 'Heading',
                    value: 'Heading2',
                    type: 'text',
                    element: 'input',
                    version: 1
                  },
                  {
                    id: 866,
                    attrid: 57,
                    label: 'Sub-Heading',
                    placeholder: 'Sub-Heading',
                    default_value: 'Sub-Heading',
                    value: 'Sub-Heading2',
                    type: 'text',
                    element: 'input',
                    version: 1
                  },
                  {
                    id: 867,
                    attrid: 58,
                    label: 'Content',
                    placeholder: 'Content',
                    default_value: 'Content',
                    value: 'Content2',
                    type: 'textarea',
                    element: 'textarea',
                    version: 1
                  }
                ]
              }             
            ],
            dictionary: []
        };

        return asyncData(data);
    }
}

describe('Task Management Component', ()=>{
    
    let comp: TaskMgmtComponent;
    //let fixture: ComponentFixture<TaskMgmtComponent>;
    let service: TaskService;
    let route: ActivatedRoute;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [
                TaskMgmtComponent,
                { provide: TaskService, useClass: MockTaskService },
                { provide: ActivatedRoute, useValue: {snapshot: { params: of({id: 51}) }} }
            ]
        });
        //fixture = TestBed.createComponent(TaskMgmtComponent);
        //comp = fixture.componentInstance;
        //fixture.detectChanges();
        comp = TestBed.get(TaskMgmtComponent);
        service = TestBed.get(TaskService);
        // comp.task
        // activatedRoute = new ActivatedRouteStub();
        // route = TestBed.get(ActivatedRoute);
    });

    it ('should tasktype and service results', () => {
        expect(comp.tasktype.length > 0).toBeLessThan(1);
        //comp.ngOnInit();
        service.getTaskFullInfo(51).subscribe(result => {
            console.log(result);

            expect(result.groups.length).toBeGreaterThan(1);
        })
    });

    afterEach(() => {
        comp = null;
    })
});