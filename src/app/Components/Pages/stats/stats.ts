import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalData } from '../../../Services/global-data';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats implements OnInit {

  jobs: JobInterface[] = [];

  // KPI cards
  totalJobs = 0;
  acceptedCount = 0;
  rejectedCount = 0;
  interviewingCount = 0;
  appliedCount = 0;
  draftCount = 0;

  // Chart data
  statusChartData: any;
  monthlyChartData: any;
  rejectionChartData: any;
  bestDayChartData: any;

  chartOptions: any;
  private subscription!: Subscription;

  constructor(private globalData: GlobalData) {}

  ngOnInit() {
    this.subscription = this.globalData.jobList$.subscribe((jobList:any) => {
      this.jobs = jobList.map((j:any) => ({
        ...j,
        date: j.date ? new Date(j.date) : null
      }));
      this.calculateKPIs();
      this.generateAllCharts();
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  generateAllCharts() {
    this.generateStatusChart();
    this.generateMonthlyChart();
    this.generateRejectionChart();
    this.generateBestDayChart();

    this.chartOptions = {
      plugins: {
        legend: { labels: { color: '#333' } }
      },
      scales: {
        x: { ticks: { color: '#333' }, grid: { color: '#ddd' } },
        y: { ticks: { color: '#333' }, grid: { color: '#eee' } }
      }
    };
  }

  //KPIs
  calculateKPIs() {
    this.totalJobs = this.jobs.length;
    this.acceptedCount = this.jobs.filter(j => j.status === 'Accepted').length;
    this.rejectedCount = this.jobs.filter(j => j.status === 'Rejected').length;
    this.interviewingCount = this.jobs.filter(j => j.status === 'Interviewing').length;
    this.appliedCount = this.jobs.filter(j => j.status === 'Applied').length;
    this.draftCount = this.jobs.filter(j => j.status === 'Draft').length;
  }

  //Status breakdown
  generateStatusChart() {
    this.statusChartData = {
      labels: ['Draft', 'Applied', 'Interviewing', 'Accepted', 'Rejected'],
      datasets: [
        {
          data: [
            this.draftCount,
            this.appliedCount,
            this.interviewingCount,
            this.acceptedCount,
            this.rejectedCount
          ],
          backgroundColor: ['#9e9e9e', '#42A5F5', '#FFB300', '#66BB6A', '#EF5350']
        }
      ]
    };
  }

  // Applications per month
  generateMonthlyChart() {
    const monthlyCounts = Array(12).fill(0);
    this.jobs.forEach(job => {
      if (job.date) monthlyCounts[new Date(job.date).getMonth()]++;
    });
    this.monthlyChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Applications',
          data: monthlyCounts,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.3)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }

  // Rejections by company
  generateRejectionChart() {
    const rejectionMap: Record<string, number> = {};
    this.jobs
      .filter(j => j.status === 'Rejected')
      .forEach(j => {
        rejectionMap[j.company] = (rejectionMap[j.company] || 0) + 1;
      });
    this.rejectionChartData = {
      labels: Object.keys(rejectionMap),
      datasets: [
        {
          label: 'Rejections',
          data: Object.values(rejectionMap),
          backgroundColor: '#EF5350'
        }
      ]
    };
  }

  // Applications by day of week
  generateBestDayChart() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = Array(7).fill(0);
    this.jobs.forEach(j => {
      if (j.date) dayCounts[new Date(j.date).getDay()]++;
    });
    this.bestDayChartData = {
      labels: days,
      datasets: [
        {
          label: 'Applications',
          data: dayCounts,
          backgroundColor: '#66BB6A'
        }
      ]
    };
  }
}
