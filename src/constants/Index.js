import fst from "../assets/images/fst.png";
import scnd from "../assets/images/scnd.png";
import ips from "../assets/images/LALLBIPS.jpeg";
import { CiMail } from "react-icons/ci";
import { MdOutlineCall } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";


export const events = [
  {
    id: 1,
    category: "Technical",
    categoryColor: "bg-blue-600",
    title: "Annual Mega Hackathon 2024",
    date: "October 15, 2024 • 09:00 AM",
    organizer: "Computer Science Dept.",
    location: "Main Auditorium",
    image:fst
  },
  {
    id: 2,
    category: "Cultural",
    categoryColor: "bg-pink-600",
    title: "Echoes: Music Festival",
    date: "November 02, 2024 • 06:00 PM",
    organizer: "Cultural Committee",
    location: "Open Air Theater",
    image:scnd
  },
  {
    id: 3,
    category: "Seminar",
    categoryColor: "bg-amber-600",
    title: "Death Ceremony Arun Sharma IPS",
    date: "October 20, 2024 • 11:00 AM",
    organizer: "Placement Cell",
    location: "Seminar Hall A",
    image:ips
  },
];


export const quickLinks = [
    "Find Events",
    "Submit Event",
    "Privacy Policy",
    "Terms of Service",
  ];

 export const categories = [
    "Technical Workshops",
    "Cultural Festivals",
    "Guest Lectures",
    "Sports Tournaments",
  ];

 export const contact = [
    { icon: CiMail, text: "events@college.edu" },
    { icon: MdOutlineCall, text: "+1 (555) 0123-4567" },
    { icon: CiLocationOn, text: "123 University Ave, Campus Drive" },
  ];

 export const socials = [
    LiaAwardSolid,
    MdOutlineShare,
    MdAlternateEmail,
  ];
