type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Trip {
  id: number;
  title: string;
  price: number;
  difficulty: Difficulty;
  imageUrl: string;
  distance: string;
  duration: string;
  elevation: string;
  description: string;
  included: string[];
  notIncluded: string[];
  mapUrl: string;
}

export const TripsData: Trip[] = [
  {
    id: 1,
    title: "Tikjda",
    price: 2000,
    difficulty: "Hard",
    imageUrl: "/images/tikjda.svg",
    distance: "14 km",
    duration: "6-8 Hours",
    elevation: "850m",
    description: "A challenging but incredibly rewarding hike through the stunning Djurdjura National Park. Experience breathtaking panoramic views, dense cedar forests, and the rugged beauty of the mountains. We will have designated stops along the trail to rest, take photos, and eat food/snacks.",
    included: [
      "Professional Local Guide",
      "Round-trip Transport (From Algiers)"
    ],
    notIncluded: [
      "Food and Snacks"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102434.61864198751!2d4.02983775438865!3d36.44976450682281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128db0a66d03f0b9%3A0x67db50d87cb72a3!2sTikjda!5e0!3m2!1sen!2sdz!4v1708450000000!5m2!1sen!2sdz"
  },
  {
    id: 2,
    title: "Lakhdaria",
    price: 2000,
    difficulty: "Medium",
    imageUrl: "/images/lakhdaria.svg",
    distance: "14 km",
    duration: "6-8 Hours",
    elevation: "850m",
    description: "Join us for a tough but rewarding hike through the stunning mountains of Lakhdaria. Trek along the famous Ammal gorges and enjoy amazing views of the green valleys below. We will take regular breaks along the way to rest, eat snacks, and take photos of the scenery.",
    included: [
      "Professional Local Guide",
      "Round-trip Transport (From Algiers)"
    ],
    notIncluded: [
      "Food and Snacks"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51446.04743845328!2d3.5505863!3d36.5646866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e4e8f3f5d1d77%3A0x3d1c8e5f6a5d8c5a!2sLakhdaria!5e0!3m2!1sen!2sdz!4v1708450000000!5m2!1sen!2sdz"
  },
  {
    id: 3,
    title: "Djurdjura",
    price: 2000,
    difficulty: "Medium",
    imageUrl: "/images/djurdjura.svg",
    distance: "14 km",
    duration: "6-8 Hours",
    elevation: "850m",
    description: "Take on a tough but rewarding hike through the beautiful Djurdjura National Park. Walk through thick cedar forests and see amazing views of the rugged mountains. We will take regular breaks along the way to rest, eat snacks, and take photos.",
    included: [
      "Professional Local Guide",
      "Round-trip Transport (From Algiers)"
    ],
    notIncluded: [
      "Food and Snacks"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207105.99326!2d4.057366!3d36.500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128db1a5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sDjurdjura%20National%20Park!5e0!3m2!1sen!2sdz!4v1708450000000!5m2!1sen!2sdz"
  },
  {
    id: 4,
    title: "Lake Dhaya",
    price: 2000,
    difficulty: "Easy",
    imageUrl: "/images/lake_dhaya.svg",
    distance: "5 km",
    duration: "3 Hours",
    elevation: "150m",
    description: "A relaxing walk around the serene Lake Dhaya, perfect for beginners and photography. Enjoy the peaceful atmosphere and stunning views of the surrounding landscape.",
    included: [
      "Professional Local Guide",
      "Round-trip Transport (From Algiers)"
    ],
    notIncluded: [
      "Food and Snacks"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51732.5!2d4.5!3d36.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e5e5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sLake%20Dhaya!5e0!3m2!1sen!2sdz!4v1708450000000!5m2!1sen!2sdz"
  }
];