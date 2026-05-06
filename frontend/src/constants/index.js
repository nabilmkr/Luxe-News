import {

    benefitImage2,
    discordBlack,
    facebook,
    instagram,
    notification2,
    notification3,
    notification4,
    telegram,
    twitter,

  } from "../assets";
  
  export const navigation = [
    {
      id: "0",
      title: "Home",
      url: "/", 
    },
    {
      id: "1",
      title: "Games",
      url: "/games", 
    },
    {
      id: "2",
      title: "Tournament",
      url: "/Tournament",
    },
  ];
  
  
  
  
  export const notificationImages = [notification4, notification3, notification2];

  export const benefits = [
    {
      id: "0",
      title: "MOBA",
      text: "Raih kemenangan di arena! Dari patch notes terkini, strategi build, hingga rahasia meta terbaru — jadilah legenda di setiap pertandingan.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      url: "/moba",
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "FPS",
      text: "Jadi yang tercepat dan paling akurat! Dapatkan panduan, update senjata, hingga tips dari para pro player yang akan membuat Anda jadi juara.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      url: "/fps",
      imageUrl: benefitImage2,
    },
    {
      id: "2",
      title: "RPG",
      text: "Masuki dunia fantasi tanpa batas! Temukan lore tersembunyi, kuasai quest epik, dan jadilah legenda di dunia RPG favorit Anda.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      url: "/rpg",
      imageUrl: benefitImage2,
    },
   

  
  ];

  export const popular = [
    {
      id: "6",
      title: "MOBA",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      

    },
    {
      id: "7",
      title: "FPS",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
  

    },
    {
      id: "8",
      title: "RPG",
      text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
    

    },
    
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];