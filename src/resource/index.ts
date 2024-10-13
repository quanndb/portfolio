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
      `Hello! I'm **Quan**, currently studying Information Technology at the **Ha Noi University of Industry**.`,
      `I'm passionate about exploring new technologies and continuously learning to improve my skills in 
      programming and software development.`,
      `I particularly enjoy working with web technologies, from user interfaces to complex backend systems. 
      My personal projects often revolve around finding optimal, convenient, and creative solutions to help users. 
      For me, every line of code is not just a command but an opportunity to create real value.`,
      `Throughout my learning journey, I'm eager to contribute to real-world projects and always seek opportunities to collaborate and gain more experience.`,
      `If you're interested in my projects or want to connect, feel free to reach out!`,
    ],
    avatar: "/images/avatar.png",
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
    ],
  },
};

export const projects = {
  title: "Featured Projects",
  description:
    "Below are some of the key projects I’ve worked on, where I applied my knowledge, explored new technologies, and tackled real-world programming challenges.",
  items: [
    {
      title: "September 2024",
      description: {
        url: "https://github.com/quanndb/portfolio",
        name: "Portfolio Website",
        preview: "/images/prj3-banner.png",
        content:
          "A personal portfolio website using NextJS, TailwindCSS, TypeScript and AceternityUI.",
      },
      images: [
        "/images/prj3-banner.png",
        "/images/prj3-about.png",
        "/images/prj3-projects.png",
        "/images/prj3-contact.png",
      ],
    },
    {
      title: "March 2024",
      description: {
        url: "https://github.com/quanndb/LowLand",
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
      title: "February 2023",
      description: {
        url: "https://github.com/quanndb/CatGPT",
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
  copyright: `© 2024 Vu Minh Quan. All rights reserved.`,
};
