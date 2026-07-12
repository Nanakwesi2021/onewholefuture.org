import { db } from './src/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const articles = [
  {
    category: 'Reports',
    title: 'Annual Impact 2024: The Digital Literacy Surge',
    description: 'Our comprehensive study on how localized internet access has shifted economic outcomes across 40 distinct regions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWzqDBLIjSq74fsZxolhtZHaNBzQpDX_97r2gzHw39ahgUM0JVe6BmcoO27hIDsiUkvn7hI_I4FL6pV1ZAIjl58B8V77zPLVBsV5TxclOU8vf7ZAGHsDrmDmtzGsvOgt5ys9r-GywY76eMOH9symC7UjVpM7AcyuDhv3YZC7GLJktEKMXuTajrNWIL9ezYNQ6ETEFFWofZnigjxuF0Yx9YKTdJQbwCiIIv6_RTnNfGWEniN1nLO3fwHG0pjN4tHuAX2lI8oyxBHnEo',
    categoryColor: 'text-tertiary',
    featured: false,
    createdAt: new Date()
  },
  {
    category: 'Press Release',
    title: 'Strategic Partnership with Global Open-Source Initiative',
    description: 'Announcing a multi-year collaboration to secure digital archiving tools for indigenous knowledge centers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCexGoEjSyT-4w560MTah2lKzAnSCJlxEhh9sVOG1xQepQVDUEcjaF0RY4xOFhlxFpILa4hSIKF22tmCqOnvUP5w90iqxMTvw0zunLUelTyYildD0cwR2xzQuGN7g89tFwPf0zkL-YTY9iCIO9LAvu0XqiaS-2MwxjooIHvt-PJKWV1g4VxEmn22fbyo6lv-sKAWxAueNTVmREWUlhzbHHYXwG68hkVqNert267n8TdolF47qBqA1dfgI_ZoQrixp_MVN6dvPi8ylje',
    categoryColor: 'text-secondary',
    featured: false,
    createdAt: new Date()
  },
  {
    category: 'In the Field',
    title: 'Portraits of Resilience: The Archive Photo Series',
    description: 'Meet the photographers documenting the subtle shifts in daily life across the Mediterranean coastline.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFyYlpS3-VTzNOt4ZMaMvtrJ6u3p1BKVp0PQU85QHLxKLs9612asq8mW46ZBW4PXBKNtg9Xzuj3mN01Yzu4P_avLFT-QajP3M8aHRYB_r2NZPz5JZtr7V2vdFer2FaY3je9vfGL_gzjSwufe1SsfPAQPV7KcQoycA8Ey41zRwWCqj5LXz2rMMiaKgYAbiNFTvNURfTxXcuZkrNPkEhyYd2LSMkAkNPHB93T5FiOM0rU7B-kx93_ph4UDhGkctr30Sc7_8tzvVDksYF',
    categoryColor: 'text-tertiary',
    featured: false,
    createdAt: new Date()
  },
  {
    category: 'Reports',
    title: 'Ethical AI in Cultural Preservation',
    description: 'An exploration into the frameworks we use to ensure AI tools respect cultural sovereignty and intellectual property.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHfI1fasDCtWcmkLlVBQD5xahSFPXNCnPD3vpGJO6Eg4lJDlcLrQzcCcKF3ZucxZHccL7P0LphCSpAUhCzJXTYLnWvp7l6swb88rhVAqIIoK2OQXz0YrgU_4eMVF7UVBQnOdXAwi73gtkysLU0pqWIuKjgC_0or06Ce7Hy6bwTFhxPM_JU9SXwQz1qz7-3rbZg3-Dkix5skwj3CmK4gCInV9QnAhXAbHdE4tBLJbzFo9GIzAmWmlsU9rX6NH2qQUhBr1WzjHyM5Q01',
    categoryColor: 'text-secondary',
    featured: false,
    createdAt: new Date()
  },
  {
    category: 'In the Field',
    title: 'Reshaping the Narrative: Voices from the Rural Frontier',
    description: 'In an era of rapid digital expansion, we explore how traditional communities are preserving their history while embracing sustainable modern technologies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyRUwLdORISHTaUqmRqg4smKZ6wssE4uLX-Uan_jPiJK_Qhqs2TRXyx_o8kGjqHRFuaa7ZrKu2k1aguKj3TaNvPU8s5ep7gslNmOcIe0R_nqCXrBCAs_8k1GVJqOvBEc6eZctpEPn08xBhS8lT063PbhmS5WjABqzrQZCTvtz7s3soRMaQI4luP2qrELdZdIQUktdkHiVWdQtCGWQB-dIyuWeLrQrpsdrO4CawkQm-5gi-zA6yXiWwc1fXBzYOHNCBHjwWj92qmTIT',
    categoryColor: 'text-tertiary',
    featured: true,
    createdAt: new Date()
  }
];

export async function seedNews() {
  const newsCollection = collection(db, 'news');
  
  // Clear existing (optional, but good for idempotency during dev)
  const snapshot = await getDocs(newsCollection);
  for (const docSnapshot of snapshot.docs) {
    await deleteDoc(doc(db, 'news', docSnapshot.id));
  }

  for (const article of articles) {
    await addDoc(newsCollection, article);
    console.log(`Added article: ${article.title}`);
  }
}
