import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SecureLS from 'secure-ls';


@Injectable({
  providedIn: 'root'
})
export class GlobalData {
  private ls = new SecureLS({ encodingType: 'aes', isCompression: true });
  private JOB_LIST_KEY = 'JobList';

  // Reactive stream of jobs
  private jobListSubject = new BehaviorSubject<any[]>(this.getJobList());
  jobList$ = this.jobListSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.JOB_LIST_KEY) {
        const updatedList = this.getJobList();
        this.jobListSubject.next(updatedList);
      }
    });
  }

  getJobList(): any[] {
    const data = this.ls.get(this.JOB_LIST_KEY);
    return data ? data : [];
  }

  saveJobList(jobList: any[]): void {
    this.ls.set(this.JOB_LIST_KEY, jobList);
    this.jobListSubject.next(jobList);
  }

  clearJobList(): void {
    this.ls.remove(this.JOB_LIST_KEY);
    this.jobListSubject.next([]);
  }

}