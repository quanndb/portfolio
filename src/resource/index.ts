export type homeDataType = {
  title: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
};

export type aboutDataType = {
  author: {
    name: string;
    role: string;
    description: string[];
    avatar: string;
    location: string;
    languages: string[];
    socials: {
      name: string;
      icon: string;
      link: string;
    }[];
  };
};

export type projectsDataType = {
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    description: {
      url: string;
      name: string;
      preview: string;
      content: string;
    };
    images: string[];
  }[];
};

export type contactDataType = {
  title: string;
  description: string;
};

export const resume = {
  fileName: "resume.pdf",
  url: "https://drive.google.com/file/d/19PRTyXcDDWAstwCYu_vrnyFMjdAGHi_k/preview",
  downloadUrl: "https://drive.usercontent.google.com/u/0/uc?id=19PRTyXcDDWAstwCYu_vrnyFMjdAGHi_k&export=download",
};

export const homeData = {
  title: "Hi there!, I'm Quan",
  description: "I'm a Fullstack Web developer",
  button: {
    text: "More information about me",
    href: "#about",
  },
};

export const about = {
  author: {
    name: "Vu Minh Quan",
    role: "Fullstack Web developer",
    description: [
      `Hi, I'm **Quan**, a **Fullstack Web Developer** with nearly 2 years of professional experience in building end-to-end applications.`,
      `My core expertise lies in crafting high-performance user interfaces and architecting robust, scalable backend systems.`,
      `I bridge the gap between creative design and technical feasibility, focusing on clean code, system optimization, and seamless user experiences.`,
      `From database design to frontend deployment, I thrive on solving complex technical challenges and delivering real business value through stable and efficient solutions.`,
      `I'm always open to new technologies and meaningful collaborations. Feel free to reach out if you'd like to discuss tech or potential projects!`,
    ],
    avatar: "/images/avatar.jpg",
    location: "Bac Tu Liem, Ha Noi, Viet Nam.",
    languages: ["English", "Vietnamese"],
    socials: [
      {
        name: "Github",
        icon: "mdi:github",
        link: "https://github.com/quanndb",
      },
      {
        name: "Email",
        icon: "dashicons:email",
        link: "mailto:quanvuminh28@gmail.com",
      },
      {
        name: "Linkedin",
        icon: "mdi:linkedin",
        link: "https://linkedin.com/in/quanndb",
      },
    ],
  },
};

export const projects = {
  title: "Featured Projects",
  description:
    "Below are some of the key projects I’ve worked on, where I applied my knowledge, explored new technologies, and tackled real-world programming challenges.",
  items: [
    {
      id: "Quiz-Game",
      title: "February 2026",
      description: {
        url: "https://game.thuanthien.edu.vn",
        name: "Thuan Thien Adventure Quiz Game",
        preview: "/images/prj6-1.png",
        content:
          "A adventure quiz game with various of playing types. Using NextJS (App Router) & Supabase",
      },
      images: [
        "/images/prj6-1.png",
        "/images/prj6-2.png",
        "/images/prj6-3.png",
        "/images/prj6-4.png",
      ],
    },
    {
      id: "thuan-thien-ecosystem-website",
      title: "September 2025",
      description: {
        url: "https://summercamp.thuanthien.edu.vn",
        name: "Thuan Thien Naturalis's Ecosystem Website",
        preview: "/images/prj5-2.png",
        content:
          "Developed a set of websites for Thuan Thien Naturalis, including summer camp website, bilingual website, and small CRM system. Using NextJS (App Router) & Supabase",
      },
      images: [
        "/images/prj5-1.png",
        "/images/prj5-2.png",
        "/images/prj5-3.png",
        "/images/prj5-4.png",
      ],
    },
    {
      id: "thuan-thien-website",
      title: "August 2025",
      description: {
        url: "https://thuanthien.edu.vn",
        name: "Thuan Thien Naturalis's Website",
        preview: "/images/prj4-1.png",
        content:
          "Developed a high-performance, custom-themed WordPress website for Thuan Thien Naturalis, focusing on scalability and user experience.",
      },
      images: [
        "/images/prj4-1.png",
        "/images/prj4-2.png",
        "/images/prj4-3.png",
        "/images/prj4-4.png",
      ],
    },
    {
      id: "QMS-Module",
      title: "September 2024",
      description: {
        url: "#",
        name: "QMS Module",
        preview: "/images/prj3-1.png",
        content:
          "Quanlity Management System Module is a module of a larger system that is used to manage the quality of processes or documents in a HRM system. Using Spring Framework & Angular.",
      },
      images: [
        "/images/prj3-1.png",
        "/images/prj3-2.png",
        "/images/prj3-3.png",
        "/images/prj3-4.png",
      ],
    },
    {
      id: "lowland-coffee",
      title: "March 2024",
      description: {
        url: "#",
        name: "Lowland Coffee",
        preview: "/images/prj1-home.png",
        content:
          "A project focused on the presentation and management of a coffee shop using Spring Framework & ReactJS (Vite).",
      },
      images: [
        "/images/prj1-home.png",
        "/images/prj1-products.png",
        "/images/prj1-dashboard.png",
        "/images/prj1-swagger.png",
      ],
    },
    {
      id: "cat-gpt",
      title: "February 2023",
      description: {
        url: "https://quanndb.github.io/CatGPT/",
        name: "CatGPT",
        preview: "/images/prj2.png",
        content: "A funny project that was base on ChatGPT, using ReactJS.",
      },
      images: ["/images/prj2.png"],
    },
  ],
};

export const contact = {
  title: "Contact Me",
  description:
    "Have a project in mind or just want to say hello? Reach out through the form below or email me directly. I’m always open to new opportunities and collaborations!",
  placeholders: [
    "Hi there!",
    "Want to work together?",
    "Let's get in touch",
    "I'd love to hear from you",
  ],
  contactAPI: "https://formspree.io/f/mrbggzee",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} Vu Minh Quan. All rights reserved.`,
};
