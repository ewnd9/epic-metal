export interface Person {
  displayName: string;
}

export interface Issue {
  id: string;
  key: string;
  summary: string;
  description: string;
  assignee: Person;
  reporter: Person;
  status: {
    id: string;
    name: string;
  };
  children: Array<Issue>;
  created: string;
  updated: string;
}
