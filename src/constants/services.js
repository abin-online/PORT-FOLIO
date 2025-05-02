import { Code, Database, ShieldCheck, Server, CloudUpload } from "lucide-react";

export const services = [
  {
    icon: () => <Code size={40} />,
    title: 'Frontend Development',
    description:
      'Crafting dynamic, responsive UIs using React and Next.js with a focus on performance, accessibility, and modern best practices.',
  },
  {
    icon: () => <Database size={40} />,
    title: 'Database Design',
    description:
      'Designing scalable and efficient schemas using both SQL and NoSQL databases for robust data management.',
  },
  {
    icon: () => <ShieldCheck size={40} />,
    title: 'Security Solutions',
    description:
      'Implementing secure authentication, authorization, and data protection practices in web apps.',
  },
  {
    icon: () => <Server size={40} />,
    title: 'Backend Development',
    description:
      'Building scalable RESTful APIs using Node.js and Express with modular and maintainable architecture.',
  },
  {
    icon: () => <CloudUpload size={40} />,
    title: 'Deployment & DevOps',
    description:
      'Deploying scalable apps to GCP and AWS using Docker, Kubernetes, and CI/CD pipelines for smooth delivery.',
  },
];
