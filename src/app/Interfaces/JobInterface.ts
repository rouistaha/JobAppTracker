interface JobInterface {
  id: number;
  company: string;
  position: string;
  status: string;
  date?: Date;
  location?: string;
  salary?: number | null;
  hrPerson?: string;
  website?: string;
  source?: string;
  notes?: string;
}