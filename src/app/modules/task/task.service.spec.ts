import { TestBed, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Task Service', ()=> {
    let servicelocal: TaskService;
    let httpMock: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpModule, HttpClientModule, HttpClientTestingModule],
            providers: [TaskService, GlobalService, HttpClient]
        })

        servicelocal = TestBed.get(TaskService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it ('should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
    }))

    it ('Get all tasks', () => {

        const tasksDummy : any[] = [
            {
              status: 'active',
              id: 31,
              type: 'Splash Page',
              name: 'intro',
              description: ''
            },
            {
              status: 'active',
              id: 32,
              type: 'Question',
              name: 'question task 1',
              description: 'question task 1 description'
            }
        ];

        servicelocal.getAllTasks().subscribe(tasks => {
            // servicelocal.apiUrl
            expect(tasks.length).toBe(2);
            expect(tasks).toEqual(tasksDummy);
        })

        const httpCli = httpMock.expectOne(`${servicelocal.apiUrl}`);

        expect(httpCli.request.method).toBe('GET');

        httpCli.flush(tasksDummy);

    })

    afterEach(()=>{
        httpMock.verify();
    })
})