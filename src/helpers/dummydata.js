import { color } from 'chart.js/helpers';
import Image from '../assets/images/dummyImg.svg'
import arm from '../assets/images/arm.svg'
import chest from '../assets/images/chest.svg'
import back from '../assets/images/backChest.svg'
import neck from '../assets/images/neck.svg'
import lifting from '../assets/images/lifting.svg'
import height from '../assets/images/height.svg';
import weight from '../assets/images/weight.svg'
import ageIcon from '../assets/images/Age.svg'
import shose from '../assets/images/shoes.svg'
import sleep from '../assets/images/noun-sleep.svg'
import heart from '../assets/images/heart.svg'
import calories from '../assets/images/calories.svg'
import moment from 'moment';

 const dummyUserData = [
  {
    image: "../assets/images/dummyImg.svg",
    name: "Yasmany Barlow",
    user: "yasmine.bar",
    phone: "9876567876",
    email: "ybreff87@gmail.com",
    age: "28 years",
    weightIB: "190 lb",
    height: "1.9 m",
  },
];

export const dummyMessages = [
  {
    s_no: 1,
    name: "Afzal",
    message: "hello this is a message",
    createdAt: "2 weeks ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "123-456-7890",
    email: "afzal@example.com",
  },
  {
    s_no: 2,
    name: "John",
    message: "How are you?",
    createdAt: "1 week ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "987-654-3210",
    email: "john@example.com",
  },
  {
    s_no: 3,
    name: "Alice",
    message: "Nice to meet you!",
    createdAt: "3 days ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "555-123-4567",
    email: "alice@example.com",
  },
  {
    s_no: 4,
    name: "Bob",
    message: "This is awesome!",
    createdAt: "1 day ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "333-555-9999",
    email: "bob@example.com",
  },
  {
    s_no: 5,
    name: "Emily",
    message: "I agree!",
    createdAt: "5 hours ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "444-789-0123",
    email: "emily@example.com",
  },
  {
    s_no: 6,
    name: "Michael",
    message: "What do you think?",
    createdAt: "30 minutes ago",
    image: "https://picsum.photos/200",
    isBlocked: false,
    phone: "222-888-7777",
    email: "michael@example.com",
  },
  {
    s_no: 7,
    name: "David",
    message: "I'm doing great!",
    createdAt: "1 hour ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "666-222-3333",
    email: "david@example.com",
  },
  {
    s_no: 8,
    name: "Sophia",
    message: "That's interesting.",
    createdAt: "2 days ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "777-444-5555",
    email: "sophia@example.com",
  },
  {
    s_no: 9,
    name: "Oliver",
    message: "Let's catch up soon!",
    createdAt: "3 weeks ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "999-111-2222",
    email: "oliver@example.com",
  },
  {
    s_no: 10,
    name: "Emma",
    message: "I'm not sure about that.",
    createdAt: "6 days ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "888-777-6666",
    email: "emma@example.com",
  },
  {
    s_no: 11,
    name: "William",
    message: "Looking forward to it!",
    createdAt: "4 hours ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "555-999-4444",
    email: "william@example.com",
  },
  {
    s_no: 12,
    name: "Ava",
    message: "Me neither!",
    createdAt: "10 minutes ago",
    image: "https://picsum.photos/200",
    isBlocked: true,
    phone: "111-222-3333",
    email: "ava@example.com",
  },
];

 const dummyPosts = [
  {
    s_no: 1,
    name: "Afzal",
    title: "Body Builder",
    description: "hello this is description",
    createdAt: "2 weeks ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: false,
  },
  {
    s_no: 2,
    name: "John",
    title: "Healthy Living",
    description: "Eating well and staying fit!",
    createdAt: "1 week ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: false,
  },
  {
    s_no: 3,
    name: "Alice",
    title: "Travel Adventures",
    description: "Exploring new places around the world.",
    createdAt: "3 days ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: false,
  },
  {
    s_no: 4,
    name: "Bob",
    title: "Cooking Delights",
    description: "Sharing my favorite recipes!",
    createdAt: "1 day ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: false,
  },
  {
    s_no: 5,
    name: "Emily",
    title: "Artistic Creations",
    description: "Expressing myself through art.",
    createdAt: "5 hours ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: false,
  },
  {
    s_no: 6,
    name: "Michael",
    title: "Technology Trends",
    description: "Exploring the latest in tech!",
    createdAt: "30 minutes ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: true,
  },
  {
    s_no: 7,
    name: "Sophia",
    title: "Nature's Beauty",
    description: "Capturing the wonders of nature.",
    createdAt: "2 weeks ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: true,
  },
  {
    s_no: 8,
    name: "David",
    title: "Book Recommendations",
    description: "Discovering new worlds through books.",
    createdAt: "4 days ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: true,
  },
  {
    s_no: 9,
    name: "Olivia",
    title: "Fitness Journey",
    description: "Striving for a healthier lifestyle.",
    createdAt: "6 hours ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: true,
  },
  {
    s_no: 10,
    name: "William",
    title: "Gardening Tips",
    description: "Growing beautiful gardens at home.",
    createdAt: "1 month ago",
    postImage: "https://picsum.photos/200",
    avatar: "https://picsum.photos/200",
    isBlocked: true,
  },
];
 const dummyReactions = [
  {
    s_no: 1,
    name: "Linh Nguyen",
    username: "Linh.ng",
    reactionType: "medal",
    reportFor: "Hate Speech or Symbols",
  },
  {
    s_no: 2,
    name: "John Doe",
    username: "john.doe",
    reactionType: "100",
    reportFor: "Hate Speech or Symbols",
  },
  {
    s_no: 3,
    name: "Alice Smith",
    username: "alice.smith",
    reactionType: "build",
    reportFor: "Scam or Fraud",
  },
  {
    s_no: 4,
    name: "Bob Johnson",
    username: "bob.johnson",
    reactionType: "medal",
    reportFor: "Hate Speech or Symbols",
  },
  {
    s_no: 5,
    name: "Emma Brown",
    username: "emma.brown",
    reactionType: "100",
  },
  {
    s_no: 6,
    name: "Michael Wilson",
    username: "michael.wilson",
    reactionType: "build",
  },
  {
    s_no: 7,
    name: "Sarah Lee",
    username: "sarah.lee",
    reactionType: "medal",
  },
  {
    s_no: 8,
    name: "David Garcia",
    username: "david.garcia",
    reactionType: "100",
  },
  {
    s_no: 9,
    name: "Sophia Martinez",
    username: "sophia.martinez",
    reactionType: "build",
  },
  {
    s_no: 10,
    name: "Daniel Rodriguez",
    username: "daniel.rodriguez",
    reactionType: "medal",
  },
  {
    s_no: 11,
    name: "Emily Taylor",
    username: "emily.taylor",
    reactionType: "100",
  },
  {
    s_no: 12,
    name: "Oliver Hernandez",
    username: "oliver.hernandez",
    reactionType: "build",
  },
  {
    s_no: 13,
    name: "James Lopez",
    username: "james.lopez",
    reactionType: "medal",
  },
  {
    s_no: 14,
    name: "Ava Gonzalez",
    username: "ava.gonzalez",
    reactionType: "100",
  },
  {
    s_no: 15,
    name: "Logan Perez",
    username: "logan.perez",
    reactionType: "build",
  },
  {
    s_no: 16,
    name: "Charlotte Smith",
    username: "charlotte.smith",
    reactionType: "medal",
  },
  {
    s_no: 17,
    name: "Benjamin Davis",
    username: "benjamin.davis",
    reactionType: "100",
  },
  {
    s_no: 18,
    name: "Mia Brown",
    username: "mia.brown",
    reactionType: "build",
  },
  {
    s_no: 19,
    name: "Mason Wilson",
    username: "mason.wilson",
    reactionType: "medal",
  },
  {
    s_no: 20,
    name: "Elijah Miller",
    username: "elijah.miller",
    reactionType: "100",
  },
  {
    s_no: 21,
    name: "Emma Wilson",
    username: "emma.wilson",
    reactionType: "build",
  },
  {
    s_no: 22,
    name: "Olivia Martinez",
    username: "olivia.martinez",
    reactionType: "medal",
  },
  {
    s_no: 23,
    name: "William Taylor",
    username: "william.taylor",
    reactionType: "100",
  },
  {
    s_no: 24,
    name: "Sophia Johnson",
    username: "sophia.johnson",
    reactionType: "build",
  },
  {
    s_no: 25,
    name: "Noah Hernandez",
    username: "noah.hernandez",
    reactionType: "medal",
    reportFor: "Hate Speech or Symbols",
  },
  {
    s_no: 26,
    name: "Isabella Perez",
    username: "isabella.perez",
    reactionType: "100",
    reportFor: "Hate Speech or Symbols",
  },
  {
    s_no: 27,
    name: "Mason Brown",
    username: "mason.brown",
    reactionType: "build",
  },
  {
    s_no: 28,
    name: "Elijah Davis",
    username: "elijah.davis",
    reactionType: "medal",
  },
  {
    s_no: 29,
    name: "Ava Wilson",
    username: "ava.wilson",
    reactionType: "100",
  },
  {
    s_no: 30,
    name: "Charlotte Taylor",
    username: "charlotte.taylor",
    reactionType: "build",
  },
  {
    s_no: 31,
    name: "Michael Johnson",
    username: "michael.johnson",
    reactionType: "medal",
  },
  {
    s_no: 32,
    name: "Olivia Brown",
    username: "olivia.brown",
    reactionType: "100",
  },
  {
    s_no: 33,
    name: "Daniel Miller",
    username: "daniel.miller",
    reactionType: "build",
  },
  {
    s_no: 34,
    name: "Sophia Garcia",
    username: "sophia.garcia",
    reactionType: "medal",
  },
  {
    s_no: 35,
    name: "William Martinez",
    username: "william.martinez",
    reactionType: "100",
  },
  {
    s_no: 36,
    name: "Emily Wilson",
    username: "emily.wilson",
    reactionType: "build",
  },
  {
    s_no: 37,
    name: "Oliver Davis",
    username: "oliver.davis",
    reactionType: "medal",
  },
  {
    s_no: 38,
    name: "Charlotte Hernandez",
    username: "charlotte.hernandez",
    reactionType: "100",
  },
];
 const userActionButtons = [
  {
    id:1,
    title:'Posts',
    bgColor:'[#84C1C2]',
    color:'white'
  },
  {
    id:2,
    title:'BodyDynamics',
    bgColor:'gray-100',
    color:'gray-300'
  },
  {
    id:3,
    title:'Athlete',
    bgColor:'gray-100',
    color:'gray-300'
  },
  {
    id:4,
    title:'Following/Followers',
    bgColor:'gray-100',
    color:'gray-300'
  },
  {
    id:5,
    title:'Saved',
    bgColor:'gray-100',
    color:'gray-300'
  }
]

