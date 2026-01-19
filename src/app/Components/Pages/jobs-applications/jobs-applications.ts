import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GlobalData } from '../../../Services/global-data';


@Component({
  selector: 'app-jobs-applications',
  standalone: false,
  templateUrl: './jobs-applications.html',
  styleUrl: './jobs-applications.scss',
  providers: [ConfirmationService,MessageService]

})
export class JobsApplications implements OnInit {
  jobs: JobInterface[] = [];
  filteredJobs: JobInterface[] = [];
  searchTerm = '';
  isCalendarView = true;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    height: 'auto',
    eventDisplay: 'block',
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false }, // default
    displayEventTime: false,
    selectable: true,
    selectMirror: true,
    editable: false,
    dayMaxEventRows: true,
    dateClick: this.onDateClick.bind(this),
    eventClick: this.onEventClick.bind(this),
    eventDidMount: this.addDeleteButtonToEvent.bind(this)
  };


  displayAddJobDialog = false;
  isEditing = false;
  editingJobId: number | null = null;
  newJob: JobInterface = {
    id: 0,
    company: '',
    position: '',
    status: 'Draft',
    date: new Date(),
    location: '',
    salary: null,
    hrPerson: '',
    website: '',
    source: '',
    notes: ''
  };
  statusOptions = ['Draft', 'Applied', 'Interviewing', 'Accepted', 'Rejected'];

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private globalData : GlobalData) {}

  ngOnInit() {
    const storedJobs = this.globalData.getJobList();
    this.jobs = storedJobs.map(job => ({
      ...job,
      date: job.date ? new Date(job.date) : null
    }));
    this.filteredJobs = [...this.jobs];
    this.updateCalendarEvents();
  }

  updateCalendarEvents() {
    this.calendarOptions.events = this.filteredJobs.map(job => ({
      title: `${job.company} - ${job.position}`,
      date: job.date,
      id: String(job.id),      
      color: this.getStatusColor(job.status)
    }));
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'applied': return '#42A5F5';
      case 'draft': return '#9E9E9E';
      case 'interviewing': return '#FFB300';
      case 'accepted': return '#66BB6A';
      case 'rejected': return '#EF5350';
      default: return '#607D8B';
    }
  }

  toggleView() {
    this.isCalendarView = !this.isCalendarView;
  }

  addJob() {
    this.isEditing = false;
    this.editingJobId = null;
    this.newJob = {
      id: this.jobs.length + 1,
      company: '',
      position: '',
      status: 'Draft',
      date: new Date(),
      location: '',
      salary: null,
      hrPerson: '',
      website: '',
      source: '',
      notes: ''
    };
    this.displayAddJobDialog = true;
  }

  saveJob(form?: any) {
    if (!this.newJob.company || !this.newJob.position || !this.newJob.status || !this.newJob.date) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Missing required fields', life: 3000 });
      return;
    }
  if (this.isEditing && this.editingJobId !== null) {
    // Update existing job
    const index = this.jobs.findIndex(j => j.id === this.editingJobId);
    if (index !== -1) {
      this.jobs[index] = { ...this.newJob };
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job edited successfuly', life: 3000 });

  } else {
    this.jobs.push({ ...this.newJob });
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Job added successfuly', life: 3000 });
  }

  console.log(this.jobs)
  this.filteredJobs = [...this.jobs];
  this.updateCalendarEvents();
  this.globalData.saveJobList(this.jobs);
  this.displayAddJobDialog = false;
  this.isEditing = false;
  this.editingJobId = null;

  }

  editJob(job: JobInterface) {
    this.isEditing = true;
    this.editingJobId = job.id;
    this.newJob = { ...job };
    this.displayAddJobDialog = true;
  }

  deleteJob(job: JobInterface) {
    this.jobs = this.jobs.filter(j => j.id !== job.id);
    this.filteredJobs = this.jobs;
    this.updateCalendarEvents();
    this.globalData.saveJobList(this.jobs);
  }

  confirmDelete(event: Event, job: JobInterface) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
       icon: 'pi pi-info-circle',
       rejectLabel: 'Cancel',
       rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.deleteJob(job)
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {},
    });
  }

  onDateClick(arg: any) {
    const clickedDate = new Date(arg.dateStr);
    this.isEditing = false;
    this.newJob = {
      id: this.jobs.length + 1,
      company: '',
      position: '',
      status: 'Draft',
      date: clickedDate,
      location: '',
      salary: null,
      hrPerson: '',
      website: '',
      source: '',
      notes: ''
    };
    this.displayAddJobDialog = true;
  }

  onEventClick(info: any) {
    const jobId = info.event.id;
    const selectedJob = this.jobs.find(j => j.id === +jobId);
    if (!selectedJob) return;

    this.isEditing = true;
    this.editingJobId = selectedJob.id;
    this.newJob = { ...selectedJob };
    this.displayAddJobDialog = true;
  }


  addDeleteButtonToEvent(arg: any) {
    // Skip headers, only apply to event elements
    if (!arg.el.classList.contains('fc-daygrid-event')) return;

    // Clear any previous children (optional)
    const titleEl = arg.el.querySelector('.fc-event-title');
    if (!titleEl) return;

    // Make the container a flexbox
    titleEl.style.display = 'flex';
    titleEl.style.justifyContent = 'space-between';
    titleEl.style.alignItems = 'center';

    // Create delete icon
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '<i class="pi pi-trash" style="color:white; cursor:pointer;"></i>';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent eventClick
      const jobId = arg.event.id;
      const selectedJob = this.jobs.find(j => j.id === +jobId);
      this.confirmDelete(arg,selectedJob!);
    });

    // Append icon to event element
    if (titleEl) titleEl.appendChild(deleteBtn);
  }



  filterJobs() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.filteredJobs = [...this.jobs];
    return;
  }

  this.filteredJobs = this.jobs.filter(job => {
    return (
      job.company.toLowerCase().includes(term) ||
      job.position.toLowerCase().includes(term) ||
      job.status.toLowerCase().includes(term) ||
      (job.location ? job.location.toLowerCase().includes(term) : false) ||
      (job.hrPerson ? job.hrPerson.toLowerCase().includes(term) : false) ||
      (job.source ? job.source.toLowerCase().includes(term) : false)
    );
  });
  this.updateCalendarEvents()
}
}