export const athleteData = (athleteApiData) => {
  const bd = ['Body Fat', 'Muscle Mass', 'Shoulders', 'Biceps', 'Chest'];

  const filteredData = athleteApiData?.progress?.filter(item => bd?.includes(item?.name));
  

    const AthleteUperData = [
      {
  
      image: arm,
      name: 'Body Fat',
      // percentage:  athleteApiData.bodyFat !== undefined ? athleteApiData.bodyFat :'N/A',
      percentage:  filteredData?.find(item => item?.name === 'Body Fat')?.percentage !== undefined 
      ? Math.round(filteredData?.find(item => item?.name === 'Body Fat').percentage) 
      : 0,
      Color: "#84C1C2",
      bgColor: "#84C1C2"
    },
    {
      image: chest,
      name: 'Muscle Mass',
      // percentage:athleteApiData.muscleMass !== undefined ? String(athleteApiData.muscleMass) : 'N/A', // Assuming muscleMass is another property of athleteApiData
      percentage:  filteredData?.find(item => item?.name === 'Muscle Mass')?.percentage !== undefined 
      ? Math.round(filteredData?.find(item => item?.name === 'Muscle Mass').percentage) 
      : 0, // Assuming muscleMass is another property of athleteApiData
      Color: "#2E4D55"
    },
    {
      image: lifting,
      name: 'Shoulders',
      // percentage: athleteApiData.shoulders !== undefined ? String(athleteApiData.shoulders) : 'N/A',
      percentage:  filteredData?.find(item => item?.name === 'Shoulders')?.percentage !== undefined 
      ? Math.round(filteredData?.find(item => item?.name === 'Shoulders').percentage) 
      : 0,
      Color: "#84C1C2"
    },
    {
      image: neck,
      name: 'Biceps',
      // percentage: athleteApiData.biceps !== undefined ? String(athleteApiData.biceps) : 'N/A',
      percentage:  filteredData?.find(item => item?.name === 'Biceps')?.percentage !== undefined 
      ? Math.round(filteredData?.find(item => item?.name === 'Biceps').percentage) 
      : 0,
      Color: "#2E4D55"
    },
    {
      image: back,
      name: 'Chest',
      // percentage: athleteApiData.chest !== undefined ? String(athleteApiData.chest) : 'N/A',
      percentage:  filteredData?.find(item => item?.name === 'Chest')?.percentage !== undefined 
      ? Math.round(filteredData?.find(item => item?.name === 'Chest').percentage) 
      : 0,
      Color: "#2E4D55"
    }
  ];
  const bdLower = ['PR points', 'Dead Lifts', 'Bench Press', 'Squats'];

  const filteredDataForLower = athleteApiData?.progress?.filter(item => bdLower?.includes(item.name));
  
  const AthleteData = [
    {
      name: 'PR points',
      percentage: filteredDataForLower?.find(item => item?.name === 'PR points')?.percentage !== undefined 
                  ? Math.round(filteredDataForLower?.find(item => item?.name === 'PR points').percentage) 
                  : 0,
      color: '#84C1C2'
    },
    {
      name: 'Deadlifts',
      percentage: filteredDataForLower?.find(item => item?.name === 'Dead Lifts')?.percentage !== undefined 
                  ? Math.round(filteredDataForLower?.find(item => item?.name === 'Dead Lifts')?.percentage) 
                  : 0,
      color: '#E4774F'
    },
    {
      name: 'Bench',
      percentage: filteredDataForLower?.find(item => item.name === 'Bench Press')?.percentage !== undefined 
                  ? Math.round(filteredDataForLower?.find(item => item.name === 'Bench Press')?.percentage) 
                  : 0,
      color: '#E4774F'
    },
    {
      name: 'Squats',
      percentage: filteredDataForLower?.find(item => item?.name === 'Squats')?.percentage !== undefined 
                  ? Math.round(filteredDataForLower?.find(item => item?.name === 'Squats')?.percentage) 
                  : 0,
      color: '#E4774F'
    },
  ];
  
  return { AthleteUperData, AthleteData};
}

export const bodyDynamicData = (bodyDynamicApiData) => {
  const bd = ['Arm Size', 'Chest', 'Thigh', 'Neck', 'Back'];

  const filteredData = bodyDynamicApiData?.athleteProfile?.progress?.filter(item => bd?.includes(item?.name));
  
  const bodyDynamics = [
    {
      image: arm,
      name: 'Arm Size',
      percentage: Math.round(filteredData?.find(item => item?.name === 'Arm Size')?.percentage || 0),
      Color: "#84C1C2",
      bgColor: "#84C1C2"
    },
    {
      image: chest,
      name: 'Chest Size',
      percentage: Math.round(filteredData?.find(item => item?.name === 'Chest')?.percentage || 0),
      Color: "#2E4D55"
    },
    {
      image: lifting,
      name: 'Thigh Size',
      percentage: Math.round(filteredData?.find(item => item?.name === 'Thigh')?.percentage || 0),
      Color: "#84C1C2"
    },
    {
      image: neck,
      name: 'Neck Size',
      percentage: Math.round(filteredData?.find(item => item?.name === 'Neck')?.percentage || 0),
      Color: "#2E4D55"
    },
    {
      image: back,
      name: 'Back Size',
      percentage: Math.round(filteredData?.find(item => item?.name === 'Back')?.percentage || 0),
      Color: "#2E4D55"
    }
  ];
const birthDate = moment(bodyDynamicApiData?.dob, 'YYYY-MM-DD', true);
    
// Calculate the age
const age = moment().diff(birthDate, 'years');
birthDate.format('MMMM Do, YYYY')
 const bodyDynamicsLower = [
  {
    image:height,
    name:'Height',
    percentage:`${bodyDynamicApiData?.height} ${bodyDynamicApiData?.heightUnit}`,
  },
  {
    image:weight,
    name:'Weight',
    percentage:`${bodyDynamicApiData?.weight} ${bodyDynamicApiData?.weightUnit}`,
  },
 
  {
    image:ageIcon,
    name:'Age',
    percentage:age ? age : 0,
  },
]
return{bodyDynamicsLower ,bodyDynamics }
}
export const AthleteDataNewActivity = [
  {
    image: shose,
    name:'Walk',
    percentage:'80',
    text:'2250 steps'
  },
  {
    image: sleep,
    name:'Sleep',
    percentage:'50',
    text:'8:50 Hours'
  },
  {
    image:heart,
    name:'Heart',
    percentage:'90',    
    text:'115 bmp'
  },
  {
    image:calories,
    name:'Calories',
    percentage:'85',
    text:'399 kcal'
  },
]

 const StoryPostData = [
  {
    name: "Bob Cooking Delights",
    title: "Cooking",
    description: "Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! Sharing my favorite recipes! ",
    createdAt: "1 day ago",
    postImage: Image,
    avatar: "https://picsum.photos/200",
    isBlocked: false,
    location:'GYM Arena, Los Vegas'
  },
]

export const dashboardGraphData = [
  {
    name:'New Users',
    percentage:'51',
    bgColor:'#2E4D55'
  },
  {
    name:'Blocked',
    percentage:'31',
    bgColor:'#E4774F', 
  },
  {
    name:'Comments',
    percentage:'38',
    bgColor:'#84C1C2'
  }
]

export const dashboardStaticData = [
  {
    name:'New Users',
    value:'',
    color:''
  },
  {
    name:'',
    value:'',
    color:''
  },
  {
    name:'',
    value:'',
    color:''
  }
]

const reactions = [
  '100',
  'medal',
  'build'
]